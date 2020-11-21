<template>
    <div>
        <button class="button" @click="generateReport">Download PDF</button>
        <article v-show="message" class="message is-success">
            <div class="message-body" v-text="message">
            </div>
        </article>
        <vue-html2pdf :show-layout="false" :float-layout="false" :enable-download="true" :preview-modal="false" :paginate-elements-by-height="1800" filename="hee-hee" :pdf-quality="2" :manual-pagination="false" pdf-format="a4" pdf-orientation="portrait" pdf-content-width="210mm" :html-to-pdf-options="html2PDFoptions" @hasGenerated="hasGenerated($event)" ref="html2Pdf">
            <section slot="pdf-content">
                <div id="preview">
                    <div>
                        <!-- $codeContents = '
            <?xml version="1.0" encoding="UTF-8"?>
            <PrintLetterBarcodeData uid="'.$uid.'" name="'.$name.'" gender="'.$gender.'" yob="'.$yob.'" co="'.$co.'" house="." street="'.$address.'" loc="'.$subdist.'" vtc="'.$subdist.'" po="'.$subdist.'" dist="'.$dist.'" subdist="'.$subdist.'" state="'.$state.'" pc="'.$pc.'" dob="'.$dob.'" />'; -->
                        <div class="wrapper">
                            <div id="front" class="artwork">
                                <div class="card-body"><img src="https://thesupercop.com/workspace/dist/img/aadhaar-front.jpg" class="base" alt="aadhaar">
                                    <div class="printable">
                                        <div class="photo"><img src="https://thesupercop.com/uploads/aadhaar/5fb36c14edacb_neha.jpg" alt="photo"></div>
                                        <div class="info">
                                            <p>नेहा </p>
                                            <p>Neha</p>
                                            <p>जन्म तिथि/DOB: 01/01/2004</p>
                                            <p>Female /महिला</p>
                                            <div class="aadhaar">5702 0054 8179 </div>
                                        </div>
                                        <div class="qrcode" id="qrcode"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=<?xml version='1.0' encoding='UTF-8'?> <PrintLetterBarcodeData uid='570200548179' name='Neha' gender='Female' yob='2004' co='D/O' house='.' street='Dulla Kheri,Dullakheri' loc='' vtc='' po='' dist='Shamli' subdist='' state='Uttar Pradesh' pc='247776' dob='01-01-2004'/>" alt="qrcode"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="back" class="artwork">
                                <div class="card-body">
                                    <div class="printable"> <img src="https://thesupercop.com/workspace/dist/img/aadhaar-back.jpg" class="base" alt="aadhaar">
                                        <!-- <div class="date">Date: </div> -->
                                        <div class="address-h">
                                            <p><strong>पता:</strong></p>
                                            <p>D/O अक्षय कुमार , दुल्ला खेरी ,दुल्लाखेरी , , शामली</p>
                                            <p>उत्तर प्रदेश-247776</p>
                                        </div>
                                        <div class="address-e">
                                            <p><strong>Address:</strong></p>
                                            <p>D/O Akshay Kumar, Dulla Kheri,Dullakheri, , Shamli </p>
                                            <p>Uttar Pradesh-247776</p>
                                        </div>
                                        <div class="aadhaar">5702 0054 8179 </div>
                                        <div class="barcode"><svg id="barcode_10540" width="101px" height="10px" x="0px" y="0px" viewBox="0 0 101 10" xmlns="http://www.w3.org/2000/svg" version="1.1" style="transform: translate(0,0)">
                                                <rect x="0" y="0" width="101" height="10" style="fill:#ffffff;"></rect>
                                                <g transform="translate(0, 0)" style="fill:#000000;">
                                                    <rect x="0" y="0" width="2" height="10"></rect>
                                                    <rect x="3" y="0" width="1" height="10"></rect>
                                                    <rect x="6" y="0" width="3" height="10"></rect>
                                                    <rect x="11" y="0" width="3" height="10"></rect>
                                                    <rect x="15" y="0" width="2" height="10"></rect>
                                                    <rect x="18" y="0" width="1" height="10"></rect>
                                                    <rect x="22" y="0" width="2" height="10"></rect>
                                                    <rect x="26" y="0" width="2" height="10"></rect>
                                                    <rect x="30" y="0" width="2" height="10"></rect>
                                                    <rect x="33" y="0" width="2" height="10"></rect>
                                                    <rect x="36" y="0" width="2" height="10"></rect>
                                                    <rect x="40" y="0" width="2" height="10"></rect>
                                                    <rect x="44" y="0" width="3" height="10"></rect>
                                                    <rect x="48" y="0" width="1" height="10"></rect>
                                                    <rect x="50" y="0" width="2" height="10"></rect>
                                                    <rect x="55" y="0" width="1" height="10"></rect>
                                                    <rect x="58" y="0" width="1" height="10"></rect>
                                                    <rect x="60" y="0" width="4" height="10"></rect>
                                                    <rect x="66" y="0" width="1" height="10"></rect>
                                                    <rect x="70" y="0" width="4" height="10"></rect>
                                                    <rect x="75" y="0" width="1" height="10"></rect>
                                                    <rect x="77" y="0" width="3" height="10"></rect>
                                                    <rect x="82" y="0" width="1" height="10"></rect>
                                                    <rect x="84" y="0" width="2" height="10"></rect>
                                                    <rect x="88" y="0" width="2" height="10"></rect>
                                                    <rect x="93" y="0" width="3" height="10"></rect>
                                                    <rect x="97" y="0" width="1" height="10"></rect>
                                                    <rect x="99" y="0" width="2" height="10"></rect>
                                                </g>
                                            </svg>
                                            <!--<img src="" id="barcode_10540" alt="barcode">-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </vue-html2pdf>
    </div>
</template>
<script>
import VueHtml2pdf from 'vue-html2pdf'
export default {
    name: 'AadhaarPrint',
    data: function() {
        return {
            aadhaar: '',
            message: '',
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
                }
            }
        }
    },
    components: { VueHtml2pdf },
    methods: {
        generateReport() {
            this.$refs.html2Pdf.generatePdf()
        },
        JsBarcode() {
            ("#barcode_10540", this.aadhaar, {
                format: "code128",
                displayValue: false,
                height: 10,
                width: 1,
                margin: 0
            });
        },
        hasGenerated() {
            this.message = 'PDF Generated'
        }
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
    height: 297mm;
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
    left: 4mm;
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