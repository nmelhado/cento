
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

    #mainBlock {
        padding: 0;
        margin: 100px auto 80px auto;
        background-color: #fff;
        overflow: hidden;
        text-align: justify;
    }
</style>

<Nav {activeTab} bind:navHeight={navHeight} />

<main style="min-height: {innerHeight - navHeight - footerHeight}px;">
    <div id="mainBlock">
        <slot />
    </div>
</main>

<Footer bind:footerHeight={footerHeight} />
