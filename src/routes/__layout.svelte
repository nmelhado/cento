
<script context="module">
    export const load = async ({url}) => {
    return {
        props: {
            activeTab: url.pathname,
        },
    }}
</script>

<script>
    import Footer from '$lib/Footer.svelte';
    import Nav from '$lib/Nav.svelte';

    export let activeTab;

    let navHeight, footerHeight;
	  let innerHeight = 0;
</script>

<svelte:window bind:innerHeight={innerHeight} />

<style>
    main {
        overflow-y: auto;
    }
</style>

<Nav {activeTab} bind:navHeight={navHeight} />

<main style="{activeTab == "/" ? "height" : "min-height"}: {innerHeight - navHeight - footerHeight}px;">
	<slot />
</main>

<Footer bind:footerHeight={footerHeight} />
