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

<h1>Services</h1>

<img src="/imgs/servicesBanner.jpg" id="supBanner" alt="cupcakes"/>

<Flourish text="Services" />

<div class="container">
    <div id="left">
        <p>Cento is passionate about food, creating Italian inspired dishes with the best ingredients. While we showcase this on our blog and through our supper club, we also have service offerings that range from catering and private events, to cooking lessons and cake making.</p>
        <Flourish text="Info" />
        <ul>
            <li>Cocktail Parties</li>
            <li>Dinner Parties</li>
            <li>Bridal Showers</li>
            <li>Baby Showers</li>
            <li>Cooking Lessons (Single &amp; Group lessons)</li>
            <li>Custom Cakes</li>
            <li>Party Favors</li>
            <li>Private Events</li>
            <li>Catering</li>
        </ul><br>
    </div>

    <img src="/imgs/servicesDescImage.jpg" id="descImage" alt="cupcake tower"/>
</div>