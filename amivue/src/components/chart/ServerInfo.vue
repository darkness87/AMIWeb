<template>
	<div class="box">
		<h5>
			<span>{{ $t("dashboard.serverInfo") }}</span>
			<b class="fontC">정상</b>
		</h5>
		<div class="dutyCycle cpu">
			<high-charts :options="chartOptions" />
		</div>
		<ul class="serveInfo">
			<li>
				<h6>OS CPU</h6>
				<span>{{ osCpu }}</span>
			</li>
			<li>
				<h6>OS MEMORY</h6>
				<span>{{ osMemory }}</span>
			</li>
			<li>
				<h6>JVMUSED</h6>
				<span>{{ jvmUsed }}</span>
			</li>
			<li>
				<h6>JVMTOTAL</h6>
				<span>{{ jvmTotal }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import Dashboard from "@/service/dashboard";
import { Chart } from "highcharts-vue";
let sse;

export default {
	components: {
		HighCharts: Chart
	},
	mounted() {
		sse = Dashboard.serverInfo(1);
		sse.onerror = function() {};
		sse.onopen = function() {};
		sse.onmessage = e => {
			const data = JSON.parse(e.data).response;
			this.jvmFree = data.jvmFree;
			this.jvmMax = data.jvmMax;
			this.jvmTotal = data.jvmTotal;
			this.jvmUsed = data.jvmUsed;
			this.osCpu = data.osCpu;
			this.osMemory = data.osMemory;

			if (this.systemList.length >= 20) {
				this.systemList.shift();
			}
			this.systemList.push({
				// x: this.$moment(data.date).format("YYYY-MM-DD HH:mm:ss"),
				x: this.$moment(data.date).valueOf(),
				y: parseFloat(data.osCpu)
			});
		};
	},
	computed: {
		cpuClass() {
			if (this.osCpu < 50) {
				return null;
			} else if (this.osCpu < 80) {
				return "progress-bar-2";
			} else {
				return "progress-bar-3";
			}
		},
		memoryClass() {
			if (this.osMemory < 50) {
				return null;
			} else if (this.osMemory < 80) {
				return "progress-bar-2";
			} else {
				return "progress-bar-3";
			}
		},
		chartOptions: {
			cache: false,
			get() {
				return {
					chart: {
						type: "spline",
						height: 190,
						marginRight: 10,
						borderWidth: 0,
						plotBackgroundColor: false,
						plotBorderWidth: false,
						style: {
							fontFamily: "san-serif"
						}
					},

					time: {
						useUTC: false
					},

					title: null,

					xAxis: {
						type: "datetime",
						gridLineColor: "#232f4b",
						tickPixelInterval: 150,
						tickColor: "#232f4b",
						lineColor: "#232f4b",
						labels: {
							style: {
								color: "#61719e"
							}
						}
					},

					yAxis: {
						title: {
							text: null,
							gridLineColor: "#232f4b",
							lineColor: "#232f4b" //라인컬러
						},
						plotLines: [
							{
								value: 0,
								width: 1,
								color: "#808080"
							}
						],
						tickColor: "#232f4b",
						gridLineColor: "#232f4b",
						lineColor: "#232f4b",
						labels: {
							style: {
								color: "#61719e"
							}
						}
					},

					tooltip: {
						headerFormat: "<b>{series.name}</b><br/>",
						pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}%"
					},

					legend: {
						enabled: false
					},

					exporting: {
						enabled: false
					},
					credits: { enabled: false },
					series: [
						{
							name: this.$t("server.used"),
							data: this.systemList,
							color: "#7383fd"
						}
					]
				};
			}
		}
	},
	data() {
		return {
			jvmFree: 0,
			jvmMax: 0,
			jvmTotal: 0,
			jvmUsed: 0,
			osCpu: 0,
			osMemory: 0,
			systemList: []
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
@import "~@/assets/scss/chart/serverInfo.scss";
</style>
