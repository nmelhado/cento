<script>
	import { prefetch } from '$app/navigation';

    export let recipe;

    const {name, difficulty, cookTime, previewImage, id} = recipe;

    let difficultyDisplay = "Easy";
    switch (difficulty) {
        case 2:
            difficultyDisplay = "Medium"
            break;
        case 3:
            difficultyDisplay = "Hard"
            break;
    
        default:
            break;
    }
</script>

<style>
    .recipe {
        display: inline-block;
        width: 30%;
        margin: 20px 1.5%;
        border: 1px solid #ccc;
        text-align: center;
        color: #888;
        text-decoration: none;
    }

    .prevImage {
        width: 90%;
        margin: 10px 5%;
    }

    .resName {
        height: 33px;
    }

    h6 {
        display: inline-block;
        font-size: 14px;
        margin: 10px 0;
    }

    .info {
        display: flex;
        justify-content: space-evenly;
    }

    .recipeDif {
        height: 20px;
        margin: 0 14px;
        vertical-align: middle;
    }

    .recipeTime {
        height: 20px;
        margin: 0 8px;
        vertical-align: middle;
    }
</style>

<a
    href="/recipe/{id}"
    class="recipe"
    
    on:touchstart={() => prefetch(`/recipe/${id}`)}
    on:focus={() => prefetch(`/recipe/${id}`)}
    on:mouseover={() => prefetch(`/recipe/${id}`)}
>
    <img class="prevImage" src="{previewImage}" alt="{name} preview" />
    <h6 class="resName">{name}</h6>
    <div class="info">
        <img class="recipeDif" src="imgs/{difficultyDisplay}.png" alt="{difficultyDisplay} difficulty"/>
        <span>
            <img class="recipeTime" src="imgs/clock.png" alt="clock" />
            <h6>{cookTime}</h6>
        </span>
    </div>
</a>