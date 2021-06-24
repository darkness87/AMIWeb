import Send from "@/axios";
import Store from "@/store";
import { EventSourcePolyfill } from "event-source-polyfill";

export default {
	allData(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/all/data?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	firstData() {
		return Send({
			url: "/dashboard/all/firstdata",
			method: "get"
		});
	},
	totalVoltage(sec) {
		if (!sec && sec != 0) {
			console.log(sec);
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/useAll/dayhour?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	readingRate(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/readingrateAll/dayOne?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	todayFault(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/failureAll/dayhour?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	todayWeather(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/weather/realtime?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	dataWeather(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/weather/data?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	serverInfo(sec) {
		if (!sec) {
			sec = 30;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/server/management/info?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	mapInfo(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/dashboard/location/failure/mapinfo?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	}
};
