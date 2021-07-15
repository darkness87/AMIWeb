<template>
	<div class="box">
		<div class="highch">
			<high-charts :constructor-type="'mapChart'" :options="chartOptions" :highcharts="hcInstance" />
		</div>
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
import Mboard from "@/service/mboard";
let sse;

export default {
	props: ["allData"],
	components: {
		HighCharts: Chart
	},
	watch: {
		allData: function(value) {
			this.data = value.map.map(v => [v.hckey, v.value]);
		}
	},
	mounted() {
		sse = Mboard.mapInfo();
		sse.onerror = function() {};
		sse.onopen = function() {};
		sse.onmessage = e => {
			const data = JSON.parse(e.data).response;
			this.data = data.map(v => [v.hckey, v.value]);
		};
	},
	computed: {
		chartOptions() {
			return {
				chart: {
					height: 440,
					borderWidth: 0,
					plotBackgroundColor: false,
					plotBorderWidth: false,
					map: koreaMap
				},

				title: {
					text: "확산사업 운영 정보",
					align: "left",
					x: 10,
					y: 15,
					style: {
						fontSize: "13"
					}
				},

				mapNavigation: { enabled: false },

				colorAxis: {
					min: 0,
					max: 100,
					labels: {
						format: "{value}%"
					},
					stops: [
						[0, "rgba(0,123,255,0)"],
						[1, "rgba(0,123,255,1)"]
					]
				},
				exporting: { enabled: false },
				credits: { enabled: false },
				series: [
					{
						data: this.data,
						name: "검침율",
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
				["kr-kg", 0], // 경기도
				["kr-cb", 0], // 전라북도
				["kr-kn", 0], // 경상남도
				["kr-2685", 0], // 전라남도
				["kr-pu", 0], // 부산광역시
				["kr-2688", 0], // 경상북도
				["kr-sj", 11], // 세종특별자치시
				["kr-tj", 0], // 대전광역시
				["kr-ul", 0], // 울산광역시
				["kr-in", 0], // 인천광역시
				["kr-kw", 10], // 강원도
				["kr-gn", 50], // 충청남도
				["kr-cj", 60], // 제주도
				["kr-gb", 70], // 충청북도
				["kr-so", 0], // 서울
				["kr-tg", 100], // 대구광역시
				["kr-kj", 50] // 광주광역시
			]
		};
	},
	beforeDestroy() {
		if (sse) {
			sse.close();
			console.log("RegionMap SSE Destroyed!!");
		}
	}
};
</script>
