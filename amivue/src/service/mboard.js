import Send from "@/axios";
import Store from "@/store";
import { EventSourcePolyfill } from "event-source-polyfill";

export default {
	firstData() {
		return Send({
			url: "/metering/mboard/all/firstdata",
			method: "get"
		});
	},
	lpCount(sec) {
		if (!sec) {
			sec = 60;
		}

		const token = Store.state.userStore.token.accessToken;
		return new EventSourcePolyfill("/api/metering/mboard/lp/count?duration=" + sec, {
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
		return new EventSourcePolyfill("/api/metering/mboard/readingrateAll/dayOne?duration=" + sec, {
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
		return new EventSourcePolyfill("/api/metering/mboard/location/mapinfo?duration=" + sec, {
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
		return new EventSourcePolyfill("/api/metering/mboard/region/aggregations?duration=" + sec, {
			headers: { "x-token": token },
			format: "json",
			withCredentials: true,
			heartbeatTimeout: 300000
		});
	}
};
