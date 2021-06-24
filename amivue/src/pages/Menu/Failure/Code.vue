<template>
	<div class="main-bg content">
		<content-header :pageName="pageName" :paths="paths" />
		<content-search :shows="shows" @handle:searchItem="searchItemList"> </content-search>
		<div class="table-wrap">
			<div class="bgtable">
				<content-table
					:isBusy="isBusy"
					:items="codeList"
					:fields="codeFields"
					:isPerPage="true"
					:showFilterList="showFilterList"
					:excelFileName="$t('regular.excelFileName')"
					:excelSheetName="$t('menu.metering.regular')"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import Code from "@/service/code";
import ContentMixin from "@/components/content/mixin";

export default {
	mixins: [ContentMixin],
	props: {
		shows: {
			type: Array,
			default: function() {
				return ["region", "estate", "dcuCode"];
			}
		},
		showFilterList: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {
			pageName: this.$t("menu.failure.code"),
			paths: [
				{ name: this.$t("menu.title"), bicon: "house", link: "/" },
				{ name: this.$t("menu.failure.title") },
				{ name: this.$t("menu.failure.code") }
			],
			codeList: [],
			codeFields: [
				{
					key: "meterDate",
					label: this.$t("component.content.table.meterDate"),
					datetimeable: true
				},
				{
					key: "regionName",
					label: this.$t("component.content.table.regionName")
				},
				{
					key: "estateName",
					label: this.$t("component.content.table.estateName")
				},
				{
					key: "buildingName",
					label: this.$t("component.content.table.buildingName")
				},
				{
					key: "houseName",
					label: this.$t("component.content.table.houseName")
				},
				{
					key: "dcuId",
					label: this.$t("component.content.table.dcuId")
				},
				{
					key: "meterId",
					label: this.$t("component.content.table.meterId")
				},
				{
					key: "meterType",
					label: this.$t("component.content.table.meterType")
				},
				{
					key: "codeValue",
					label: this.$t("component.content.table.codeValue")
				}
			]
		};
	},
	methods: {
		async getCodeList(params) {
			try {
				this.isBusy = true;
				const response = await Code.list(params);
				const result = response.data.response;
				this.codeList = result;
			} catch (error) {
				const result = [];
				this.codeList = result;
			} finally {
				this.isBusy = false;
			}
		},
		searchItemList: function(searchItem) {
			console.log(searchItem);
			this.getCodeList(searchItem);
		}
	}
};
</script>
