<script>
    import {getRecipes} from '$lib/helpers'
    import Flourish from '$lib/Flourish.svelte';
    import Pagination from '$lib/Pagination.svelte';
    import Recipe from '$lib/Recipe.svelte';
    import Filters from '$lib/Filters.svelte';
    // import MobileFilters from '$lib/MobileFilters.svelte';
    
    export let recipes, stale, queryVars;

    $: console.log(recipes)

	const refreshRecipes = async () => {
		const newRecipes = await getRecipes(true);
		recipes = newRecipes.recipes;
	}
    
	if(stale) {
		refreshRecipes();
	}


    const getPage = (pg, rs) => {
        console.log(rs)
        const start = pg * perPage
        const end = (pg + 1) * perPage;

        // set new paginatedRecipes
        return rs.slice(start, end)
    }

    // filters
    let seasons = [];
    let tags = [];
    let meals = [];
    let difficulties = [];

    let filteredResults = [];

    const getFilters = (rs) => {
        const seasonsFs = new Set();
        const tagsFs = new Set();
        const mealsFs = new Set();
        const difficultiesFs = new Set();
        // build pool of queries
        for(const r of rs) {
            // add seasons
            for(const s of r.season) {
                seasonsFs.add(s);
            }
            // add tags
            for(const t of r.tags) {
                tagsFs.add(t);
            }
            // add meal
            mealsFs.add(r.meal);
            // add difficulty
            difficultiesFs.add(r.difficulty);
        }

        seasons = buildFilters([...seasonsFs], seasons, 'seasons');
        meals = buildFilters([...mealsFs], meals, 'meals');
        difficulties = buildFilters([...difficultiesFs], difficulties, 'difficulties');
        tags = buildFilters([...tagsFs], tags, 'tags');

        filterResults(recipes)
    }

    const buildFilters = (arr, dest, key) => {
        // empty array to clean data
        dest = [];

        // loop through and determine if they're already selected
        for(const i of arr) {
            dest.push({
                name: i,
                selected: getSelected(i, key)
            })
        }

        return dest;
    }

    const getSelected = (val, key) => {
        
        switch (key) {
            case 'page':
            case 'difficulty':
            case 'search':
                // these params can only have one value
                return val == queryVars[key];
            default:
                // other params are sets
                return (queryVars[key] && queryVars[key].has(val)) || false;
        }
    }

    const filterResults = (rs, p = page) => {
        const mealsSet = createSet(meals);
        const tagsArr = createSet(tags);
        const seasonsSet = createSet(seasons);
        const difficultiesSet = createSet(difficulties);

        filteredResults = rs.filter(r => {
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
            if(difficultiesSet.size) {
                if(!difficultiesSet.has(r.difficulty)) return false;
            }
            return true;
        })

        if(page != p) page = p;
    }

    const createSet = (o) => {
        const s = new Set();
        for (const key in o) {
            if(o[key].selected) s.add(o[key].name);
        }
        return s
    }

    $: getFilters(recipes);
    
    $: paginatedRecipes = getPage(page, filteredResults);

    $:total = recipes.length || 0;
	const perPage = 20;
	let page = 0;
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
    }
</style>

<div class="col">
    <!-- <div class="mobileFilters">
        <MobileFilters />
    </div> -->
    <div class="row">
        <div class="filters">
            <Filters bind:seasons={seasons} bind:tags={tags} bind:meals={meals} bind:difficulties={difficulties} on:newFilters={() => filterResults(recipes, 0)} />
        </div>
        <div class="recipes">
            <Flourish text="Recipes" />
            {#each paginatedRecipes as recipe (recipe.name)}
                <Recipe {recipe} />
            {/each}
            <Pagination {total} {perPage} bind:page={page} />
        </div>
    </div>
</div>