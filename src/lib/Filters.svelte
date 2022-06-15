<script>
	import { goto } from '$app/navigation';
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

        let query = '?page=1';

        query += getSelected(meals, 'meals');
        query += getSelected(seasons, 'seasons');
        query += getSelected(tags, 'tags');
        query += getSelected(difficulties, 'difficulty');

        goto(`/recipes${query}`, {noscroll: true,  keepfocus: true});
        updateFilters();
    }

    const getSelected = (o, key) => {
        let selected = [];

        for (const k in o) {
            if (o[k].selected) {
                selected.push(o[k].name)
            }
        }

        // some options are selected
        if(selected.length) {
            return `&${key}=${selected.join(',')}`
        }

        // no options selected
        return '';
    }
</script>

<style>
    .filterMenu {
        position: relative;
        width: 250px;
        height: 100%;
        border-right: 1px solid var(--accentSecondary);
    }

    h2 {
        vertical-align: middle;
        margin-right: 10px;
        color: var(--accent);;
    }
</style>

<div class="filterMenu">
    <h2>Filters</h2>
    <!-- tags -->
    <Filter options={meals} key='Meals' label="Meals" on:newQuery={updateQuery} />
    <Filter options={seasons} key='Seasons' label="Seasons" on:newQuery={updateQuery} />
    <Filter options={tags} key='Tags' label="Tags" on:newQuery={updateQuery} />
    <Filter options={difficulties} key='Difficulties' label="Max Difficulty" on:newQuery={updateQuery} />
</div>