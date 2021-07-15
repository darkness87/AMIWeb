<template>
	<div class="pie-chart-wrap">
		<high-charts :options="chartOptions" />
	</div>
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
						//
						type: "pie",
						options3d: {
							enabled: true,
							alpha: 45
						},
						height: "220"
					},
					plotOptions: {
						pie: {
							innerSize: 100,
							depth: 45,
							borderColor: "none"
						}
					},
					title: "",
					exporting: { enabled: false },
					credits: { enabled: false },
					menu: false,
					series: [
						{
							name: "장애율",
							data: [
								["METER", 30],
								["MODEM", 5],
								["DCU", 10],
								["LTE", 55]
							]
						}
					]
				};
			}
		}
	}
};
</script>
<style lang="scss"></style>
