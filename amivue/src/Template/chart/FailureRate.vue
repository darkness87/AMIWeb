<template>
	<b-row>
		<b-col xl="6" lg="6">
			<div class="svg">
				<h6>{{ $t("FBoard.comparePersent") }}</h6>
				<div class="data">10%</div>
			</div>
		</b-col>
		<b-col xl="6" lg="6">
			<div class="svg">
				<h6>{{ $t("FBoard.restorePersent") }}</h6>
				<div class="data">50%</div>
			</div>
		</b-col>
	</b-row>
</template>

<script>
import Fboard from "@/service/fboard";
let sse;

export default {
	props: ["allData"],
	watch: {
		allData: function(value) {
			this.data = value.failureCompare;
		}
	},
	mounted() {
		sse = Fboard.rate();
		sse.onerror = function() {};
		sse.onopen = function() {};
		sse.onmessage = e => {
			const data = JSON.parse(e.data).response;
			this.data = data;
		};
	},
	data() {
		return {
			chartName: "column",
			data: null
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
