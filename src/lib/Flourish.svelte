<script>
    export let text;
</script>

<style>
    .break {
        white-space: nowrap;
        display: flex;
        align-items: center;
    }

    h2 {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        color: var(--accent);;
    }

    .flourish {
        width: 60px;
        display: inline-block;
        margin-right: 20px;
        vertical-align: middle;
        border-color: var(--accent);
    }

    .flourishLine {
        display: inline-flex;
    }

    hr {
        width: 100%;
        max-width: 1000px;
        color: var(--accentSecondary);
        border-color: var(--accentSecondary);
        border-style: solid;
    }
</style>

<div class="break">
    <h2>{text}</h2>
    <img class="flourish" src="/imgs/flourish.png" alt="flourish" />
    <hr class="flourishLine">
</div>