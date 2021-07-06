<template>
	<b-row>
		<b-col xl="6" lg="12">
			<div class="box svg">
				<h6>{{ $t("MBoard.readingTimelyRate") }}</h6>
				<div class="data">{{ data ? Math.floor(data.todayTimelyRate * 100) / 100 : 0 }}%</div>
				<div class="svg-wrap">
					<img src="@/assets/svg/box.svg" />
				</div>
			</div>
		</b-col>
		<b-col xl="6" lg="12">
			<div class="box svg">
				<h6>{{ $t("MBoard.readingRate") }}</h6>
				<div class="data">{{ data ? Math.floor(data.todayMeterReadingRate * 100) / 100 : 0 }}%</div>
				<div class="svg-wrap">
					<img src="@/assets/svg/sound.svg" />
				</div>
			</div>
		</b-col>
	</b-row>
</template>

<script>
import Mboard from "@/service/mboard";
let sse;

export default {
	props: ["allData"],
	watch: {
		allData: function(value) {
			this.data = value.rate;
		}
	},
	mounted() {
		sse = Mboard.readingRate();
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
			console.log("meteringRate SSE Destroyed!!");
		}
	}
};
</script>
