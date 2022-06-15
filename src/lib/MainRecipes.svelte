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
    #main {
        width: 95%;
        max-width: 1000px;
        padding: 0;
        margin: 50px auto 0 auto;
        background-color: #fff;
    }

    #recent {
        display: inline-block;
        width: 70%;
        padding: 20px 0 0 0;
        margin-right: 3%;
        vertical-align: top;
        overflow: hidden;
    }
</style>

<div id="main">
    <div id="recent">
        <Flourish text="Recent Recipes" />
        {#each recipes as recipe (recipe.name)}
            <Recipe {recipe} />
        {/each}
    </div>
</div>