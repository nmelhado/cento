<script>
import Flourish from "./Flourish.svelte";

    export let recipeInfo;

    const {name, difficulty, cookTime, mainImage, recipe, ingredients, description, tags, meal, season, date} = recipeInfo;

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
    #topParent {
        display: inline-block;
        width: 100%;
        top: 0;
        margin: 0;
        padding: 0;
        min-width: 600px;
        vertical-align: middle;
    }

    #mainImage {
        display: inline-block;
        width: 35%;
        margin: -5px 0 0 10%;
        vertical-align: text-top;
    }

    #ingrTable {
        display: inline-table;
        width: 38%;
        margin: 0 8%;
        padding: 0;
        overflow: hidden;
    }

    #recipeData {
        margin-top: 0;
        margin-bottom: 10px;
        text-align: center;
    }

    #difficulty {
        height: 20px;
        margin: 0 14px 0 0;
        vertical-align: middle;
    }

    h4 {
        margin-top: 0;
        display: inline-block;
        color: #666;
        margin-bottom: 7px;
    }

    #time {
        height: 20px;
        margin: 0 14px;
        vertical-align: middle;
    }

    #date {
        color: #bbb;
        font-style: italic;
        font-size: 13px;
    }

    #description {
        display: block;
        width: 90%;
        max-width: 1000px;
        margin: 0 auto;
        text-align: justify;
        overflow: hidden;
    }

    #content {
        width: 100%;
        max-width: 900px;
        padding: 0;
        border-radius: 0;
        margin: 50px auto 0 auto;
        border-spacing: 0;
        overflow: hidden;
    }

    .contentText {
        width: 84%;
        margin: 40px 8% 0 8%;
        text-align: justify;
    }

    :global(.recipeImg) {
        width: 84%;
        margin: 10px 8%;
    }

    /* related css */
    #related {
        width: 95%;
        max-width: 996px;
        margin: 40px auto 0;
        padding: 2px;
        text-align: center;
        font-size: 20px;
        overflow: hidden;
    }

    .relatedField {
        display: inline-flex;
    }

    .relatedField a {
        padding: 4px;
        text-decoration: none;
        color: #666;
        border: 1px solid #ccc;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>

<div id="top">
    <div id="topParent">
    <img id="mainImage" src="{mainImage}" alt="{name} main image"/>
    <div id="ingrTable">
        <h1>{name}</h1>
        <div id="recipeData">
            <!-- difficulty -->
            <img id="difficulty" src="/imgs/{difficultyDisplay}.png"  alt="{difficultyDisplay} difficulty"/>
            <h4>{difficultyDisplay}</h4>
            <!-- cook time -->
            <img id="time" src="/imgs/clock.png" alt="clock" /><h4>{cookTime}</h4><br>
            <!-- date added -->
            <h4 id="date">{date}</h4>
        </div>

        <Flourish text="Ingredients" />
        <ul>
            {#each ingredients as ingredient}
                <li>{ingredient}</li>
            {/each}
        </ul>

    </div>
        <div id="description">
            <Flourish text="Description" />
            <p>{description}</p>
        </div>
    </div>
</div>

<!-- recipe -->
<div id="content">
    <Flourish text="Recipe" />
    <div class="contentText">
        {@html recipe}
    </div>
</div>


<div id="related">
    <div class="relatedField">
        <h5>Seasons:   
            {#each season as s}
                <!-- TODO: link to season filtering -->
                <a href="/recipes/{s}">{s}</a> 
            {/each}
        </h5>
    </div>
    <div class="relatedField">
        <h5>Meal:   <a href="/recipes/{meal}">{meal}</a></h5>
    </div>
    <div class="relatedField">
        <h5>Tags:   
            {#each tags as tag}
                <a href="/recipes/{tag}">{tag}</a> 
            {/each}
        </h5>
    </div>
</div>