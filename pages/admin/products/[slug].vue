<script setup>
	import slugify from 'slugify'
	const route = useRoute()

	// Import products, categories, attributes, atterbute terms and variants state and actions
	const { state: prodState, actions: prodActions } = useFactory('products')
	const { state: catState, actions: catActions } = useFactory('categories')
	const { state: attState, actions: attActions } = useFactory('attributes')
	const { state: attTermsState, actions: attTermsActions } = useFactory('attributeterms')
	const { state: variantState, actions: variantActions } = useFactory('variants')

	const showAttVarSlideout = ref(false)

	// Set product filters
	prodState.query.slug = route.params.slug
	prodState.query.populate =
		'featuredImage gallery categories attributes attributes.attribute attributes.terms attributes.defaultTerm'

	// fetch product, categories, attributes and attribute terms
	await Promise.all([prodActions.fetchAll(), catActions.fetchAll(), attActions.fetchAll(), attTermsActions.fetchAll()])

	if (prodState.items.length) {
		prodState.selectedItem = prodState.items[0]
		variantState.query.populate = 'attrTerms gallery'
		variantState.query.product = prodState.selectedItem._id
		if (variantState.query.product) await variantActions.fetchAll()
		prodState.selectedItem.variants = variantState.items
	} else {
		prodState.selectedItem = {
			name: 'Hello',
			slug: computed(() => slugify(prodState.selectedItem.name, { lower: true })),
			permalink: computed(() => slugify(prodState.selectedItem.name, { lower: true })),
			price: 125,
			active: true,
			attributes: [],
			categories: [],
			gallery: [],
			taxStatus: 'none',
			taxClass: 'standard',
			allowBcakOrder: 'notify',
			variants: [],
		}
	}

	const showMediaSelector = ref(false) // media selector toggler
	const mediaReference = ref({}) // sets which media to update once a selection is made

	const handleMediaSelectorClick = (payload) => {
		showMediaSelector.value = true
		console.log(payload)
		mediaReference.value = payload
	}

	const processSelectedMedia = async (media) => {
		showMediaSelector.value = false
		media = media.filter((el) => el.mimetype.includes('image'))

		if (mediaReference.value.image === 'variant') {
			for (const prop in media) {
				let index = prodState.selectedItem.variants[mediaReference.value.index].gallery.findIndex(
					(el) => el._id === media[prop]._id
				)
				if (index === -1) {
					prodState.selectedItem.variants[mediaReference.value.index].gallery.push(media[prop])
				}

				index = prodState.selectedItem.gallery.findIndex((el) => el._id === media[prop]._id)
				if (index === -1) {
					prodState.selectedItem.gallery.push(media[prop])
				}
			}
		}

		if (mediaReference.value.image === 'gallery') {
			for (const prop in media) {
				const index = prodState.selectedItem.gallery.findIndex((el) => el._id === media[prop]._id)
				if (index === -1) {
					prodState.selectedItem.gallery.push(media[prop])
				}
			}
		}
	}

	provide('prodState', prodState)
	provide('prodActions', prodActions)
	provide('catState', catState)
	provide('attState', attState)
	provide('attTermsState', attTermsState)
	provide('variantState', variantState)
	provide('variantActions', variantActions)
	provide('handleMediaSelectorClick', handleMediaSelectorClick)
	provide('processSelectedMedia', processSelectedMedia)
	provide('showAttVarSlideout', showAttVarSlideout)
</script>

<script>
	export default {
		layout: 'admin',
	}
</script>

<template>
	<div class="product-details">
		<!-- <pre style="font-size: 1rem">{{ prodState.selectedItem }}</pre> -->
		<Html>
			<Head><Title>Product</Title></Head>
		</Html>

		<NuxtLink class="link" :to="{ name: 'admin-products' }"> <IconsArrowWest /><span>Products</span> </NuxtLink>

		<h3 class="header">Edit Product</h3>

		<div class="columns">
			<div class="left shadow-md">
				<ProductsAdminProductNav />
			</div>

			<div class="center">
				<ProductsAdminDetails />
				<ProductsAdminPrice />
				<ProductsAdminProductImageGallery />

				<section class="variants" id="variants">
					<header class="header flex-bc">
						<div class="admin-section-header">Variants</div>
						<button class="btn btn-primary flex-cc" @click="showAttVarSlideout = true">
							<IconsPlus />
							<span>Add</span>
						</button>
					</header>

					<div class="content">
						<div>Different types of this product (e.g. size, color)</div>
					</div>
				</section>

				<ProductsAdminVariants />
				<ProductsAdminShippingOptions />
				<ProductsAdminDigitalDelivery />
				<ProductsAdminExtraFields />
				<ProductsAdminSeo />
				<ProductsAdminMisc />
			</div>

			<div class="right">
				<ProductsAdminRightNav />
			</div>
		</div>
		<div class="media-selector" v-if="showMediaSelector">
			<LazyMediaUploader
				@mediaSelected="processSelectedMedia"
				@mediaSelectCancel="showMediaSelector = false"
				v-if="showMediaSelector"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/scss/variables';

	.product-details {
		max-width: 1280px;
		min-height: 100vh;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		.link {
			display: flex;
			align-items: center;
			gap: 0.3rem;

			svg {
				width: 1.8rem;
				height: 1.8rem;
			}
		}

		.columns {
			display: grid;
			grid-template-columns: 18rem 1fr 25rem;
			gap: 2rem;
			align-items: flex-start;

			.left {
				position: sticky;
				top: 10rem;
				background-color: white;
				border: 1px solid $slate-100;
				border-radius: 3px;
				padding: 2rem 0.5rem;
			}

			.center {
				display: flex;
				flex-direction: column;
				gap: 3rem;

				.variants {
					background-color: white;
					border-radius: 5px;
					padding: 2rem 2rem;

					.header {
						.btn {
							gap: 0.25rem;

							svg {
								fill: $slate-50;
							}
						}
					}
				}
				// z-index:-1;

				// .details {
				//   background-color: white;
				//   border-radius: 5px;
				//   padding: 2rem 2rem;

				//   .info {
				//     display: flex;
				//     flex-direction: column;
				//     gap: 1rem;

				//     .sku-inventory {
				//       display: flex;
				//       align-items: center;
				//       justify-content: space-between;
				//       gap: 2rem;

				//       .sku {
				//         flex: 1;
				//       }

				//       .inventory {
				//         display: flex;
				//         flex-direction: column;
				//         gap: 0.5rem;
				//         font-size: 1.3rem;

				//         .available {
				//           display: flex;
				//           align-items: center;
				//           gap: 1rem;

				//           .title {
				//             font-weight: 600;
				//           }
				//         }
				//       }
				//     }
				//   }
				// }

				// .price {
				//   background-color: white;
				//   border-radius: 5px;
				//   padding: 2rem 2rem;
				// }
			}

			.right {
				position: sticky;
				top: 10rem;
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}
		}

		.link {
			font-weight: 500;
			color: $slate-400;

			&:hover {
				color: $slate-800;
			}
		}
	}
</style>
