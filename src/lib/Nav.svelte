<script>
	import throttle from 'just-throttle';
	import { prefetch, goto } from '$app/navigation';
    import NavIcon from './NavIcon.svelte';
    
    export let activeTab, navHeight;
    let y, el, innerWidth, searchExpanded = false, searchValue = "";

    const searchClick = () => {
        if(searchExpanded) {
            submitSearch()
        } else {
            searchExpanded = !searchExpanded;
        }
    }

    const submitSearch = () => {
        const sv = searchValue;
        searchValue = "";
        searchExpanded = !searchExpanded;
        goto(`recipes?search=${sv}`)
    }

    const setNavHeight = (e, w) => {
        navHeight = e?.offsetHeight;
    }

    $: throttle(setNavHeight(el, innerWidth));

    const navItems = [
        {
            dest: "recipes",
            icon: "iconRecipes",
            name: "Recipes"
        },
        {
            dest: "supper-club",
            icon: "iconSupper",
            name: "Supper Club"
        },
        {
            dest: "services",
            icon: "iconServices",
            name: "Services"
        },
        {
            dest: "about",
            icon: "iconAbout",
            name: "About"
        },
        {
            dest: "contact",
            icon: "iconContact",
            name: "Contact"
        }
    ]
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={innerWidth}/>

<svelte:head>
	<title>Cento Percento | {!activeTab[1] ? 'Home' : activeTab[1].toUpperCase() + activeTab.slice(2)}</title>
</svelte:head>

<style>
    #banner {
        display: flex;
        background-color: #fff;
    }

    #logo {
        display: block;
        width: 100%;
    }

    .bannerInner {
        display: inline-block;
        width: 80%;
        max-width: 600px;
        padding: 10px;
        left: 0;
        right: 0;
        margin: 40px auto 20px;
    }

    .navbar {
        width: 100%;
        height: 40px;
        max-width: 1000px;
        padding: 0;
        border-top: 1px solid var(--centoPrimary);
        border-bottom: 1px solid var(--centoPrimary);
        background-color: #fff;
        margin: 12px auto 0 auto;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        z-index: 20;
        position: absolute;
        /* top: 280px; */
        left: 0;
        right: 0;
    }

    #navLogo {
        height: 70px;
        z-index: 22;
    }

    .navButtons a {
        color: #999;
        text-align: center;
        padding: 0 4px;
    }

    #igLogo {
        height: 24px;
        margin: 0 14px;
        vertical-align: middle;
    }

    #navbarChild {
        background: none;
        content: "";
        position: absolute;
        display: flex;
        justify-content: space-around;
        vertical-align: bottom;
        top: 2px;
        left: -3px;
        right: -3px;
        bottom: 2px;
        border-top: 2px solid var(--centoSecondary);
        border-bottom: 2px solid var(--centoSecondary);
        z-index: 19;
    }

    .insta {
        align-items: center;
        display: flex;
    }

    .navButtons {
        display: inline-block;
        vertical-align: middle;
        padding: 0;
        margin-top: -19px;
    }

    #BKSupperClub {
        display: flex;
        float: right;
        margin-top: -60px;
        color: #666;
        font-size: 16px;
        font-weight: 500;
    }
    /* Search */

    .navSearch {
        position: absolute;
        display: inline-block;
        vertical-align: middle;
        padding: 0;
        top: 55px;
        right: 17px;
        z-index: 99;
    }

    .searchText {
        width: 130px;
        display: inline-block;
        transition: all 0.5s;
        opacity: 1;
        font-size: 1em;
    }

    #searchButton {
        display: inline-block;
        height: 18px;
        padding: 3px 30px;
        background-color: var(--centoPrimary);
        border-radius: 4px;
        margin: 0;
        vertical-align: middle;
        cursor: pointer;
        transition: padding 0.5s;
    }

    .hide {
        width: 0;
        opacity: 0;
        pointer-events: none;
    }

    .searchClose {
        z-index: 90;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    /* STICKY NAVBAR */
    .navParent {
        z-index: 99;
        position: relative;
    }

    .sticky {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
</style>


<!-- closes the expanded search bar -->
<div class="searchClose" class:hide={!searchExpanded} on:click={() => searchExpanded = false} />

<header>
    <!-- banner -->
	<div id="banner" bind:this={el}>
		<a href="/" class="bannerInner" on:touchstart={() => prefetch('/')} on:mouseover={() => prefetch('/')}  on:focus={() => prefetch('/')} >
            <img src="/imgs/banner.png" id="logo" alt="banner" />
        </a>
	</div>

    <!-- nav bar -->
    <div class="navParent">
        <nav class="navbar" class:sticky={y > el?.offsetHeight}>
            <p id="BKSupperClub">Brooklyn Seasonal Supper Club</p>
            <div id="navbarChild">
                <!-- Nav Items -->
                {#each navItems as {dest, icon, name}}
                    <NavIcon {dest} {icon} {name} />
                {/each}

                <!-- Cento Logo -->
                <div class="navButtons">
                  <a href="/"><img src="/imgs/navLogo.png" id="navLogo" alt="nav logo"></a>
                </div>

                <!-- Insta Link -->
                <a href="https://www.instagram.com/cento.percento/?hl=en" class="insta"><img src="/imgs/ig.png" id="igLogo" alt="instagram logo"></a>
                <br>
                {#if activeTab != "/recipes"}
                    <form class="navSearch"  on:submit|preventDefault={submitSearch}>
                        <input type="text" class="searchText" class:hide={!searchExpanded} name="q" bind:value={searchValue} />
                        <img type="image" style="padding: 3px {searchExpanded ? 9: 30}px;" src="/imgs/search.png" id="searchButton" alt="Submit Form" on:click={() => searchClick()}/>
                    </form>
                {/if}
            </div>
        </nav>
    </div>    
</header>
