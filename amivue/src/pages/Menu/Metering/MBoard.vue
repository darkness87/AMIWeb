<template>
	<div class="content" :class="{ dashboard }">
		<content-header :pageName="pageName" :paths="paths" />
		<b-row class="row-wrap">
			<b-col xl="7" lg="7">
				<metering-collection :allData="allData" />
				<metering-region-board :allData="allData" />
			</b-col>
			<b-col xl="5" lg="5">
				<metering-rate :allData="allData" />
				<metering-region-map :allData="allData" />
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Mboard from "@/service/mboard";
import MeteringCollection from "@/components/chart/MeteringCollection";
import MeteringRegionBoard from "@/components/chart/MeteringRegionBoard";
import MeteringRate from "@/components/chart/MeteringRate";
import MeteringRegionMap from "@/components/chart/MeteringRegionMap";
import ContentMixin from "@/components/content/mixin";

export default {
	mixins: [ContentMixin],
	props: ["dashboard"],
	components: { MeteringCollection, MeteringRegionBoard, MeteringRate, MeteringRegionMap },
	mounted() {
		this.getFirstData();
		//this.getFirstLpData();
		//this.getFirstRateData();
		//this.getFirstMapData();
		//this.getFirstRegionData();
	},
	data() {
		return {
			pageName: this.$t("menu.metering.MBoard"),
			paths: [
				{ name: this.$t("menu.title"), bicon: "house", link: "/" },
				{ name: this.$t("menu.metering.title") },
				{ name: this.$t("menu.metering.MBoard") }
			],
			allData: null
		};
	},
	methods: {
		async getFirstData() {
			const response = await Mboard.firstData();
			this.allData = response.data;
		}
		// async getFirstLpData() {
		// 	const response = await Mboard.firstLp();
		// 	this.lpData = response.data;
		// },
		// async getFirstRateData() {
		// 	const response = await Mboard.firstRate();
		// 	this.rateData = response.data;
		// },
		// async getFirstMapData() {
		// 	const response = await Mboard.firstMap();
		// 	this.mapData = response.data;
		// },
		// async getFirstRegionData() {
		// 	const response = await Mboard.firstRegion();
		// 	this.regionData = response.data;
		// }
	}
};
</script>
