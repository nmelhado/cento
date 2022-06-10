<script>
    export let img, bio;
    const name = bio.substring(0, bio.indexOf(' '));
    const restOfBio = bio.substring(bio.indexOf(' ') + 1);
</script>

<style>
    .bioBlock {
        width: 100%;
        padding: 25px 10px;
        border-bottom: 1px solid #ccc;
        margin: 0;
    }

    .bioPic {
        display: inline-flex;
        margin: 0 5% 0 0;
        padding: 0;
        width: 15%;
        vertical-align: text-top;
    }

    .bioText {
        display: inline-block;
        width: 70%;
        padding: 0 2.3%;
        margin: 0;
        vertical-align: text-top;
    }
</style>

<div class="bioBlock">
    <img src="/imgs/{img}.jpg" class="bioPic" alt="{name} bio pic"/>
    <p class="bioText"><b>{name}</b> {restOfBio}</p>
</div>