<script setup>
	const showAdminSidebar = ref(true)

	const checkScreen = () => {
		if (process.client) {
			if (window.innerWidth < 768) showAdminSidebar.value = false
			if (window.innerWidth >= 768) showAdminSidebar.value = true
		}
	}

	if (process.client) {
		window.addEventListener('resize', checkScreen)
		checkScreen()
	}
</script>

<template>
	<div class="app admin">
		<transition name="slide-right">
			<aside v-show="showAdminSidebar">
				<div class="branding flex-cc">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
					</svg>
					<Branding />
				</div>
				<AdminNav />
			</aside>
		</transition>
		<main :class="{ full: !showAdminSidebar }">
			<header class="">
				<MobileNavToggler @hideAdminSidebar="showAdminSidebar = !showAdminSidebar" />
				<ProfileNav class="profile" />
			</header>
			<div class="content">
				<slot />
			</div>
			<footer><Footer /></footer>
		</main>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/scss/variables';

	.app.admin {
		display: grid;
		grid-template-columns: 25rem 1fr;

		@media (min-width: 768px) {
			// grid-template-columns: 25rem 1fr;
		}
		aside {
			position: sticky;
			top: 0;
			display: flex;
			flex-direction: column;

			background-color: $slate-800;
			// width: 25rem;
			// top: 0;
			// bottom: 0;
			// left: 0;
			height: 100vh;
			transition: all 0.2s ease-in-out;
			color: white;
			font-size: 1.4rem;
			gap: 2rem;
			// padding: 2rem 1rem;
			// grid-column: 1 / 2;
			// z-index: 999;

			@media (max-width: 768px) {
				// grid-column: 1 /2;
			}

			.branding {
				display: flex;
				align-items: center;
				// background-color: $slate-900;
				height: 6rem;

				// border:1px solid white;

				gap: 1rem;
				svg {
					fill: white;
					cursor: pointer;
				}
			}
		}

		main {
			grid-column: 2 / 3;
			// padding-top: 5rem;
			// padding-left: 25rem;

			// @media (min-width: 768px) {
			//   grid-column: 2 / 3;
			// }
			transition: all 0.2s ease;

			&.full {
				grid-column: 1 / 3;
				padding-left: 0;
			}

			header {
				position: sticky;
				top: 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// top: 0;
				// left: 0;
				// width: 100%;
				height: 6rem;
				background-color: #222;
				color: white;
				padding: 0 2rem;
				z-index: 9;

				// .profile {
				//   justify-self: flex-end;
				//   border: 1px solid red;
				// }
			}

			.content {
				background-color: $slate-100;
				min-height: 100%;
				border: 1px solid red;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			footer {
				background-color: #000;
				color: white;
				padding: 1rem 2rem;
			}
		}
	}
</style>
