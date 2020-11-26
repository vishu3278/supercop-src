<template>
    <div>
        <div class="field is-grouped">
            <div class="control mr-1">
                <div class="file is-boxed is-warning">
                    <label class="file-label">
                        <input type="file" class="file-input" accept="image/*" v-on:change="loadImageFileAsURL">
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
            <div class="control is-warning">
                <div class="file is-boxed">
                    <label onclick="cameraGo()" class="file-label"><input type="button" class="file-input" value="">
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
            <p class="help">Select image to upload or capture using camera (max file size 200kb)</p>
        
        <div class="field mb-3">
            <figure class="image">
                <img v-bind:src="base64Photo">
            </figure>
            <div class="message is-danger" v-if="errors.length>0">
                <div class="message-body">
                    <p v-for="(err, index) in errors" :key="index">{{err}}</p>
                </div>
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
            errors: [],
        }
    },
    // props: ['imgID'],
    methods: {
        loadImageFileAsURL: function(e) {
            this.errors = [];
            let filesSelected = e.target.files[0];
            let file = Math.round((filesSelected.size / 1024));
            if (file >= 200) {
                this.errors.push('File too large (' + file + 'kb). Please select a file less than 200kb');
            } else if (file < 10) {
                this.errors.push('File too small (' + file + 'kb). Please select a file larger than 10kb');
            } else {
                this.errors.push('File size '+file + 'kb');
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