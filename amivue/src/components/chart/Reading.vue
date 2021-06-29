<template>
	<div class="box">
		<reading-rate :data="this.data" />
		<div class="chartWarp">
			<div class="">
				<high-charts :options="chartOptions" />
			</div>
		</div>
	</div>
</template>

<script>
import ReadingRate from "@/components/chart/ReadingRate";

import { Chart } from "highcharts-vue";

export default {
	props: ["data"],
	components: {
		HighCharts: Chart,
		ReadingRate
	},
	computed: {
		chartOptions: {
			cache: false,
			get() {
				return {
					chart: {
						//검침률
						type: this.chartName,
						height: 210,
						borderWidth: 0,
						plotBackgroundColor: false
					},
					legend: {
						symbolHeight: 8,
						symbolWidth: 8,
						symbolRadius: 4,
						marginTop: 10,
						itemStyle: {
							fontSize: "0.9rem",
							fontWeight: 100,
							lineHeight: "14px"
						},
						align: "right",
						verticalAlign: "top",
						x: 0,
						y: 0,
						floating: true
					},
					plotOptions: {
						column: { borderRadius: 3 },
						series: {
							borderColor: "none",
							dataLabels: {
								enabled: true,
								style: { fontWeight: "none", fontSize: "8", fontColor: "#232f4b" }
							}
						}
					},
					credits: {
						enabled: false
					},
					xAxis: {
						categories: this.data ? this.data.hourRate.map(item => item.hour) : [],
						title: null,
						min: 0,
						max: 23,
						gridLineColor: "#232f4b",
						lineColor: "#232f4b",
						labels: {
							style: {
								color: "#61719e"
							}
						}
					},
					yAxis: {
						title: null,
						min: 0,
						max: 100,
						height: 125,
						top: 50,
						tickColor: "#232f4b",
						gridLineColor: "#232f4b",
						lineColor: "#232f4b",
						labels: {
							style: {
								color: "#61719e"
							}
						}
					},
					title: "",
					exporting: { enabled: false },
					menu: false,
					series: [
						{ name: "적시율", data: this.data ? this.data.hourRate.map(item => item.timelyRate) : [], color: "#1ee2df" },
						{ name: "검침률", data: this.data ? this.data.hourRate.map(item => item.readingRate) : [], color: "#fdff4b" }
					]
				};
			}
		}
	},
	data() {
		return {
			chartName: "column"
		};
	}
};
</script>

<style lang="scss">
@import "~@/assets/scss/chart/reading.scss";
</style>
