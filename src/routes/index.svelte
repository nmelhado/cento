<script context="module">
    import {getRecipes} from '$lib/helpers'
    export function load() {
        const recipesResp = getRecipes();
	
		return {
			props: {
                recipesResp,
			}
		};
	}
</script>

<script>
import MainRecipes from "../lib/MainRecipes.svelte";

    export let recipesResp;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#await recipesResp}
    Stirring ingredients...
{:then {recipes, stale}}
    <MainRecipes {recipes} {stale} />
{/await}
