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
    
    #rightColumn {
        display: inline-block;
        width: 23%;
        padding: 20px 0 0 2.5%;
        overflow: hidden;
    }

    #aboutImage {
        width: 95%;
        margin-top: 20px;
    }

    #aboutText {
        margin-top: 15px;
        color: #666;
        font-weight: 300;
    }

    #all {
        text-align: right;
    }

    h2 {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        color: #abd3df;
    }
</style>

<div id="main">
    <div id="recent">
        <Flourish text="Recent Recipes" />
        {#each recipes as recipe (recipe.name)}
            <Recipe {recipe} />
        {/each}
        
        <div id="all">
            <a href="all/"><h2>View All</h2></a>
        </div>
    </div>
    
    <div id="rightColumn">
        <Flourish text="About" />
        <a href="about/"><img id="aboutImage" src="imgs/about.jpg" alt="cento chefs"></a>
        <p id="aboutText">Cento Percento is an Italian inspired food blog and also a seasonal supper club based out of Brooklyn, NY. We have an amazing team at Cento Percento, a group of three friends who all share the same love of food, cooking and of course, EATING.<br><br>We created Cento Percento as a place for us to share our love of food, grow as chefs and have a platform to feed our friends and family. We hope you enjoy these recipes from our heart and come check us out at our next Supper Club. We can’t wait to feed you!</p>
    </div>
</div>