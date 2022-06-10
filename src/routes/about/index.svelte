<script>
    import Bio from "$lib/Bio.svelte";
    import Flourish from "$lib/Flourish.svelte";

    const team = [
        {
            bio: "Brittany is the founder and head chef at Cento Percento. Her Italian blood has made her a food lover (and eater) for as long as she can remember. A clean plate and “fare la scarpetta” (mopping up the last bits of sauce on your plate with a piece of bread) is a household staple. Over the years, she has developed a passion for cooking, creating recipes and devouring as much info as she possibly can on cooking and food. From her yearly trips to Italy, she is constantly inspired by the simplicity and authenticity of Italian food - always letting great ingredients speak for themselves. She is dedicated to showcasing the love and passion that goes into each Cento recipe and Seasonal Supper Club!",
            img: "britt"
        },
        {
            bio: "Rion is the sous chef and designer at Cento Percento. Taught to cook at a very young age by his Sicilian grandfather; a deep love for Italian food & culture have always been defining characteristics for him. Family meals, fresh/homemade food, humble ingredients, and beautiful flavors make up the building blocks of his culinary approach. His path as a designer has given him a eye for meticulous detail & playful compositions. Always exploring the limits of tradition, his design methodology, and his creative spirit give him a bold brazen style. Combining the approach of his humble italian heritage and his aggressive design style, Rion has an obsessive hunger to develop impactful compositions of flavor, plating, & narratives into each Cento Percento superclub, culinary lesson, & private event.",
            img: "rion"
        },
        {
            bio: "Nicholas is the head baker and webmaster at Cento Percento. Coming from a maths and sciences background, he feels right at home with the precision and experimentation that baking requires. However, while whipping up some popovers or cranking out a soufflé may be his bread and butter, his absolute favorite dishes are served for breakfast. Nothing makes him happier than making blueberry pancakes from scratch on a Sunday morning. He also built the Cento Percento website from the ground up and manages it for the team.",
            img: "nick"
        }
    ]
</script>

<h1>About</h1>

<p>Cento Percento is an Italian inspired food blog and also a seasonal supper club based out of Brooklyn, NY. We have an amazing team at Cento Percento, a group of three friends who all share the same love of food, cooking and of course, EATING. Together we do everything from the photography and food styling to creating new recipes and reinterpreting the classics. We created Cento Percento as a place for us to share our love of food, grow as chefs and have a platform to feed our friends and family. We hope you enjoy these recipes from our heart and come check us out at our next Supper Club. We can’t wait to feed you!</p>

<Flourish text="Our Team" />

{#each team as {bio, img}}
    <Bio {img} {bio} />
{/each}
