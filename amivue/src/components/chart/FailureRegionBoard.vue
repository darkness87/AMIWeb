<template>
	<div class="box">
		<h5>
			<span>{{ $t("FBoard.failureRegionBoard") }}</span>
			<!-- <b class="fontC">7 {{ $t("dashboard.ea") }}</b> -->
		</h5>
		<div class="tableWarp">
			<div class="tableContainer mboard-table">
				<b-table :items="itemList" :fields="fields" />
			</div>
		</div>
	</div>
</template>

<script>
import Fboard from "@/service/fboard";
let sse;

export default {
	props: ["allData"],
	watch: {
		allData: function(value) {
			this.itemList = value.failureRegion;
		}
	},
	mounted() {
		sse = Fboard.aggregations();
		sse.onerror = function() {};
		sse.onopen = function() {};
		sse.onmessage = e => {
			const data = JSON.parse(e.data).response;
			this.itemList = data;
		};
	},
	data() {
		return {
			chartName: "column",
			itemList: null,
			fields: [
				{
					key: "region",
					label: this.$t("component.content.table.regionName")
				},
				{
					key: "houseCount",
					label: this.$t("component.content.table.houseCount")
				},
				{
					key: "statusCodeCount",
					label: this.$t("component.content.table.statusCodeCount")
				},
				{
					key: "dcuNetworkFailureCount",
					label: this.$t("component.content.table.dcuNetworkFailureCount")
				},
				{
					key: "meterFailureCount",
					label: this.$t("component.content.table.meterFailureCount")
				}
			]
		};
	},
	beforeDestroy() {
		if (sse) {
			sse.close();
			console.log("TodayFault SSE Destroyed!!");
		}
	}
};
</script>
<style lang="scss">
@import "~@/assets/scss/table/tableBlack.scss";
</style>
