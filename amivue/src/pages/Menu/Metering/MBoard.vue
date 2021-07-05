<template>
	<div class="content" :class="{ dashboard }">
		<content-header :pageName="pageName" :paths="paths" />
		<b-row class="row-wrap">
			<b-col xl="7" lg="7">
				<div class="">
					<metering-collection :allData="allData" />
				</div>
				<b-row class="row-wrap box-width">
					<b-col xl="6" lg="6">
						<ul>
							<li><metering-rate :allData="allData" /></li>
							<li><regular-board :data="readingDayInfo" /></li>
						</ul>
					</b-col>
					<b-col xl="6" lg="6"><metering-region-map :allData="allData"/></b-col>
				</b-row>
			</b-col>
			<b-col xl="5" lg="5">
				<metering-region-board :allData="allData" />
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
import RegularBoard from "@/components/chart/RegularBoard";

export default {
	mixins: [ContentMixin],
	props: ["dashboard"],
	components: { MeteringCollection, MeteringRegionBoard, MeteringRate, MeteringRegionMap, RegularBoard },
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
<style lang="scss">
.box-width {
	margin-left: -20px;
	margin-right: -20px;
}
.row-wrap {
	margin-bottom: 0;
}
.tableContainer table tr td,
.tableContainer table tr th {
	padding: 0.7rem 0.5rem !important;
}
.regularBoard {
	margin: 30px 10px;
}
.regularBoard ul li {
	margin-bottom: 28px;
}
</style>
