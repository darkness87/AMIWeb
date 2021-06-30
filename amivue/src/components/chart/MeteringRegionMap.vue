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
					height: 630,
					borderWidth: 0,
					plotBackgroundColor: false,
					plotBorderWidth: false,
					map: koreaMap
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
				["kr-4194", NaN], // 전국
				["kr-kg", NaN], // 경기도
				["kr-cb", NaN], // 전라북도
				["kr-kn", NaN], // 경상남도
				["kr-2685", NaN], // 전라남도
				["kr-pu", NaN], // 부산광역시
				["kr-2688", NaN], // 경상북도
				["kr-sj", NaN], // 세종특별자치시
				["kr-tj", NaN], // 대전광역시
				["kr-ul", NaN], // 울산광역시
				["kr-in", NaN], // 인천광역시
				["kr-kw", NaN], // 강원도
				["kr-gn", NaN], // 충청남도
				["kr-cj", NaN], // 제주도
				["kr-gb", NaN], // 충청북도
				["kr-so", NaN], // 서울
				["kr-tg", NaN], // 대구광역시
				["kr-kj", NaN] // 광주광역시
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
