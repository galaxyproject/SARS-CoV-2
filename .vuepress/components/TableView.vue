<template>
    <table class="tabularfile">
        <tr v-for="row in tabularData">
            <td v-for="cell in row">{{ cell }}</td>
        </tr>
    </table>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            rawData: null
        };
    },
    props: {
        sourceFile: {
            type: String,
            default: ""
        }
    },
    computed: {
        tabularData() {
            const splitData = [];
            if (this.rawData === null) {
                return splitData;
            } else {
                this.rawData.split(/\r?\n|\r/).map(row => {
                    if (row.trim() != "") {
                        splitData.push(row.split(","));
                    }
                });
            }
            return splitData;
        }
    },
    mounted() {
        axios
            .get(this.sourceFile)
            .then(response => {
                this.rawData = response.data;
            })
            .catch(error => {
                console.debug(error);
            });
    },
    updated() {
        console.debug(this.tabularData);
    }
};
</script>
