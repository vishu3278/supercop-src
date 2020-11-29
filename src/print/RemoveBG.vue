<template>
    <section>
        <nav class="panel">
            <p class="panel-heading">
                Resources to remove background from images
            </p>
            
            
            <a class="panel-block " onclick="openBrowser('https://www.remove.bg')" target="_blank">
                <span class="panel-icon">
                    <i class="las la-external-link-alt"></i>
                </span>
                remove.bg
            </a>
            <a class="panel-block" onclick="openBrowser('https://www.slazzer.com')" target="_blank">
                <span class="panel-icon">
                    <i class="las la-external-link-alt"></i>
                </span>
                slazzer.com
            </a>
            <a class="panel-block" onclick="openBrowser('https://photoscissors.com/upload')" target="_blank">
                <span class="panel-icon">
                    <i class="las la-external-link-alt"></i>
                </span>
                photoscissors.com
            </a>
            <a class="panel-block" onclick="openBrowser('https://www.kapwing.com/tools/remove-background')" target="_blank">
                <span class="panel-icon">
                    <i class="las la-external-link-alt"></i>
                </span>
                kapwing.com
            </a>
            <a class="panel-block" onclick="openBrowser('https://clippingmagic.com')" target="_blank">
                <span class="panel-icon">
                    <i class="las la-external-link-alt"></i>
                </span>
                clippingmagic.com
            </a>
            <a class="panel-block" onclick="openBrowser('https://pixlr.com/remove-background/')" target="_blank">
                <span class="panel-icon">
                    <i class="las la-external-link-alt"></i>
                </span>
                pixlr.com
            </a>
            <!-- <label class="panel-block">
                <input type="checkbox">
                remember me
            </label> -->
            <!-- <div class="panel-block">
                <button class="button is-link is-outlined is-fullwidth">
                    Reset all filters
                </button>
            </div> -->
        </nav>
        <!-- <p>Other resources for removing background from image.</p> -->
        <!-- <iframe src="https://www.remove.bg/" frameborder="0"></iframe> -->
        <!-- <iframe src="https://www.slazzer.com/" frameborder="0"></iframe> -->
        <!-- <iframe src="https://photoscissors.com/upload" frameborder="0"></iframe> -->
        <!-- <iframe src="https://www.kapwing.com/tools/remove-background" frameborder="0"></iframe> -->
        <!-- <iframe src="https://clippingmagic.com/" frameborder="0"></iframe> -->
        <!-- <iframe src="https://pixlr.com/remove-background/" frameborder="0"></iframe> -->
    </section>
</template>
<script>
export default {
    name: 'RemoveBG',
    data() {
        return {
            userData: ''
        }
    },
    mounted: function() {
        this.$emit("loaded", false);
        this.userData = this.$store.getters.getUser;
    },
}
</script>
<style lang="css" scoped>
iframe {
    width: 100vw;
    height: 100vh;
}
</style>