<script context="module">
    import {getRecipes, getFeaturedRecipes} from '$lib/helpers'
    export function load() {
        const recipesResp = getRecipes();
        const featuredRecipesResp = getFeaturedRecipes();
	
		return {
			props: {
                recipesResp,
                featuredRecipesResp,
			}
		};
	}
</script>

<script>
    import MainRecipes from "$lib/MainRecipes.svelte";
    import FeaturedRecipes from "$lib/FeaturedRecipes.svelte"

    export let recipesResp, featuredRecipesResp;
</script>

{#await featuredRecipesResp}
    Loading Featured Recipes...
{:then {featuredRecipes, stale}}
    <FeaturedRecipes {featuredRecipes} {stale} />
{/await}

{#await recipesResp}
    Stirring ingredients...
{:then {recipes, stale}}
    <MainRecipes {recipes} {stale} />
{/await}
