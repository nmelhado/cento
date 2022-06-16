<script>
    import Filter from "$lib/Filter.svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function updateFilters() {
        dispatch('newFilters');
    }

    export let seasons, tags, meals, difficulties;

    const updateQuery = (e) => {
        const {newMeals, newTags, newSeasons, newDifficulties} = e.detail;

        if(newMeals) meals = newMeals;
        if(newTags) tags = newTags;
        if(newSeasons) seasons = newSeasons;
        if(newDifficulties) difficulties = newDifficulties;

        updateFilters();
    }
</script>

<style>
    .filters {
        position: relative;
        width: 250px;
        height: 100%;
        border-right: 1px solid var(--accentSecondary);
    }

    h2 {
        vertical-align: middle;
        margin-right: 10px;
        color: var(--accent);;
        text-align: center;
    }
</style>

<div class="filters">
    <h2>Filters</h2>
    <!-- tags -->
    <Filter options={meals} key='Meals' label="Meals" on:newQuery={updateQuery} />
    <Filter options={seasons} key='Seasons' label="Seasons" on:newQuery={updateQuery} />
    <Filter options={tags} key='Tags' label="Tags" on:newQuery={updateQuery} />
    <Filter options={difficulties} key='Difficulties' label="Max Difficulty" on:newQuery={updateQuery} />
</div>