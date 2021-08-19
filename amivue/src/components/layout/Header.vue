<template>
	<div class="navWrap">
		<b-row>
			<b-navbar variant="faded">
				<a class="sidebar-toggle">
					<b-button class="menu" @click="toggleMenu" variant="none"></b-button>
				</a>
			</b-navbar>
			<b-nav class="infowrap ml-auto">
				<b-nav-item class="error">
					<!-- <b-icon icon="question-diamond"></b-icon> -->
					<!--<b-badge pill variant="danger">1</b-badge>-->
				</b-nav-item>
				<b-nav-item class="aram">
					<!--on -->
					<b-icon icon="bell" id="tooltip-button-interactive"></b-icon>
					<!-- <b-badge pill variant="danger">2</b-badge> -->
				</b-nav-item>
				<!-- <b-nav-item href="/templateDashboard">대시보드 컴포넌트</b-nav-item>
				<b-nav-item href="/templateComponents">컴포넌트모음</b-nav-item>
				<b-nav-item href="/templatePages">레이아웃모음</b-nav-item> -->
				<b-nav-item class="user" disabled>{{ apartName ? apartName : "아파트 없음" }}</b-nav-item>
				<b-nav-item class="uerName"><b-icon icon="person"></b-icon>{{ userName }}</b-nav-item>
				<b-nav-item class="logout" href="#" @click.prevent="logout()">{{ $t("header.logout") }}</b-nav-item>
			</b-nav>
		</b-row>
		<!-- <b-tooltip target="tooltip-button-interactive"> 삼성 아파트에 전기검침이 있습니다 </b-tooltip> -->
	</div>
</template>

<script>
// Header css
import "@/assets/scss/layout/header.scss";
import "@/assets/scss/layout/headerWhite.scss";
import { mapGetters } from "vuex";

export default {
	name: "Header",
	computed: {
		...mapGetters({ apartName: "getEstateName", userName: "getName" })
	},
	methods: {
		toggleMenu() {
			this.$emit("toggle-collapse");
		},
		logout() {
			this.$store
				.dispatch("LOGOUT")
				.then(() => {
					this.$router.push("/login");
				})
				.catch(({ response }) => {
					alert(response.data.response.error_message);
				});
		}
	}
};
</script>

<style></style>
