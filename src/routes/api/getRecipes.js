import * as contentful from 'contentful';
import { simplifyRecipePreview } from '$lib/helpers/contentfulHelpers';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
});

export async function get() {
	const data = await client.getEntries({content_type: 'recipe'});

    const recipes = [];
    
    for(const recipe of data.items) {
        const simplifiedRecipe = simplifyRecipePreview(recipe.fields);
        simplifiedRecipe.id = recipe.sys.id;
        recipes.push(simplifiedRecipe);
    }

    return {
        status: 200,
        body: JSON.stringify(recipes)
    };
}