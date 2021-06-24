<template>
	<div class="box">
		<h5>
			<span>정기 검침 현황</span>
			<b>{{ data ? data.readingDay : "" }} 정기 검침일</b>
		</h5>
		<div class="regularBoard">
			<ul>
				<li>
					<div class="regularSvgWrap">
						<img src="~@/assets/svg/icon_building.svg" alt="" title="" />
						<div>
							<p>{{ data ? data.houseCount : 0 }}</p>
							<p>세대</p>
						</div>
					</div>
					<p>검침 수용가 수</p>
				</li>
				<li>
					<div class="regularSvgWrap">
						<img src="~@/assets/svg/icon_building.svg" alt="" title="" />
						<div>
							<p>
								<b>{{ data ? data.houseErrorCount : 0 }}</b>
							</p>
							<p><span>세대</span></p>
						</div>
					</div>
					<p>미 검침 수용가 수</p>
				</li>
				<li>
					<div><high-charts :options="chartOptions" /></div>
					<p>정기 검침 성공률</p>
				</li>
			</ul>
		</div>
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
						//검침률
						type: this.chartName,
						height: "100",
						borderWidth: 0,
						plotBackgroundColor: false
					},
					pane: {
						startAngle: 0,
						endAngle: 360,
						background: [
							{
								// Track for Move
								outerRadius: "80%",
								innerRadius: "70%",
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
							name: "정기검침율",
							data: [
								{
									color: "#fdff4b",
									radius: "80%",
									innerRadius: "70%",
									y: this.data ? this.data.readingRate : 0
								}
							],
							dataLabels: {
								enabled: true,
								borderWidth: 0,
								y: -14,
								x: 2,
								// fontSize: "11px",
								style: {
									fontSize: "12px",
									fontFamily: "sans-serif"
								},
								format: "{point.y} %"
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
<style lang="scss">
@import "~@/assets/scss/components/regularBoard.scss";
</style>
