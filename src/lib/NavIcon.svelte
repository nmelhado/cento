<script>
    export let dest, icon, name;
</script>

<style>
    a {
        display: inline-flex;
        align-items: end;
        color: #999;
        font-size: 18px;
        padding: 0 4px;
        text-decoration: none;
    }

    .linkText {
        margin-left: 8px;
        margin-right: 12px;
    }

    .navIcon {
        height: 26px;
        filter: brightness(140%);
    }

    a:hover {
        color: #666;
        text-decoration: underline;
        text-decoration-color: #ddd;
    }

    a:hover .navIcon {
        filter: brightness(80%);
    }
</style>

<a href="/{dest}">
    <img src="/imgs/{icon}.png" class="navIcon" alt="{name} icon">
    <span class="linkText">
        {name}
    </span>
</a>