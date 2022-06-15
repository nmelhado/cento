<script>
	import { slide } from 'svelte/transition';
    export let total, perPage, page, top = false;
    let pageLabels = [];
    $: totPages = Math.ceil(total / perPage) || 0;
    const computePages = (curPage, pages) => {
        let tempPageLabels = []
        let before = false;
        let after = false;
        for(let i = 0; i < pages; i++) {
            if(pages < 8 || i == 0 || i == (pages - 1) || ((curPage - 3) < i && i < (curPage +  3))) {
                tempPageLabels.push(i + 1);
            } else if(!before && (curPage - 3) < i) {
                before = true;
                tempPageLabels.push("...");
            } else if(!after && i < (curPage +  3)) {
                after = true;
                tempPageLabels.push("...");
            }
        }
        pageLabels = tempPageLabels;
    }
    const changePage = (dest) => {
        if(!top) {
            window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
        }
        page = dest;
    }
    $: computePages(page, totPages);
</script>

<style>
    :global(.button) {
        color: #aaa;
        cursor: pointer;
        vertical-align: sub;
    }
    :global(.button:hover) {
        color: #0082c3;
    }
    .paginationBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 550px;
        margin: 10px auto;
        text-align: center;
    }
    .pg {
        font-size: 1.2em;
        padding: .4em;
        color: #aaa;
        /* not selectable */
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
    
    .spacer {
        padding: .4em 0;
        cursor: default;
        user-select: none;
    }
    .dest {
        cursor: pointer;
    }
    .dest:hover {
        color: #0082c3;
    }
    .selected {
        color: var(--blueOne);
        cursor: default;
        user-select: none;
    }
    .chevronButton {
        cursor: pointer;
        text-align: center;
        font-size: 1.5em;
        width: 24px;
        vertical-align: middle;
        padding: .3em 0;
        /* not selectable */
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
    .placeholder {
        width: 24px;
    }
    .totals {
        font-style: italic;
        cursor: default;
        user-select: none;
        color: #bbb;
        font-size: 0.8em;
        text-align: center;
    }
</style>
{#if total > 0 && totPages > 1 }
    <div class="paginationBar" transition:slide>
        {#if page > 0}
            <span class="chevronButton" on:click={() => changePage(page - 1)}>«</span>
        {:else}
            <span class="placeholder" />
        {/if}
        <div class="numbers">
            {#each pageLabels as pageLabel}
                {#if pageLabel == page + 1}
                    <span class="selected pg">{pageLabel}</span>
                {:else if pageLabel == "..."}
                    <span class="pg spacer">{pageLabel}</span>
                {:else}
                    <span class="dest pg" on:click={() => changePage(pageLabel - 1)}>{pageLabel}</span>
                {/if}
            {/each}
        </div>
        {#if page < totPages - 1}
            <span class="chevronButton" on:click={() => changePage(page + 1)}>»</span>
        {:else}
            <span class="placeholder" />
        {/if}
    </div>
    {#if !top}
        <div class="totals">{page * perPage + 1} - {page + 1 == totPages ? total : (page + 1) * perPage} of {total}</div>
    {/if}
{/if}