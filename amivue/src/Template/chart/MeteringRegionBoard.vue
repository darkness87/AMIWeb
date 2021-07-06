<template>
	<div class="box">
		<h5>
			<span>{{ $t("MBoard.regionBoard") }}</span>
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
import MBoard from "@/service/mboard";
let sse;

export default {
	props: ["allData"],
	watch: {
		allData: function(value) {
			this.itemList = value.region;
		}
	},
	mounted() {
		sse = MBoard.aggregations();
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
					key: "estateCount",
					label: this.$t("component.content.table.estateCount")
				},
				{
					key: "houseCount",
					label: this.$t("component.content.table.houseCount")
				},
				{
					key: "reading",
					label: this.$t("component.content.table.readingRate")
				},
				{
					key: "lvevl1Count",
					label: this.$t("component.content.table.level1")
				},
				{
					key: "lvevl2Count",
					label: this.$t("component.content.table.level2")
				},
				{
					key: "lvevl3Count",
					label: this.$t("component.content.table.level3")
				}
			]
		};
	},
	beforeDestroy() {
		if (sse) {
			sse.close();
			console.log("MBoard aggregations SSE Destroyed!!");
		}
	}
};
</script>

<style lang="scss">
@import "~@/assets/scss/table/tableBlack.scss";
</style>
