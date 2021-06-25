<template>
	<div class="content" :class="{ dashboard }">
		<b-row class="row-wrap">
			<b-col xl="4" lg="6" md="12" sm="12">
				<div class="timeWrap">
					<div class="date">{{ Date.now() | moment("YYYY.M.D") }}</div>
					<dashboard-timer />
				</div>
				<total-voltage :data="totalVoltage" />
				<reading :data="reading" />
				<today-weather :data="todayWeather" />
			</b-col>
			<b-col xl="4" lg="6" md="12" sm="12">
				<region-map :data="regionMap" />
			</b-col>
			<b-col xl="4" lg="12" md="12" sm="12">
				<div class="presentMenu">
					<ul>
						<li class="on pulsate-fwd">
							<button type="button" class="btn">{{ $t("dashboard.type.meter") }}</button>
						</li>
						<li>
							<button type="button" class="btn">{{ $t("dashboard.type.gas") }}</button>
						</li>
						<li>
							<button type="button" class="btn">{{ $t("dashboard.type.water") }}</button>
						</li>
						<li>
							<button type="button" class="btn">{{ $t("dashboard.type.hot") }}</button>
						</li>
						<li>
							<button type="button" class="btn">{{ $t("dashboard.type.heat") }}</button>
						</li>
					</ul>
				</div>
				<server-info />
				<ami-status-board :data="deviceMapErrorCount" />
				<regular-board :data="readingDayInfo" />
			</b-col>
		</b-row>
	</div>
</template>

<script>
import Dashboard from "@/service/dashboard";
import DashboardTimer from "@/components/DashboardTimer";
import TotalVoltage from "@/components/chart/TotalVoltage";
import Reading from "@/components/chart/Reading";
import TodayWeather from "@/components/chart/TodayWeather";
import ServerInfo from "@/components/chart/ServerInfo";
import RegionMap from "@/components/chart/RegionMap";
import AmiStatusBoard from "@/components/chart/AmiStatusBoard";
import RegularBoard from "@/components/chart/RegularBoard";
import Highcharts from "highcharts";
import theme from "highcharts/themes/dark-unica";
theme(Highcharts);
let sse;

export default {
	name: "Home",
	props: ["dashboard"],
	components: {
		DashboardTimer,
		TotalVoltage,
		Reading,
		TodayWeather,
		ServerInfo,
		RegionMap,
		AmiStatusBoard,
		RegularBoard
	},
	async mounted() {
		sse = Dashboard.allData(60);
		sse.onerror = function() {};
		sse.onopen = function() {};
		sse.onmessage = e => {
			const data = JSON.parse(e.data);
			this.totalVoltage = data.useData;
			this.todayWeather = { todayWeather: data.weather, weatherData: data.weatherData };
			this.reading = data.rate;
			this.deviceMapErrorCount = data.deviceMapErrorCount;
			this.readingDayInfo = data.readingDayInfo;
			this.regionMap = data.map;
		};
		const response = await Dashboard.firstData();
		const data = response.data;
		this.totalVoltage = data.useData;
		this.todayWeather = { todayWeather: data.weather, weatherData: data.weatherData };
		this.reading = data.rate;
		this.deviceMapErrorCount = data.deviceMapErrorCount;
		this.readingDayInfo = data.readingDayInfo;
		this.regionMap = data.map;
		console.log(this.deviceMapErrorCount);
	},
	data: function() {
		return {
			now: Date.now(),
			totalVoltage: null,
			todayWeather: null,
			reading: null,
			deviceMapErrorCount: null,
			readingDayInfo: null,
			regionMap: [
				{ hckey: "kr-so", value: null },
				{ hckey: "kr-pu", value: null },
				{ hckey: "kr-tg", value: null },
				{ hckey: "kr-in", value: null },
				{ hckey: "kr-kj", value: null },
				{ hckey: "kr-tj", value: null },
				{ hckey: "kr-ul", value: null },
				{ hckey: "kr-kg", value: null },
				{ hckey: "kr-kw", value: null },
				{ hckey: "kr-gb", value: null },
				{ hckey: "kr-gn", value: null },
				{ hckey: "kr-cb", value: null },
				{ hckey: "kr-2685", value: null },
				{ hckey: "kr-2688", value: null },
				{ hckey: "kr-kn", value: null },
				{ hckey: "kr-cj", value: null },
				{ hckey: "kr-sj", value: null }
			]
		};
	},
	methods: {},
	beforeDestroy() {
		if (sse) {
			sse.close();
			console.log("AllData SSE Destroyed!!");
		}
	}
};
</script>
<style lang="scss">
@import "~@/assets/scss/pages/dashboard.scss";
</style>
