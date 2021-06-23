import Send from "@/axios";

export default {
	list(params) {
		return Send({
			url: "/failure/code/status/list",
			method: "get",
			params: params
		});
	}
};
