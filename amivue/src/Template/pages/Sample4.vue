<template>
	<div>
		<search />
		<div class="dcu-list-wrap">
			<div class="blank-box">
				<span
					><img src="/img/monitor_empty.b22e08f5.svg"/><svg
						viewBox="0 0 16 16"
						width="1em"
						height="1em"
						focusable="false"
						role="img"
						aria-label="three dots"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						class="bi-three-dots b-icon bi b-icon-animation-cylon"
						style="font-size: 200%;"
					>
						<g>
							<path
								d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
							></path>
						</g></svg
				></span>
				<p>검색결과가 없습니다. 검색을 먼저 진행해주세요.</p>
			</div>
			<div class="row">
				<dcu-status />
				<dcu-status />
				<dcu-status />
				<dcu-status />
				<dcu-status />
				<dcu-status />
				<dcu-status />
				<dcu-status />
				<dcu-status />
			</div>
		</div>
	</div>
</template>

<script>
import Search from "@/Template/components/Search";
import DcuStatus from "@/Template/components/DcuStatus";

export default {
	components: { Search, DcuStatus }
};
</script>
