<script>
    import { createEventDispatcher } from 'svelte';
    export let options, label, key;

    const dispatch = createEventDispatcher();

    function updateQuery() {
        setTimeout(() => {
            const o = {};
            o[`new${key}`] = options;
            dispatch('newQuery', o);
        }, 1);
    }

	let selectedOptions = [];
</script>

<style>
    h3 {
        vertical-align: middle;
        margin: 0 .5em;
        color: var(--accent);
        font-weight: 400;
        white-space: nowrap;
    }

    .options {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    input[type="checkbox"] {
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        appearance: none;
        /* For iOS < 15 to remove gradient background */
        background-color: #fff;
        /* Not removed via appearance */
        margin: 0;
    }

    label {
        color: var(--centoPrimary);
        border: 1px solid var(--accent);
        border-radius: 2em;
        background-color: #fff;
        font-size: 0.7em;
        padding: .5em 1em;
        margin: .5em;
        cursor: pointer;
    }

    .selected {
        background-color: var(--centoPrimary);
        border-color: #fff;
        color: #fff;
    }

    .heading {
        display: flex;
        align-items: center;
        margin: 1em 0;
    }

    hr {
        display: inline-flex;
        width: 100%;
        max-width: 1000px;
        color: var(--accentSecondary);
        border-color: var(--accentSecondary);
        border-style: solid;
    }

    .filter {
        margin: 3em 0;
    }
</style>

<div class="filter">
    <div class="heading">
        <hr />
        <h3>{label}</h3>
        <hr />
    </div>
    <div class="options">
        {#each options as {selected, name}}
            <label class:selected={selected} on:click={updateQuery}>
                <input
                    type="checkbox"
                    bind:group={selectedOptions}
                    value={name}
                    bind:checked={selected}
                /> {name}
            </label>
        {/each}
    </div>
</div>