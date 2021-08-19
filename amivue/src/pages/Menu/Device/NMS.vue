<template>
	<div class="main-bg content">
		<content-header :pageName="pageName" :paths="paths" />
		<content-search @handle:searchItem="searchItemList"> </content-search>
		<b-row class="row-wrap">
			<b-col lg="6" sm="12">
				<div class="wbox">
					<h5 class="tltle">
						<b-icon icon="arrow-return-right"></b-icon>
						<span>
							DCU <i class="p-Color">{{ dcuList.length > 0 ? dcuList.length : 0 }}</i>
						</span>
						<div role="group" class="btn-group">
							<b-button variant="light" @click="sendReboot">{{ $t("nms.button.reboot") }}</b-button>
							<b-button variant="light" disabled>{{ $t("nms.button.rescan") }}</b-button>
							<b-button variant="light" disabled>{{ $t("nms.button.dcuFirmwareUpgrade") }}</b-button>
						</div>
					</h5>
					<div class="table-wrap">
						<div class="basic-table">
							<b-table :busy="isDcuBusy" :items="dcuList" :fields="dcuFields" select-mode="single" selectable @row-selected="onDcuRowSelected">
								<template #table-busy>
									<div class="text-center text-danger my-2">
										<b-spinner class="align-middle"></b-spinner>
										<slot name="table-loading-text">
											<strong>{{ $t("msg.loading") }}</strong>
										</slot>
									</div>
								</template>
								<template #cell(sysState)="row">
									{{ row.item.sysState == 1 ? "정상" : "비정상" }}
								</template>
								<template #cell(_checkbox)="row">
									<b-form-checkbox v-model="dcuRebootList" :value="{ dcuId: row.item.dcuId, dcuIp: row.item.dcuIp }" />
								</template>
							</b-table>
						</div>
					</div>
				</div>
			</b-col>
			<b-col lg="6" sm="12">
				<div class="wbox">
					<h5 class="tltle">
						<b-icon icon="arrow-return-right"></b-icon>
						<span>
							Modem <i class="p-Color">{{ this.modemData ? this.modemData.modemCount : 0 }}</i> Meter
							<i class="p-Color">{{ this.modemData ? this.modemData.meterCount : 0 }}</i>
							({{ this.modemData ? this.modemData.masterModemMac : "" }})
						</span>
						<div role="group" class="btn-group" disabled>
							<b-button variant="light" disabled>{{ $t("nms.button.modemReset") }}</b-button>
							<b-button variant="light" disabled>{{ $t("nms.button.modemFirmwareUpgrade") }}</b-button>
						</div>
					</h5>
					<div class="table-wrap">
						<div class="basic-table">
							<b-table :busy="isModemBusy" :items="modemList" :fields="modemFields">
								<template #table-busy>
									<div class="text-center text-danger my-2">
										<b-spinner class="align-middle"></b-spinner>
										<slot name="table-loading-text">
											<strong>{{ $t("msg.loading") }}</strong>
										</slot>
									</div>
								</template>
								<template #cell(statusCode)="row">
									{{ $t("nms.modemStatus")[row.item.modemStatus] }}
								</template>
								<template #cell(expand)="row">
									<b-button size="sm" @click="row.toggleDetails">
										<b-icon v-show="!row.detailsShowing" icon="chevron-down"></b-icon>
										<b-icon v-show="row.detailsShowing" icon="chevron-up"></b-icon>
									</b-button>
								</template>
								<template #row-details="row">
									<b-card>
										<div class="basic-table">
											<table>
												<thead>
													<tr :class="{ error: item.status == 1 }" v-for="(item, index) in row.item.stepMeter" :key="index">
														<td><b-icon icon="arrow-return-right"></b-icon></td>
														<td>{{ item.meterId }} ( {{ item.houseName }} )</td>
														<td>{{ item.meterType }}</td>
														<td>{{ item.meterTime }}</td>
														<td>{{ item.fap }}</td>
													</tr>
													<!-- <tr>
														<td><b-icon icon="arrow-return-right"></b-icon></td>
														<td>06090009424 (301호)</td>
														<td>2020-12-29 12:00:00)</td>
														<td>12451</td>
													</tr> -->
												</thead>
											</table>
										</div>
									</b-card>
								</template>
							</b-table>
						</div>
					</div>
				</div>
			</b-col>
		</b-row>
		<div class="btn-only-wrap" v-show="false">
			<div class="btn-wrap">
				<div role="group" class="btn-group">
					<b-button variant="light" disabled>SNMP read/write</b-button>
					<b-button variant="light" disabled>trap</b-button>
					<b-button variant="light" disabled>상태리스트</b-button>
					<b-button variant="light" disabled>SNMP / FEP 통신 동작 확인</b-button>
					<b-button variant="light" disabled>시간 동기화</b-button>
				</div>
				<div role="group" class="btn-group">
					<b-button variant="light" disabled>펌웨어 이미지 관리</b-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Nms from "@/service/nms";
import ContentMixin from "@/components/content/mixin";

export default {
	mixins: [ContentMixin],
	computed: {
		modemList() {
			return this.modemData ? this.modemData.stepModem : [];
		}
	},
	data() {
		return {
			isDcuBusy: false,
			isModemBusy: false,
			pageName: this.$t("menu.device.nms"),
			paths: [{ name: this.$t("menu.title"), bicon: "house", link: "/" }, { name: this.$t("menu.device.title") }, { name: this.$t("menu.device.nms") }],
			dcuList: [],
			dcuFields: [
				{
					key: "_checkbox",
					label: ""
				},
				{
					key: "buildingName",
					label: this.$t("component.content.table.buildingName")
				},
				{
					key: "dcuId",
					label: this.$t("component.content.table.dcuId")
				},
				{
					key: "dcuIp",
					label: this.$t("component.content.table.dcuIp")
				},
				{
					key: "sysState",
					label: this.$t("component.content.table.sysState")
				},
				{
					key: "firmwareVersion",
					label: this.$t("component.content.table.firmwareVersion")
				},
				{
					key: "nmsVersion",
					label: this.$t("component.content.table.nmsVersion")
				}
			],
			modemData: null,
			modemFields: [
				{
					key: "modemMac",
					label: this.$t("component.content.table.mac")
				},
				{
					key: "stepCount",
					label: this.$t("component.content.table.stepCount")
				},
				{
					key: "hardwareVersion",
					label: this.$t("component.content.table.hardwareVersion")
				},
				{
					key: "programVersion",
					label: this.$t("component.content.table.programVersion")
				},
				{
					key: "statusCode",
					label: this.$t("component.content.table.statusCode")
				},
				{
					key: "expand",
					label: ""
				}
			],
			dcuRebootList: []
		};
	},
	methods: {
		async getDcuList(params) {
			try {
				this.isDcuBusy = true;
				const response = await Nms.dcuList(params);
				const result = response.data.response;
				this.dcuList = result;
			} catch (error) {
				const result = [];
				this.dcuList = result;
			} finally {
				this.isDcuBusy = false;
			}
		},
		async getModemList(params) {
			try {
				this.isModemBusy = true;
				const response = await Nms.modemList(params);
				const result = response.data.response;
				console.log(result[0]);
				this.modemData = result[0];
			} catch (error) {
				this.modemData = null;
			} finally {
				this.isModemBusy = false;
			}
		},
		searchItemList(searchItem) {
			this.getDcuList(searchItem);
		},
		onDcuRowSelected(items) {
			if (items.length > 0) {
				this.getModemList({ dcuId: items[0].dcuId });
			} else {
				this.modelList = [];
			}
		},
		async sendReboot() {
			try {
				console.log(this.dcuRebootList);
				const response = await Nms.dcuRebootList(this.dcuRebootList);
				const result = response.data.response;
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
<style lang="scss">
@import "~@/assets/scss/pages/nms.scss";
@import "~@/assets/scss/table/tableWhite.scss";
</style>
