<template>
    <div>
        <div class="field is-grouped">
            <div class="control mr-1">
                <div class="file is-boxed is-warning">
                    <label class="file-label">
                        <input type="file" class="file-input" v-bind:accept="imgType" v-on:change="loadImageFileAsURL">
                        <span class="file-cta ">
                            <span class="file-icon">
                                <i class="las la-upload"></i>
                            </span>
                            <span class="file-label">
                                Upload file…
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="control is-warning is-expanded">
                <div class="file is-boxed">
                    <label class="file-label"><input type="button" onclick="cameraGo(event)" class="file-input" v-bind:value="imgId">
                        <span class="file-cta ">
                            <span class="file-icon">
                                <i class="las la-camera"></i>
                            </span>
                            <span class="file-label">
                                Camera
                            </span>
                        </span></label>
                </div>
            </div>
        </div>
        <p class="help" v-show="base64Photo==''">Select image to upload or capture using camera (max file size {{maxsize}}kb) - {{imgId}}</p>
        <div class="field mb-3">
            <figure class="image">
                <img v-bind:src="base64Photo" v-bind:id="imgId" >
                <!-- <input type="hidden" v-bind:id="imgId" v-model="base64Photo" > -->
            </figure>
            <p class="help is-success" v-if="success" v-text="success"></p>
            <div class="help is-danger" v-if="errors.length>0">
                <p v-for="(err, index) in errors" :key="index">{{err}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImagePreview',
    data: function() {
        return {
            name: 'Image Preview',
            base64Photo: '',
            minsize: 5,
            maxsize: 500,
            errors: [],
            success: '',
        }
    },
    props: { 'imgId': { type: String, required: true }, imgType: { default: 'image/jpeg' } },
    methods: {
        loadImageFileAsURL: function(e) {
            this.errors = [];
            let filesSelected = e.target.files[0];
            let file = Math.round((filesSelected.size / 1024));
            if (file >= this.maxsize) {
                this.base64Photo = '';
                this.success = '';
                this.errors.push('File too large (' + file + 'kb). Please select a file less than '+this.maxsize+'kb');
            } else if (file < this.minsize) {
                this.base64Photo = '';
                this.success = '';
                this.errors.push('File too small (' + file + 'kb). Please select a file larger than '+this.minsize+'kb');
            } else {
                this.errors = [];
                this.success = 'File size ' + file + 'kb';
                this.getBase64(filesSelected);
            }
        },
        getBase64: function(fileobject) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                this.base64Photo = e.target.result;
                this.$emit('imageData', this.base64Photo);
            }
            fileReader.readAsDataURL(fileobject);
        }
    }
}
</script>
<style scoped>
.file.is-boxed .file-cta {
    padding-left: 2.5em;
    padding-right: 2.5em;
}

.file.is-boxed .file-label {
    flex-grow: 1;
}
</style>