import {getRecipes} from '$lib/helpers'

export const refreshRecipes = async () => {
    const newRecipes = await getRecipes(true);
    return newRecipes.recipes;
}

export const getPage = (pg, perPage, filteredResults) => {
    const start = pg * perPage
    const end = (pg + 1) * perPage;

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    params.page = pg + 1;

    // set new paginatedRecipes
    replaceStateWithQuery(params);
    return filteredResults.slice(start, end);
}

export const replaceStateWithQuery = (values) => {
    const url = new URL(window.location.toString());
    for (let [k, v] of Object.entries(values)) {
        if (v) {
            url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
        } else {
            url.searchParams.delete(k);
        }
    }
    history.replaceState({}, '', url);
};

export const getFilters = (rs, queryVars) => {
    const seasonsFs = new Set();
    const tagsFs = new Set();
    const mealsFs = new Set();
    const difficultiesFs = new Set();
    // build pool of queries
    for(const r of rs) {
        // add seasons
        for(const s of r.season) {
            seasonsFs.add(s);
        }
        // add tags
        for(const t of r.tags) {
            tagsFs.add(t);
        }
        // add meal
        mealsFs.add(r.meal);
        // add difficulty
        difficultiesFs.add(r.difficulty);
    }

    const seasons = buildFilters([...seasonsFs], 'seasons', queryVars);
    const meals = buildFilters([...mealsFs], 'meals', queryVars);
    const difficulties = buildFilters([...difficultiesFs], 'difficulties', queryVars);
    const tags = buildFilters([...tagsFs], 'tags', queryVars);

    return {
        seasons,
        meals,
        difficulties,
        tags,
    }
}

export const getSelectedForQuery = (q, o, key) => {
    let selected = [];

    for (const k in o) {
        if (o[k].selected) {
            selected.push(o[k].name)
        }
    }

    q[key] = selected.join(',');

    return q;
}

// non exported functions

const buildFilters = (arr, key, queryVars) => {
    // empty array to clean data
    const dest = [];

    // loop through and determine if they're already selected
    for(const i of arr) {
        dest.push({
            name: i,
            selected: getSelected(i, key, queryVars)
        })
    }

    return dest;
}

const getSelected = (val, key, queryVars) => {
    if(key == 'difficulty') {
        // this param can only have one value
            return val == queryVars[key];
    } else {
        return (queryVars[key] && queryVars[key].has(val)) || false;
    }
}
