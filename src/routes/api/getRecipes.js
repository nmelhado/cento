import * as contentful from 'contentful';
import { simplifyRecipePreview } from '$lib/helpers/contentfulHelpers';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
});

export async function get() {
	const data = await client.getEntries();

    const recipes = [];
    for(const recipe of data.items) {
        recipes.push(simplifyRecipePreview(recipe.fields));
    }
    data.items = data.items.filter(i => i.sys.publishedVersion)


    return {
        status: 200,
        body: JSON.stringify(recipes)
    };
}