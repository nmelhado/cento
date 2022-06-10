import { get } from 'svelte/store';
import {recipes} from '$lib/stores';

export const getRecipes = async (refresh = false) => {
	if(get(recipes)[0] && !refresh) {
		return {recipes: get(recipes), stale: false};
	}

    // if this isn't a refresh data call, check if there are already transactions stored in localStorage
	if(!refresh) {
		let localRecipes = await JSON.parse(localStorage.getItem("recipes"));
		// check if transactions have been saved to localStorage before
		if(localRecipes) {
            return {
                recipes: localRecipes,
                stale: true
            }
		}
	}
    
	const res = await fetch('/api/getRecipes', {compress: true});

    // return store data if available
	if(!res.ok) {
		const errs = await res.json();
		console.error(errs.basicErr)
		console.error(errs.detailedErr)
		if(get(recipes)[0]) {	
			return {recipes: get(recipes), stale: false}
		}
		return {recipes: [], stale: false}
	}

	const newRecipes = await res.json();

    localStorage.setItem("recipes", JSON.stringify(newRecipes));

	recipes.update(() => newRecipes);

	return {recipes: newRecipes, stale: false};
}