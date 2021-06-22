<template>
	<div class="highch">
		<high-charts :constructor-type="'mapChart'" :options="chartOptions" :highcharts="hcInstance" />
	</div>
</template>

<script>
import Highcharts from "highcharts";

import mapInit from "highcharts/modules/map";
import exportingInit from "highcharts/modules/exporting";
import darkUnicaInit from "highcharts/themes/dark-unica";
import koreaMap from "@/assets/js/highchart/map-kr-all.json";
mapInit(Highcharts);
exportingInit(Highcharts);
darkUnicaInit(Highcharts);

import { Chart } from "highcharts-vue";

export default {
	components: {
		HighCharts: Chart
	},
	computed: {
		chartOptions() {
			return {
				chart: {
					height: 850,
					borderWidth: 0,
					plotBackgroundColor: false,
					plotBorderWidth: false,
					map: koreaMap,
					events: {
						load: function() {
							this.mapZoom(0.8);
						}
					}
				},

				title: {
					text: "확산사업 운영 정보"
				},

				mapNavigation: { enabled: false },
				colorAxis: {
					min: 0,
					max: 100,
					labels: {
						format: "{value}%"
					},
					stops: [
						[0, "#ff2c42"],
						[0.81, "#561d33"],
						[0.82, "#4e1c32"],
						[0.83, "#471c32"],
						[0.84, "#3f1b31"],
						[0.85, "#21265a"],
						[0.86, "#112559"],
						[0.87, "#12275f"],
						[0.88, "#132966"],
						[0.89, "#142b6c"],
						[1, "#2c59ff"]
					]
				},

				exporting: { enabled: false },
				credits: { enabled: false },
				series: [
					{
						data: this.data,
						name: "DCU Fault",
						//s borderColor: "black",
						borderWidth: 0.2,
						states: {
							hover: {
								color: "#1ee2df", // 마우스 오버 색상
								borderColor: "none" // 테두리 색상
							}
						},
						dataLabels: {
							enabled: true,
							format: "{point.name}"
						}
					}
				]
			};
		}
	},
	data() {
		return {
			hcInstance: Highcharts,
			data: [
				["kr-4194", 0], // 전국
				["kr-kg", 81], // 경기도
				["kr-cb", 82], // 전라북도
				["kr-kn", 83], // 경상남도
				["kr-2685", 84], // 전라남도
				["kr-pu", 85], // 부산광역시
				["kr-2688", 86], // 경상북도
				["kr-sj", 87], // 세종특별자치시
				["kr-tj", 88], // 대전광역시
				["kr-ul", 89], // 울산광역시
				["kr-in", 90], // 인천광역시
				["kr-kw", 91], // 강원도
				["kr-gn", 92], // 충청남도
				["kr-cj", 90], // 제주도
				["kr-gb", 94], // 충청북도
				["kr-so", 95], // 서울
				["kr-tg", 96], // 대구광역시
				["kr-kj", 100] // 광주광역시
			]
		};
	}
};
</script>
