<template>
	<b-row>
		<b-col xl="6" lg="12">
			<div class="box svg">
				<h6>{{ $t("MBoard.readingTimelyRate") }}</h6>
				<div class="chart">
					<high-charts :options="chartOptions" />
				</div>
			</div>
		</b-col>
		<b-col xl="6" lg="12">
			<div class="box svg">
				<h6>{{ $t("MBoard.readingRate") }}</h6>
				<div class="chart">
					<high-charts :options="chartOptions" />
				</div>
			</div>
		</b-col>
	</b-row>
</template>

<script>
import Highcharts from "highcharts";
import HighChartsMoreInit from "highcharts/highcharts-more";
import SolidGaugeInit from "highcharts/modules/solid-gauge";
import { Chart } from "highcharts-vue";
HighChartsMoreInit(Highcharts);
SolidGaugeInit(Highcharts);

export default {
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
						height: "170",
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
									color: "#7383fd",
									radius: "90%",
									innerRadius: "80%",
									y: 70
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
