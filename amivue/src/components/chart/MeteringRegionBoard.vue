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
					key: "allCount",
					label: this.$t("component.content.table.allCollectionCount")
				},
				{
					key: "readingCount",
					label: this.$t("component.content.table.readingCount")
				},
				{
					key: "errorCount",
					label: this.$t("component.content.table.errorReadingCount")
				},
				{
					key: "networkCount",
					label: this.$t("component.content.table.networkCount")
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
