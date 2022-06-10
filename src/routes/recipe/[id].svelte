<script context="module">
    export async function load({params, fetch})  {
        const res = await fetch(`/api/getRecipe/${params.id}`)
        const recipesResp = res.json();
	
		return {
			props: {
                recipesResp,
			}
		};
	}
</script>

<script>
    import RecipePage from '../../lib/RecipePage.svelte';
    
    export let recipesResp;
</script>

{#await recipesResp}
    Stirring ingredients...
{:then recipeInfo }
    <RecipePage {recipeInfo} />
{/await}
