<script>
    import {getRecipes} from '$lib/helpers'
import Flourish from './Flourish.svelte';
    import Recipe from './Recipe.svelte';
    export let recipes, stale;

	const refreshRecipes = async () => {
		const newRecipes = await getRecipes(true);
		recipes = newRecipes.recipes;
	}
    
	if(stale) {
		refreshRecipes();
	}
</script>

<style>
    #recent {
        display: inline-block;
        width: 70%;
        padding: 20px 0 0 0;
        margin-right: 3%;
        vertical-align: top;
        overflow: hidden;
    }
</style>

<div id="recent">
    <Flourish text="Recent Recipes" />
    {#each recipes as recipe (recipe.name)}
        <Recipe {recipe} />
    {/each}
</div>