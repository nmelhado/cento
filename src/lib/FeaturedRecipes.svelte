<script>
    import {getFeaturedRecipes} from '$lib/helpers'
	import { prefetch } from '$app/navigation';
    import { onMount } from 'svelte';

    export let featuredRecipes, stale;

    let left = featuredRecipes.left;
    let middle = featuredRecipes.middle;
    let right = featuredRecipes.right;

    onMount( async () => {
        if(stale) {
            const newFeaturedRecipes = await getFeaturedRecipes(true);
            left = newFeaturedRecipes.featuredRecipes.left;
            middle = newFeaturedRecipes.featuredRecipes.middle;
            right = newFeaturedRecipes.featuredRecipes.right;
            stale = false;
        }
    })

    const getDifficulty = (d) => {
        switch (d) {
            case 2:
                return "Medium"
            case 3:
                return "Hard"
            default:
                return "Easy";
        }
    }
</script>

<style>
    #higlightedRecipes {
        display: inline-block;
        width: 100%;
        text-align: center;
        margin: 0;
        padding-bottom: 50px;
        padding-top: 30px;
        border-bottom: .5px solid #666;
        background-color: #fff;
    }

    #leftImage {
        display: inline-block;
        text-align: center;
        width: 24%;
        vertical-align: middle;
        box-shadow: 0 0 24px -1px #666;
    }

    #mainImage {
        display: inline-block;
        width: 25%;
        vertical-align: middle;
        box-shadow: 0 0 24px -1px #666;
    }

    a.hRecipe:hover  .featuredImage{
        filter: brightness(40%);
    }

    a.hRecipe:hover span{
        display: inline-block;
    }

    #rightImage {
        display: inline-block;
        width: 24%;
        vertical-align: middle;
        box-shadow: 0 0 24px -1px #666;
    }

    .hRecipe {
        position: relative;
        text-align: center;
        margin: 0 2%;
    }

    a span {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 22px;
        margin: 0;
        font-weight: 600;
    }

    a span.featDesc {
        display: none;
        position: absolute;
        padding: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 16px;
        margin-top: 15%;
        font-weight: 600;
        white-space: nowrap;
    }
    
    .featuredDif {
        height: 24px;
        margin: 0 9px;
        vertical-align: middle;
    }
</style>


<div id="higlightedRecipes">
    <a
        href="recipe/{left.id}"
        class="hRecipe"

        on:touchstart={() => prefetch(`/recipe/${left.id}`)}
        on:focus={() => prefetch(`/recipe/${left.id}`)}
        on:mouseover={() => prefetch(`/recipe/${left.id}`)}
    >
        <img id="leftImage" class="featuredImage" src="{left.previewImage}" alt="featured left preview">
        <span>{left.name}</span>
        <span class="featDesc">
            {left.meal}
            <img class="featuredDif" src="imgs/{getDifficulty(left.difficulty)}w.png" alt="{getDifficulty(left.difficulty)}" />
            <img class="featuredDif" src="imgs/clockw.png" alt="clock" /> 
            {left.cookTime}
        </span>
    </a>

    <a
        href="recipe/{middle.id}"
        class="hRecipe"

        on:touchstart={() => prefetch(`/recipe/${middle.id}`)}
        on:focus={() => prefetch(`/recipe/${middle.id}`)}
        on:mouseover={() => prefetch(`/recipe/${middle.id}`)}
    >
        <img id="mainImage" class="featuredImage" src="{middle.previewImage}" alt="featured middle preview">
        <span>{middle.name}</span>
        <span class="featDesc">
            {middle.meal}
            <img class="featuredDif" src="imgs/{getDifficulty(middle.difficulty)}w.png" alt="{getDifficulty(middle.difficulty)}" />
            <img class="featuredDif" src="imgs/clockw.png" alt="clock" /> 
            {middle.cookTime}
        </span>
    </a>

    <a
        href="recipe/{right.id}"
        class="hRecipe"

        on:touchstart={() => prefetch(`/recipe/${right.id}`)}
        on:focus={() => prefetch(`/recipe/${right.id}`)}
        on:mouseover={() => prefetch(`/recipe/${right.id}`)}
    >
        <img id="rightImage" class="featuredImage" src="{right.previewImage}" alt="featured right preview">
        <span>{right.name}</span>
        <span class="featDesc">
            {right.meal}
            <img class="featuredDif" src="imgs/{getDifficulty(right.difficulty)}w.png" alt="{getDifficulty(right.difficulty)}" />
            <img class="featuredDif" src="imgs/clockw.png" alt="clock" /> 
            {right.cookTime}
        </span>
    </a>
</div>