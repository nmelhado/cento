<script context="module">
    import {getRecipes} from '$lib/helpers'
    export async function load({url}) {
        const recipesResp = getRecipes();

        const queryVars = {
            // these params can only have one value
            page: url.searchParams.get('page'),
            search: url.searchParams.get('search'),
            difficulty: url.searchParams.get('difficulty'),
            
            // these params are comma sepetated lists
            meals: url.searchParams.get('meals') ? new Set(url.searchParams.get('meals').split(',')) : null,
            seasons: url.searchParams.get('seasons') ? new Set(url.searchParams.get('seasons').split(',')) : null,
            tags: url.searchParams.get('tags') ? new Set(url.searchParams.get('tags').split(',')) : null,
        };
	
		return {
			props: {
                recipesResp,
                queryVars
			}
		};
	}
</script>

<script>
    import AllRecipes from "$lib/AllRecipes.svelte";

    export let recipesResp, queryVars;
</script>

<style>
    .content {
        width: 95%;
        max-width: 1400px;
        margin: 0 auto;
    }
</style>

<div class="content">
    {#await recipesResp}
        Stirring ingredients...
    {:then {recipes, stale}}
        <AllRecipes {recipes} {stale} {queryVars} postUpdate={true} />
    {/await}
</div>
