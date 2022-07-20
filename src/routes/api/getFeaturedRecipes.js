import * as contentful from 'contentful';
import { simplifyFeaturedRecipes } from '$lib/helpers/contentfulHelpers';

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: import.meta.env.VITE_CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
});

const featuredRecipeID = '4Wcp5jiHZHg3cB4neMoVjD';

export async function get() {
	const data = await client.getEntry(featuredRecipeID);

    const featuredRecipes = simplifyFeaturedRecipes(data.fields);

    featuredRecipes.left.id = data.fields.leftRecipe.sys.id;
    featuredRecipes.middle.id = data.fields.middleRecipe.sys.id;
    featuredRecipes.right.id = data.fields.rightRecipe.sys.id;

    return {
        status: 200,
        body: JSON.stringify(featuredRecipes)
    };
}