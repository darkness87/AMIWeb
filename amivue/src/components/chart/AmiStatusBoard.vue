<template>
	<div class="box">
		<h5>
			<span>AMI 시스템 현황</span>
			<b class="fontC">등록 수 / 장애 수</b>
		</h5>
		<div>
			<ul class="amiBoard">
				<li>
					<ul>
						<li><img src="@/assets/svg/icon_dashboard_meter.svg" /></li>
						<li>METER</li>
						<li>
							<span>{{ data ? data.meterOperationCount : 0 }} / </span>
							<span class="r-color blink">{{ data ? data.meterErrorCount : 0 }}</span>
						</li>
					</ul>
				</li>
				<li>
					<div class="row">
						<div class="col-sm-12 col-md-6">
							<ul>
								<li><img src="@/assets/svg/icon_dashboard_server.svg" /></li>
								<li>SERVER</li>
								<li>
									<span>{{ data ? data.serverOperationCount : 0 }} / </span>
									<span class="r-color blink">{{ data ? data.serverErrorCount : 0 }}</span>
								</li>
							</ul>
						</div>
						<div class="col-sm-12 col-md-6">
							<ul>
								<li><img src="@/assets/svg/icon_dashboard_dcu.svg" /></li>
								<li>DCU</li>
								<li>
									<span>{{ data ? data.dcuOperationCount : 0 }} / </span>
									<span class="r-color blink">{{ data ? data.dcuErrorCount : 0 }}</span>
								</li>
							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="row">
						<div class="col-sm-12 col-md-6">
							<ul>
								<li><img src="@/assets/svg/icon_dashboard_modem.svg" /></li>
								<li>MODEM</li>
								<li>
									<span>{{ data ? data.modemOperationCount : 0 }} / </span>
									<span class="r-color blink">{{ data ? data.modemErrorCount : 0 }}</span>
								</li>
							</ul>
						</div>
						<div class="col-sm-12 col-md-6">
							<ul>
								<li><img src="@/assets/svg/icon_dashboard_wifi.svg" /></li>
								<li>LTE Router</li>
								<li>
									<span>{{ data ? data.lteOperationCount : 0 }} / </span>
									<span class="r-color blink">{{ data ? data.lteErrorCount : 0 }}</span>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: ["data"]
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/amiStatusBoard.scss";
</style>
