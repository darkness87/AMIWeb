import Send from "@/axios";
import Store from "@/store";
import { EventSourcePolyfill } from "event-source-polyfill";

export default {
	firstData() {
		return Send({
			url: "/failure/fboard/all/firstdata",
			method: "get"
		});
	},
	dayHour(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/failure/fboard/all/dayhour?duration=" + sec, {
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
		return new EventSourcePolyfill("/api/failure/fboard/location/mapinfo?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	rate(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/failure/fboard/compare/rate?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	},
	aggregations(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/failure/fboard/region/aggregations?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	}
};
