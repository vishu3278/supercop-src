<template>
    <section>
        <nav class="panel">
            <div class="panel-heading has-text-info-dark ">
                Resources to remove background from images
            </div>
            <a class="panel-block " onclick="openBrowser('https://www.remove.bg')"><span class="panel-icon"><i class="las la-external-link-alt"></i></span> remove.bg</a>
            <a class="panel-block" onclick="openBrowser('https://www.slazzer.com')"><span class="panel-icon"><i class="las la-external-link-alt"></i></span>slazzer.com</a>
            <a class="panel-block" onclick="openBrowser('https://photoscissors.com/upload')"><span class="panel-icon"><i class="las la-external-link-alt"></i></span>photoscissors.com</a>
            <a class="panel-block" onclick="openBrowser('https://www.kapwing.com/tools/remove-background')"><span class="panel-icon"><i class="las la-external-link-alt"></i></span>kapwing.com</a>
            <a class="panel-block" onclick="openBrowser('https://clippingmagic.com')"><span class="panel-icon"><i class="las la-external-link-alt"></i></span>clippingmagic.com</a>
            <a class="panel-block" onclick="openBrowser('https://pixlr.com/remove-background/')"><span class="panel-icon"><i class="las la-external-link-alt"></i></span>pixlr.com</a>
            <!-- <div class="panel-block">
                <button class="button is-fullwidth" onclick="generatePdf()"><span class="panel-icon"><i class="las la-file-pdf"></i></span> Sample PDF Download</button>
            </div> -->
            <!-- <label class="panel-block">
                <input type="checkbox">
                remember me
            </label> -->
            <!-- <div class="panel-block">
                <button class="button is-link is-fullwidth" onclick="copyFile(event,)">
                    Testing file copy
                </button>
            </div> -->
        </nav>
        <div class="notification is-info is-light">
            <p>How to use:</p>
            <ol class="m-3">
                <li>Upload your image.</li>
                <li>Download the output image.</li>
                <li>Navigate and upload into the form.</li>
            </ol>
        </div>
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