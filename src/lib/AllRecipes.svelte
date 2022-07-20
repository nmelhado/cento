<script>
    import Flourish from '$lib/Flourish.svelte';
	import throttle from 'just-throttle';
    import Pagination from '$lib/Pagination.svelte';
    import Recipe from '$lib/Recipe.svelte';
    import Filters from '$lib/Filters.svelte';
	import { match } from 'fuzzyjs';
    import { getPage, refreshRecipes, replaceStateWithQuery, getFilters, getSelectedForQuery } from '$lib/helpers/allRecipesLogic'
    import { onMount } from 'svelte';
    // import MobileFilters from '$lib/MobileFilters.svelte';
    
    export let recipes, stale, queryVars;

    // filters
    let seasons = [];
    let tags = [];
    let meals = [];
    let difficulties = [];

    let filteredResults = [];

    let queriesReady = false;
    
    onMount( async () => {
        if(stale) {
            const newRecipes = await refreshRecipes();
            recipes = newRecipes;
            stale = false;
        }
    })

    const filterResults = (rs, redirect, p = page) => {
        const mealsSet = createSet(meals);
        const tagsArr = createSet(tags);
        const seasonsSet = createSet(seasons);
        const difficultiesSet = createSet(difficulties);
        const maxDifficulty = difficultiesSet.size ? Math.max(...difficultiesSet) : 3;

        let searchResults = rs;

        if(search.trim() != "") {
            searchResults = rs.filter(r => {
                const nameMatch = match(search, r.name);
                return nameMatch.match;
            })

            searchResults.sort((a,b) => {
                const nameMatchA = match(search, a.name);
                const nameMatchB = match(search, b.name);

                return nameMatchA.score - nameMatchB.score;
            })
        }

        filteredResults = searchResults.filter(r => {
            if(mealsSet.size) {
                if(!mealsSet.has(r.meal)) return false;
            }
            if(tagsArr.size) {
                let valid = true;
                const tagSet = new Set(r.tags);
                for(const tag of [...tagsArr]) {
                    if(!tagSet.has(tag)) {
                        valid = false;
                        break;
                    }

                }
                if(!valid) return false
            }
            if(seasonsSet.size) {
                let valid = false;
                for(const season of r.season) {
                    if(seasonsSet.has(season)) {
                        valid = true;
                        break;
                    }

                }
                if(!valid) return false
            }
            if(r.difficulty > maxDifficulty) {
                return false;
            }
            return true;
        })

        if(redirect) {
            let query = {};

            const oldPage = page;
            if(page != p) page = p;

            query.page = page + 1;


            const searchQ = search.trim();

            query.search = searchQ;

            query = getSelectedForQuery(query, meals, 'meals');
            query = getSelectedForQuery(query, seasons, 'seasons');
            query = getSelectedForQuery(query, tags, 'tags');
            query = getSelectedForQuery(query, difficulties, 'difficulty');

            if(page == oldPage) {
                paginatedRecipes = getPage(page, perPage, filteredResults);
            }
            replaceStateWithQuery(query);
        }
    }

    const createSet = (o) => {
        const s = new Set();
        for (const key in o) {
            if(o[key].selected) s.add(o[key].name);
        }
        return s
    }

    const setQueryVariables = (qVs, rs) => {
        if(!queriesReady && qVs && rs) {
            if(qVs.search) search = qVs.search;
            if(qVs.page) page = qVs.page - 1;

            const availableFilters = getFilters(rs, qVs);
            seasons = availableFilters.seasons;
            meals = availableFilters.meals;
            difficulties = availableFilters.difficulties;
            tags = availableFilters.tags;
            
            filterResults(recipes);

            setTimeout(() => {
                queriesReady = true;
            },1);
        }
    }

    const searchRecipes = (s) => {
        if(queriesReady) {
            const curS = `${s}`;
            filterResults(recipes, true, 0);
        }
    }

    const changePage = (p) => {
        return getPage(p, perPage, filteredResults)
    }

    $: setQueryVariables(queryVars, recipes);

    $: throttle(searchRecipes(search));
    
    $: paginatedRecipes = changePage(page);

    $:total = filteredResults.length || 0;
	const perPage = 15;
	let page = 0;

    let search = "";
</script>

<style>
    .col {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
    }

    .recipes {
        padding: 0 1em;
        flex-grow: 1;
    }

    .matching {
        display: block;
        margin: 0 0 1em;
        height: 1em;
        font-style: italic;
        color: #aaa;
        font-size: 0.8em;
    }

    .search {
        display: flex;
        justify-content: center;
        margin: 1em 0 2em;
    }

    .searchText {
        width: 85%;
        max-width: 600px;
    }
</style>

<div class="col">
    <!-- search bar -->
    <div class="search">
        <input type="text" class="searchText" placeholder="Search for recipes..." bind:value={search} />
    </div>
    <!-- <div class="mobileFilters">
        <MobileFilters />
    </div> -->
    <div class="row">
        <div class="filters">
            <Filters bind:seasons={seasons} bind:tags={tags} bind:meals={meals} bind:difficulties={difficulties} on:newFilters={() => filterResults(recipes, true, 0)} />
        </div>
        <div class="recipes">
            <Flourish text="Recipes" />
                <span class="matching">
                    {#if filteredResults.length != recipes.length}
                        {filteredResults.length} of {recipes.length} recipes match the filters
                    {/if}
                </span>
            {#each paginatedRecipes as recipe (recipe.name)}
                <Recipe {recipe} />
            {/each}
            <Pagination {total} {perPage} bind:page={page} />
        </div>
    </div>
</div>