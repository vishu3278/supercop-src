<template>
    <div>
        <!-- <vue-html2pdf :show-layout="false" :float-layout="false" :enable-download="true" :preview-modal="false" :paginate-elements-by-height="1800" filename="card-hee" :pdf-quality="2" :manual-pagination="false" pdf-format="a4" pdf-orientation="portrait" pdf-content-width="210mm" :html-to-pdf-options="html2PDFoptions" @hasDownloaded="hasDownloaded($event)" ref="html2Pdf">
            <section slot="pdf-content"> -->
        <!-- <div id="preview">
                    <div>
                        <div class="wrapper">
                            <div id="front" class="artwork">
                                <div class="card-body"><img src="https://thesupercop.com/workspace/dist/img/aadhaar-front.jpg" class="base" alt="aadhaar">
                                    <div class="printable">
                                        <div class="photo"><img v-bind:src="getAadhaarImg + $route.params.photo" alt="photo"></div>
                                        <div class="info">
                                            <p>{{$route.params.full_name_hi}}</p>
                                            <p>{{$route.params.full_name_en}}</p>
                                            <p>जन्म तिथि/DOB: {{qrdob}}</p>
                                            <p>{{$route.params.gender_en}} /{{$route.params.gender_hi}}</p>
                                            <div class="aadhaar">{{$route.params.aadhaar_number}} </div>
                                        </div>
                                        <div class="qrcode" id="qrcode">
                                            <qrcode-vue :value="qrcode" :size="100" renderAs="svg" level="H"></qrcode-vue>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="back" class="artwork">
                                <div class="card-body">
                                    <div class="printable"> <img src="https://thesupercop.com/workspace/dist/img/aadhaar-back.jpg" class="base" alt="aadhaar">
                                        <div class="date">Date: </div>
                                        <div class="address-h">
                                            <p><strong>पता:</strong></p>
                                            <p>{{$route.params.parent_type}} {{$route.params.parent_name_hi}}, {{$route.params.address_line_hi}}, {{$route.params.address_district_hi}}</p>
                                            <p>{{$route.params.address_state_hi}}-{{$route.params.address_pincode}}</p>
                                        </div>
                                        <div class="address-e">
                                            <p><strong>Address:</strong></p>
                                            <p>{{$route.params.parent_type}} {{$route.params.parent_name_en}}, {{$route.params.address_line_en}}, {{$route.params.address_district_en}} </p>
                                            <p>{{$route.params.address_state_en}}-{{$route.params.address_pincode}}</p>
                                        </div>
                                        <div class="aadhaar">{{$route.params.aadhaar_number}}</div>
                                        <div class="barcode">
                                            <barcode :value="aadhaarno" displayValue="false" width="1" height="12" margin="0">
                                                Show this if the rendering fails.
                                            </barcode>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
        <div class="wrapper">
            <div class="card">
                <div class="card-content">
                    <p class="title has-text-success">
                        {{$route.params.cardid}}
                    </p>
                    <p class="subtitle has-text-success-dark">
                        Card ID
                    </p>
                </div>
                <footer class="card-footer">
                    <a id="openBrowser" class="card-footer-item" v-bind:title="'https://thesupercop.com/workspace/include/cards/aadhaar-print.php?o_id='+this.response.cardid" onclick="openPrint(e)">
                        Print Card
                    </a>
                    <router-link to="/aadharlist" class="card-footer-item">Back</router-link>
                </footer>
            </div>
        </div>
        <div id="previewcanvas"></div>
        <!-- <div class="box">
            <button id="openBrowser" class="button is-info is-outlined" onclick="openPrint('https://thesupercop.com/workspace/include/cards/aadhaar-print.php?o_id='+response.cardid)">Print</button>
        </div> -->
        <!-- </section>
        </vue-html2pdf> -->
        <!-- <div class="box">
            <button class="button is-danger is-outlined is-fullwidth" @click="generateReport"><span class="icon"><i class="las la-download"></i></span> <span>Download jpeg</span> </button>
            <input type="button" onclick="saveImg()" id="pseudobtn" value="pseudo button">
            <article v-show="message.length" class="message is-success">
                <div class="message-body">
                    <span v-for="(m, index) in message" :key="index">{{m}}</span>
                </div>
            </article>
        </div> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import VueHtml2pdf from 'vue-html2pdf'
// import QrcodeVue from 'qrcode.vue'
// import VueBarcode from 'vue-barcode'
import html2canvas from 'html2canvas';
export default {
    name: 'AadhaarPrint',
    data: function() {
        return {
            aadhaarData: '',
            message: [],
            html2PDFoptions: {
                margin: 0,
                filename: 'hehehe.pdf',
                image: {
                    type: 'jpeg',
                    quality: 1
                },
                html2canvas: {
                    allowTaint: true,
                    scale: 3,
                    // foreignObjectRendering: true,
                    useCORS: true
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            },
            response: '',
        }
    },
    components: { /*VueHtml2pdf,*/ /*QrcodeVue, 'barcode': VueBarcode*/ },
    mounted: function() {
        this.response = this.$route.params;
        let link = document.querySelector("#openBrowser");
        link.click();
    },
    computed: {
        ...mapGetters(['getUser', 'getAadhaarImg']),
        pagehtml() {
            return atob(this.response.page);
        },
        qrcode() {
            let value = '<?xml version="1.0" encoding="UTF-8"?> <PrintLetterBarcodeData uid="' + this.$route.params.aadhaar_number + '" name="' + this.$route.params.full_name_en + '" gender="' + this.gender + '" yob="' + this.yearofbirth + '" gname="' + this.$route.params.parent_name_en + '" co="' + this.$route.params.parent_type + ' ' + this.$route.params.parent_name_en + '" house="135 Pratap Nagar" street="Gali 19" lm="Shanti Nagar" loc="Sikandarpur" vtc="" po="Sadar Bazar" dist="' + this.$route.params.address_district_en + '" subdist="' + this.$route.params.address_block_en + '" state="' + this.$route.params.address_state_en + '" pc="' + this.$route.params.address_pincode + '" dob="' + this.qrdob + '"/>';
            return value;
        },
        gender() {
            if (this.$route.params.gender == '1') {
                return 'M'
            } else if (this.$route.params.gender == '2') {
                return 'F'
            } else {
                return 'T'
            }
        },
        yearofbirth() {
            let dob = new Date(this.$route.params.birth_date);
            return dob.getFullYear();
        },
        qrdob() {
            let dob = new Date(this.$route.params.birth_date);
            return ('0' + dob.getDate()).slice(-2) + '/' +
                ('0' + (dob.getMonth() + 1)).slice(-2) + '/' + dob.getFullYear();
        },
        aadhaarno() {
            return this.$route.params.aadhaar_number;
        }
    },
    methods: {
        /*hasDownloaded(blobPdf) {
            console.log('PDF has downloaded yehey');
            this.message.push('PDF has downloaded');
            console.log(blobPdf);
        },*/
        generateReport() {
            // this.$refs.html2Pdf.generatePdf()
            html2canvas(document.querySelector("#preview")).then(canvas => {
                document.querySelector("#previewcanvas").appendChild(canvas);
                var dataurl = canvas.toDataURL('image/png')
                window.sessionStorage.setItem('canvas', dataurl);
                // var pseudobtn = document.querySelector("#pseudobtn");
                /*setTimeout(function() {
                    pseudobtn.click();
                }, 300)*/
            });
        },
        JsBarcode() {
            ("#barcode_10540", this.aadhaarData.aadhaar_number, {
                format: "code128",
                displayValue: false,
                height: 10,
                width: 1,
                margin: 0
            });
        },
        /*hasGenerated() {
            this.message.push('PDF Generated')
        }*/
    }
}
</script>
<style scoped>
@media print {
    @page {
        width: 210mm;
        height: 290mm;
        margin: 5mm;
    }

    .hide {
        display: none;
    }

    .flipX {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }
}

@page {
    width: 210mm;
    height: 290mm;
    margin: 5mm;
}

.wrapper {
    height: 72mm;
}

.wrapper:nth-child(4n) {
    page-break-after: always;
}

#preview {
    width: 210mm;
    height: 97mm;
    overflow: visible;
}

p {
    margin: 0;
    padding: 0;
}

#front p {
    padding-bottom: 3px;
}

.artwork {
    position: relative;
    padding-bottom: 2mm;
    width: 92mm;
    height: 60mm;
    float: left;
}

.base {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

.card-body {
    width: 87mm;
    height: 55mm;
    margin: auto;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    z-index: 5;
}

.printable {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1mm;
    position: relative;
    color: #454545;
}

.date {
    width: 30mm;
    height: 3mm;
    position: absolute;
    top: 20mm;
    left: -48px;
    transform: rotate(-90deg);
    transform-origin: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 6pt;
}

.photo {
    width: 20mm;
    height: 24mm;
    float: left;
    position: relative;
    top: 14mm;
    left: 2mm;
}

.photo img {
    width: 20mm;
    height: 24mm;
    object-fit: contain;
}

.qrcode {
    width: 26mm;
    height: 26mm;
    float: right;
    position: absolute;
    top: 18mm;
    right: 0mm;
}

.qrcode img {
    width: 100%;
    height: 100%;
}

.info {
    width: 36mm;
    height: 30mm;
    float: left;
    position: relative;
    top: 14mm;
    left: 4mm;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 8pt;
    color: #454545;
}

#front .aadhaar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 12pt;
    font-weight: bold;
    text-align: center;
    padding-top: 5mm;
}

#back .aadhaar {
    clear: both;
    float: left;
    width: 38mm;
    position: relative;
    top: 15mm;
    left: 2mm;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12pt;
    font-weight: bold;
}

.address-h {
    width: 40mm;
    height: 24mm;
    position: relative;
    top: 12mm;
    left: 2mm;
    float: left;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 8pt;
}

.address-e {
    width: 40mm;
    height: 24mm;
    position: relative;
    top: 12mm;
    float: right;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 8pt;
}

.barcode {
    width: 40mm;
    height: 4mm;
    float: right;
    text-align: right;
    position: relative;
    top: 15mm;
    right: 2mm;
}

.barcode img {}

.barcode svg {
    float: right;
}

.button {
    margin-right: 15px;
    margin-bottom: 10px;
    border: 1px solid #333;
    background: transparent;
    color: #333;
    border-radius: 5px;
}

.button img,
.button span {
    vertical-align: middle;
}

.flipX {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}
</style>