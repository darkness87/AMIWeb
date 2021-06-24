<template>
	<ul class="inspection">
		<li class="title">{{ $t("dashboard.timelyRate") }}</li>
		<li class="chart"><high-charts :options="chartOptions" /></li>
		<li class="title">{{ $t("dashboard.readingRate") }}</li>
		<li class="chart"><high-charts :options="chartOptions2" /></li>
	</ul>
</template>
<script>
import Highcharts from "highcharts";
import HighChartsMoreInit from "highcharts/highcharts-more";
import SolidGaugeInit from "highcharts/modules/solid-gauge";
import { Chart } from "highcharts-vue";
HighChartsMoreInit(Highcharts);
SolidGaugeInit(Highcharts);

export default {
	props: ["data"],
	components: {
		HighCharts: Chart
	},
	computed: {
		chartOptions: {
			cache: false,
			get() {
				return {
					chart: {
						//검침률
						type: this.chartName,
						height: "110",
						borderWidth: 0,
						plotBackgroundColor: false
					},
					pane: {
						startAngle: 0,
						endAngle: 360,
						background: [
							{
								// Track for Move
								outerRadius: "90%",
								innerRadius: "80%",
								backgroundColor: "#10182a",
								borderWidth: 1,
								borderColor: "#10182a"
							}
						]
					},
					yAxis: {
						min: 0,
						max: 100,
						lineWidth: 0,
						tickPositions: []
					},
					plotOptions: {
						solidgauge: {
							dataLabels: {
								enabled: false
							},
							linecap: "round",
							stickyTracking: false,
							rounded: true
						}
					},
					title: "",
					exporting: { enabled: false },
					credits: { enabled: false },
					menu: false,
					series: [
						{
							name: "적시율",
							data: [
								{
									color: "#04d47d",
									radius: "90%",
									innerRadius: "80%",
									y: this.data ? this.data.realTimelyRate : 0
								}
							],
							dataLabels: {
								enabled: true,
								borderWidth: 0,
								y: -16,
								x: 2,
								// fontSize: "11px",
								style: {
									fontSize: "14px",
									fontFamily: "sans-serif"
								},
								format: "{point.y:.1f} %"
							}
						}
					]
				};
			}
		},
		chartOptions2: {
			cache: false,
			get() {
				return {
					chart: {
						//검침률
						type: this.chartName,
						height: "110",
						borderWidth: 0,
						plotBackgroundColor: false
					},
					pane: {
						startAngle: 0,
						endAngle: 360,
						background: [
							{
								// Track for Move
								outerRadius: "90%",
								innerRadius: "80%",
								backgroundColor: "#10182a",
								borderWidth: 1,
								borderColor: "#10182a"
							}
						]
					},
					yAxis: {
						min: 0,
						max: 100,
						lineWidth: 0,
						tickPositions: []
					},
					plotOptions: {
						solidgauge: {
							dataLabels: {
								enabled: false
							},
							linecap: "round",
							stickyTracking: false,
							rounded: true
						}
					},
					title: "",
					exporting: { enabled: false },
					credits: { enabled: false },
					menu: false,
					series: [
						{
							name: "검침율",
							data: [
								{
									color: "#04d47d",
									radius: "90%",
									innerRadius: "80%",
									y: this.data ? this.data.realMeterReadingRate : 0
								}
							],
							dataLabels: {
								enabled: true,
								borderWidth: 0,
								y: -16,
								x: 2,
								// fontSize: "11px",
								style: {
									fontSize: "14px",
									fontFamily: "sans-serif"
								},
								format: "{point.y:.1f} %"
							}
						}
					]
				};
			}
		}
	},
	data() {
		return {
			chartName: "solidgauge"
		};
	}
};
</script>
