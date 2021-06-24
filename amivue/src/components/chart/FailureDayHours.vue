<template>
	<div class="box">
		<h5>
			<span>{{ $t("FBoard.failureDayHours") }}</span>
			<b class="fontC">{{ data ? data.failureTodayCount : 0 }} {{ $t("dashboard.ea") }}</b>
		</h5>
		<div class="chartWarp">
			<div class="">
				<high-charts :options="chartOptions" />
			</div>
		</div>
	</div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Fboard from "@/service/fboard";
let sse;

export default {
	props: ["allData"],
	components: {
		HighCharts: Chart
	},
	watch: {
		allData: function(value) {
			this.data = value.failureStatus;
		}
	},
	mounted() {
		sse = Fboard.dayHour();
		sse.onerror = function() {};
		sse.onopen = function() {};
		sse.onmessage = e => {
			const data = JSON.parse(e.data).response;
			this.data = data;
		};
	},
	computed: {
		chartOptions: {
			cache: false,
			get() {
				return {
					chart: {
						type: this.chartName,
						height: 150,
						borderWidth: 0,
						plotBackgroundColor: false,
						plotBorderWidth: false,
						style: {
							fontFamily: "san-serif"
						}
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						column: { borderRadius: 1 },
						series: {
							borderColor: "none"
						}
					},
					credits: {
						enabled: false
					},
					yAxis: {
						title: null,
						tickColor: "#232f4b",
						gridLineColor: "#232f4b",
						min: "0",
						lineColor: "#232f4b",
						labels: {
							style: {
								color: "#61719e"
							}
						}
					},
					xAxis: {
						title: null,
						tickColor: "#232f4b",
						gridLineColor: "#232f4b",
						lineColor: "#232f4b",
						labels: {
							style: {
								color: "#61719e"
							}
						}
					},
					exporting: { enabled: false },
					title: "",
					menu: false,
					series: [
						{
							data: this.data ? this.data.arrayData.map(item => item.count) : [],
							color: "#1ee2df"
						}
					]
				};
			}
		}
	},
	data() {
		return {
			chartName: "column",
			data: null
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
@import "~@/assets/scss/chart/equipmentState.scss";
</style>
