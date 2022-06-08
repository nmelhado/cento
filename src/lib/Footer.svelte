<script>
	import throttle from 'just-throttle';
	const year = new Date().getFullYear();

	export let footerHeight;

	let el, innerWidth;

	const resize = (w, h) => {
		footerHeight = h || 0;
	}


	$: throttle(resize(innerWidth, el?.offsetHeight));
</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
	footer {
		background-color: #ffffff;
		text-align: center;
		padding: 2em 0 3em;
        border-top: 0.5px solid #666;
		font-size: .8em;
		font-family: 'Source Sans Pro', sans-serif;
		width: 100%;
        display: block;
        position: absolute;
        bottom: 0;
		z-index: 1;
	}

    #nContactP {
        font-size: 13px;
        color: #ccc;
    }

    #nContact {
        text-decoration: none;
        color: #aaa;
    }

    #footerText {
        margin: 15px 0 25px 0;
    }

    .footerLinks {
        text-decoration: none;
        color: #666;
        padding: 35px 0 35px 0;
        margin: 0 0 0 2.5%;
    }

	/* small screens */    
	@media only screen and (max-width: 736px) {
		footer {
			padding: 1em 0 1.5em;
			font-size: .75em;
		}
	}
</style>

<div class="footerSpacer" style="height: {footerHeight}px;" />

<footer bind:this={el}>
    <div id="footerText">
        <a href="/" class="footerLinks" id="homeFooter">HOME</a>
        <a href="/about" class="footerLinks">ABOUT</a>
        <a href="/contact" class="footerLinks">CONTACT US</a>
        <a href="/supper-club" class="footerLinks">SUPPER CLUB</a>
        <a href="/terms" class="footerLinks">TERMS OF USE</a>
    </div>
    <p id="copyright">&copy; 2017-{year} Cento Percento LLC. All Rights Reserved.</p>
    <p id="nContactP"><i>Website by <a href="https://www.nmelhado.com" target="_blank" id="nContact">Nicholas Melhado</a></i></p>
</footer>