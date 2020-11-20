<template>
    <section>
        <div class="field">
            <label>State (राज्य)</label>
            <div class="select is-fullwidth">
                <select v-model="stateid" v-on:change="fetchDistrict($event)" class="input is-info " required="">
                    <option value="">Select State</option>
                    <option value="485" data-state="Andaman and Nicobar">
                        Andaman and Nicobar (
                        अण्डमान और निकोबार) </option>
                    <option value="486" data-state="Andhra Pradesh">
                        Andhra Pradesh (
                        आंध्र प्रदेश) </option>
                    <option value="487" data-state="Arunachal Pradesh">
                        Arunachal Pradesh (
                        अरुणाचल प्रदेश) </option>
                    <option value="488" data-state="ASSAM">
                        ASSAM (
                        অসম ) </option>
                    <option value="489" data-state="Bihar">
                        Bihar (
                        बिहार) </option>
                    <option value="490" data-state="Chandigarh">
                        Chandigarh (
                        चंडीगढ़) </option>
                    <option value="491" data-state="Chhattisgarh">
                        Chhattisgarh (
                        छत्तीसगढ़) </option>
                    <option value="492" data-state="Dadra and Nagar Haveli">
                        Dadra and Nagar Haveli (
                        दादरा और नगर हवेली) </option>
                    <option value="493" data-state="Daman and Diu">
                        Daman and Diu (
                        दमन और दीव) </option>
                    <option value="494" data-state="Delhi">
                        Delhi (
                        दिल्ली) </option>
                    <option value="495" data-state="Goa">
                        Goa (
                        गोवा) </option>
                    <option value="496" data-state="Gujarat">
                        Gujarat (
                        ગુજરાત) </option>
                    <option value="497" data-state="Haryana">
                        Haryana (
                        हरियाणा) </option>
                    <option value="498" data-state="Himachal Pradesh">
                        Himachal Pradesh (
                        हिमाचल प्रदेश) </option>
                    <option value="499" data-state="Jammu and Kashmir">
                        Jammu and Kashmir (
                        जम्मू और कश्मीर) </option>
                    <option value="500" data-state="Jharkhand">
                        Jharkhand (
                        झारखंड) </option>
                    <option value="501" data-state="Karnataka">
                        Karnataka (
                        कर्नाटक) </option>
                    <option value="502" data-state="Kerala">
                        Kerala (
                        केरल) </option>
                    <option value="503" data-state="Lakshadweep">
                        Lakshadweep (
                        लक्षद्वीप) </option>
                    <option value="504" data-state="Madhya Pradesh">
                        Madhya Pradesh (
                        मध्य प्रदेश) </option>
                    <option value="505" data-state="Maharashtra">
                        Maharashtra (
                        महाराष्ट्र) </option>
                    <option value="506" data-state="Manipur">
                        Manipur (
                        मणिपुर) </option>
                    <option value="507" data-state="Meghalaya">
                        Meghalaya (
                        मेघालय) </option>
                    <option value="508" data-state="Mizoram">
                        Mizoram (
                        मिजोरम) </option>
                    <option value="509" data-state="Nagaland">
                        Nagaland (
                        नगालैंड) </option>
                    <option value="510" data-state="Orissa">
                        Orissa (
                        ओडिशा) </option>
                    <option value="511" data-state="Pondicherry">
                        Pondicherry (
                        पांडिचेरी) </option>
                    <option value="512" data-state="Punjab">
                        Punjab (
                        ਪੰਜਾਬ) </option>
                    <option value="513" data-state="Rajasthan">
                        Rajasthan (
                        राजस्थान) </option>
                    <option value="514" data-state="Sikkim">
                        Sikkim (
                        सिक्किम) </option>
                    <option value="515" data-state="">
                        Tamil Nadu (
                        तमिलनाडु) </option>
                    <option value="522" data-state="Telangana">
                        Telangana (
                        तेलंगाना) </option>
                    <option value="516" data-state="Tripura">
                        Tripura (
                        त्रिपुरा) </option>
                    <option value="517" data-state="Uttar Pradesh">
                        Uttar Pradesh (
                        उत्तर प्रदेश) </option>
                    <option value="518" data-state="Uttarakhand">
                        Uttarakhand (
                        उत्तराखंड) </option>
                    <option value="519" data-state="West Bengal">
                        West Bengal (
                        पश्चिम बंगाल) </option>
                </select>
            </div>
        </div>
        <div class="field">
            <label>District</label>
            <div class="control">
                <div class="select is-fullwidth">
                    <select class="input is-info" v-model="districtid" v-on:change="fetchBlock($event)">
                        <option value="" selected="">Select District</option>
                        <option v-for="(district, index) in districtList" :key="index" :value="district.district_ID" :data-dist="district.district_name" :data-disthindi="district.district_name_hi">{{district.district_name}} ({{district.district_name_hi}})</option>
                    </select>
                </div>
                <p class="help is-danger" v-show="districtList.length==0">No district found</p>
                <!-- <input type="text" class="input is-info" v-model="district"> -->
            </div>
        </div>
        <div class="field mb-3">
            <label>Block</label>
            <div class="control">
                <div class="select is-fullwidth">
                    <select v-model="blockid" class="input is-info" v-on:change="changeBlock($event)">
                        <option value="" selected="">Select Block</option>
                        <option v-for="(block, index) in blockList" :key="index" :value="block.block_id" :data-block="block.block_name" :data-blockhindi="block.block_name_hi">{{block.block_name}} ({{block.block_name_hi}})</option>
                    </select>
                </div>
                <p class="help is-danger" v-show="blockList.length==0">No blocks found</p>
                <!-- <input type="text" class="input is-info" v-model="block"> -->
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Address',
    data: function() {
        return {
            name: 'Address',
            state: '',
            stateid: '',
            districtList: [],
            districtid: '',
            district: '',
            district_hi: '',
            blockList: [],
            blockid: '',
            block: '',
            block_hi: '',
            errors: [],
        }
    },
    methods: {
        fetchDistrict: function(event) {
            this.state = event.target.selectedOptions[0].dataset.state;
            // console.log(event);
            this.districtList = [];
            this.blockList = [];
            if (this.stateid) {
                let stateData = JSON.stringify({ state: this.stateid });
                axios.post('https://thesupercop.com/webapis/stateAjax.php', stateData)
                    .then((response) => {
                        if (response.status == 200) {
                            // console.log(response);
                            if (response.data.status == 1) {
                                // console.log(response.data.district)
                                this.districtList = response.data.district;
                                // this.stateError.district = '';
                            } else {
                                // this.stateError.district = response.data.message
                            }
                        } else {
                            // this.stateError.district = response.statusText;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                // this.stateError.district = ""
            }
        },
        fetchBlock: function(event) {
            this.district = event.target.selectedOptions[0].dataset.dist;
            this.district_hi = event.target.selectedOptions[0].dataset.disthindi;
            this.blockList = [];
            if (this.districtid) {
                let districtData = JSON.stringify({ district: this.districtid });
                axios.post('https://thesupercop.com/webapis/stateAjax.php', districtData)
                    .then((response) => {
                        if (response.status == 200) {
                            // console.log(response);
                            if (response.data.status == 1) {
                                console.log(response.data.block)
                                this.blockList = response.data.block;
                            } else {
                                // console.warn(response.data.message)
                                // this.stateError.block = response.data.message
                            }
                        } else {
                            // this.stateError.block = response.statusText;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                // this.stateError.block = ""
            }
        },
    }
}
</script>