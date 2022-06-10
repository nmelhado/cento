<script>
    import Flourish from "$lib/Flourish.svelte";
</script>

<style>
    #supBanner {
        width: 100%;
    }

    .container {
        display: flex;
    }

    #descImage {
        margin-left: 2em;
        width: 300px;
    }
</style>

<h1>Supper Club</h1>

<img src="/imgs/supBanner.jpg" id="supBanner" alt="supper club banner" />

<Flourish text="Supper Club" />

<div class="container">
    <div id="left">
        <p>Cento Percento is a seasonal supper club based out of Brooklyn, NY. We serve five courses of Italian inspired dishes made with ingredients that are sourced locally in Brooklyn. At a Cento Percento supper club, you can expect a selection of red and white wine that pairs well with the meal, a signature drink of the night, and of course lots of delicious food.  Watch as the food is prepared in front of you in an open kitchen.  Come join us at our next event!</p>
        <Flourish text="Info" />
        <ul>
            <li><b>Location:</b> Brooklyn, NY</li>
            <li><b>Timing:</b> 6:30PM - 10:30PM</li>
            <li><b>Cost:</b> $95 per person</li>
        </ul><br>
        <center><i>Dates and capacity are announced through social media and email.</i></center>
    </div>
    <img src="/imgs/descImage.jpg" id="descImage" alt="Brittany plating"/>
</div>