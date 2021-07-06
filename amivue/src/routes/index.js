import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "@/pages/Layout/MainLayout";
import store from "@/store";
import locale from "@/locales";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		redirect: "/dashboard",
		component: MainLayout,
		children: [
			{
				path: "dashboard",
				name: "Dashboard",
				component: () => import("@/pages/Dashboard")
			},
			// 설비
			{
				path: "estate",
				name: "Estate",
				component: () => import("@/pages/Menu/Device/Estate"),
				meta: { theme: "theme_white" }
				// props: route => ({ pageNumber: parseInt(route.params.pageNumber) })
			},
			{
				path: "building",
				name: "Building",
				component: () => import("@/pages/Menu/Device/Building"),
				meta: { theme: "theme_white" }
			},
			{
				path: "equipment",
				name: "Equipment",
				component: () => import("@/pages/Menu/Device/Equipment"),
				meta: { theme: "theme_white" }
			},
			{
				path: "mapping",
				name: "Mapping",
				component: () => import("@/pages/Menu/Device/Mapping"),
				meta: { theme: "theme_white" }
			},
			{
				path: "nms",
				name: "NMS",
				component: () => import("@/pages/Menu/Device/NMS"),
				meta: { theme: "theme_white" }
			},
			{
				path: "server",
				name: "Server",
				component: () => import("@/pages/Menu/Device/Server")
			},
			// 검침
			{
				path: "mBoard",
				name: "MBoard",
				component: () => import("@/pages/Menu/Metering/MBoard")
			},
			{
				path: "lookup",
				name: "Lookup",
				component: () => import("@/pages/Menu/Metering/Lookup"),
				meta: { theme: "theme_white" }
			},
			{
				path: "info",
				name: "Info",
				component: () => import("@/pages/Menu/Metering/Info"),
				meta: { theme: "theme_white" }
			},
			{
				path: "regular",
				name: "Regular",
				component: () => import("@/pages/Menu/Metering/Regular"),
				meta: { theme: "theme_white" }
			},
			// 장애
			{
				path: "fBoard",
				name: "FBoard",
				component: () => import("@/pages/Menu/Failure/FBoard")
			},
			{
				path: "code",
				name: "Code",
				component: () => import("@/pages/Menu/Failure/Code"),
				meta: { theme: "theme_white" }
			},
			{
				path: "status",
				name: "Status",
				component: () => import("@/pages/Menu/Failure/Status"),
				meta: { theme: "theme_white" }
			},
			{
				path: "reading",
				name: "Reading",
				component: () => import("@/pages/Menu/Failure/Reading"),
				meta: { theme: "theme_white" }
			},
			// 고객 지원
			{
				path: "ask",
				name: "Ask",
				component: () => import("@/pages/Menu/Support/Ask"),
				meta: { theme: "theme_white" }
			},
			{
				path: "qna",
				name: "QnA",
				component: () => import("@/pages/Menu/Support/QnA"),
				meta: { theme: "theme_white" }
			},
			{
				path: "templateComponents",
				name: "TemplateComponents",
				component: () => import("@/Template/Components"),
				meta: { theme: "theme_white" }
			},
			{
				path: "templatePages",
				name: "TemplatePages",
				component: () => import("@/Template/Pages"),
				meta: { theme: "theme_white" }
			},
			{
				path: "templateDashboard",
				name: "TemplateDashboard",
				component: () => import("@/Template/DashBoard")
			},
			{
				path: "templateMboard",
				name: "TemplateMboard",
				component: () => import("@/Template/MBoard")
			},
			{
				path: "templateFboard",
				name: "TemplateFboard",
				component: () => import("@/Template/FBoard")
			}
		]
	},
	{
		path: "/mainDashboard",
		name: "MainDashboard",
		component: () => import("@/pages/Dashboard"),
		props: {
			dashboard: true
		}
	},
	{
		path: "/readingDashboard",
		name: "ReadingDashboard",
		component: () => import("@/pages/Menu/Metering/MBoard"),
		props: {
			dashboard: true
		}
	},
	{
		path: "/failDashboard",
		name: "FailDashboard",
		component: () => import("@/pages/Menu/Failure/FBoard"),
		props: {
			dashboard: true
		}
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/pages/Login"),
		meta: { unauthorized: true }
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	saveScrollPosition: true,
	routes,
	// linkActiveClass: "active",
	linkExactActiveClass: "on" // 클릭시 삽입할 class
});

router.beforeEach(async (to, from, next) => {
	if (store.state && store.state.userStore && store.state.userStore.token.refreshToken && !store.state.userStore.token.accessToken) {
		// await refreshToken();	// 나중에 수정해야함
	}

	if (to.matched.some(record => record.meta.unauthorized) || (store.state && store.state.userStore && store.state.userStore.token.accessToken)) {
		return next();
	} else if (to.redirectedFrom == "/") {
		if (store.state.userStore.token.accessToken) {
			return next("/dashboard");
		} else {
			return next("/login");
		}
	}

	alert(locale.t("msg.session.login"));
	return next("/login");
});

export default router;
