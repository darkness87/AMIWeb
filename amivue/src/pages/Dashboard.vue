<template>
	<div class="content" :class="{ dashboard }">
		<b-row class="row-wrap">
			<b-col xl="4" lg="6" md="12" sm="12">
				<div class="timeWrap">
					<div class="date">{{ Date.now() | moment("YYYY.M.D") }}</div>
					<dashboard-timer />
				</div>
				<total-voltage :data="totalVoltage" />
				<reading :data="readingRate" />
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
				<ami-status-board :data="deviceRegErrorCount" />
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
let sseMap;
let sseRate;

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
			this.deviceRegErrorCount = data.deviceRegErrorCount;
			this.readingDayInfo = data.readingDayInfo;
			//this.readingRate = data.rate;
		};
		sseRate = Dashboard.rateHourInfo(60);
		sseRate.onerror = function() {};
		sseRate.onopen = function() {};
		sseRate.onmessage = e => {
			const data = JSON.parse(e.data);
			this.readingRate = data.response;
		};
		sseMap = Dashboard.mapInfo(60);
		sseMap.onerror = function() {};
		sseMap.onopen = function() {};
		sseMap.onmessage = e => {
			const data = JSON.parse(e.data);
			this.regionMap = data.response;
		};
		const response = await Dashboard.firstData();
		const data = response.data;
		this.totalVoltage = data.useData;
		this.todayWeather = { todayWeather: data.weather, weatherData: data.weatherData };
		this.deviceRegErrorCount = data.deviceRegErrorCount;
		this.readingDayInfo = data.readingDayInfo;
		const responseRate = await Dashboard.firstRateData();
		this.readingRate = responseRate.data.rate;
		const responseMap = await Dashboard.firstMapData();
		this.regionMap = responseMap.data.map;
	},
	data: function() {
		return {
			now: Date.now(),
			totalVoltage: null,
			todayWeather: null,
			readingRate: null,
			deviceRegErrorCount: null,
			readingDayInfo: null,
			regionMap: [
				{ hckey: "kr-so", value: NaN },
				{ hckey: "kr-pu", value: NaN },
				{ hckey: "kr-tg", value: NaN },
				{ hckey: "kr-in", value: NaN },
				{ hckey: "kr-kj", value: NaN },
				{ hckey: "kr-tj", value: NaN },
				{ hckey: "kr-ul", value: NaN },
				{ hckey: "kr-kg", value: NaN },
				{ hckey: "kr-kw", value: NaN },
				{ hckey: "kr-gb", value: NaN },
				{ hckey: "kr-gn", value: NaN },
				{ hckey: "kr-cb", value: NaN },
				{ hckey: "kr-2685", value: NaN },
				{ hckey: "kr-2688", value: NaN },
				{ hckey: "kr-kn", value: NaN },
				{ hckey: "kr-cj", value: NaN },
				{ hckey: "kr-sj", value: NaN }
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
