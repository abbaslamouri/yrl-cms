<script setup>
	const attState = inject('attState')
	const prodState = inject('prodState')
	const attTermsState = inject('attTermsState')
	// const attributeSelect = inject('attributeSelect')

	const attributeSelect = ref('')

	const addAttribute = () => {
		console.log(attributeSelect.value)
		// const attribute = attState.items.find((el) => el._id == attributeSelect.value)
		// console.log(attribute)
		// const terms = attTermsState.items.filter((el) => el.parent == attribute._id)
		// console.log(terms)
		// attribute.visible = true
		// attribute.variation = true
		// prodState.selectedItem.attributes.push({ attribute, defaultTerm: terms[0] })
		// attributeSelect.value = ''
	}

	// watch(attributeSelect, (current, prev) => {
	// 	console.log(current)
	// 	const attribute = attState.items.find((el) => el._id == current)
	// 	console.log(attribute)
	// 	const terms = attTermsState.items.filter((el) => el.parent == attribute._id)
	// 	console.log(terms)
	// 	attribute.visible = true
	// 	attribute.variation = true
	// 	prodState.selectedItem.attributes.push({ attribute, defaultTerm: terms[0] })
	// 	attributeSelect.value = ''
	// })
</script>

<template>
	<div class="admin-product-attributes-panel">
		<pre class="text-sm">{{ prodState.selectedItem }}</pre>

		<div class="attributes">
			<header>
				<h2>Attributes</h2>
				<button
					class="btn btn-primary"
					@click="prodState.selectedItem.attributes.push({ attribute: {}, terms: [], defaultTerms: {} })"
				>
					Add New
				</button>
			</header>
			<main>
				<div class="attribute" v-for="(item, index) in prodState.selectedItem.attributes">
					<ProductsAdminProductAttribute :index="index" :prodAttr="item" />
				</div>
			</main>

			<!-- <div class="admin-attributes-list">
				<div class="attribute" v-for="(item, index) in prodState.selectedItem.attributes">
					<ProductsAdminProductAttribute :index="index" />

					<div class="admin-attribute">
						<div class="name td">
							<FormsBaseInput
								required
								placeholder="Add New Attribute Name (Example: Color, Size ...)"
								v-model="item.attribute.name"
							/>
						</div>
						<div class="terms td shadow-md" @click="termInputFocus">
							<div
								class="list"
								v-for="(term, j) in attTermsState.items.filter((el) => el.parent == item.attribute._id)"
								:key="term"
							>
								<span>{{ term.name }}</span>
								<IconsClose @click="deleteTerm(term)" />
							</div>
							<div class="form-group" @click="checkIfAttribute">
								<input
									class="hidden"
									ref="termInputRef"
									type="text"
									v-model="newTerm"
									placeholder="Add New Attribute Term (Example:Green, Blue, Green ...)"
									:disabled="item.attribute.name == ''"
									@keyup.enter.prevent="addAttributeTerm"
									@blur="termInputRef.classList.add('hidden')"
								/>
							</div>
						</div>
						<div class="actions td">
							<button class="btn" @click.prevent="showActions = !showActions"><IconsMoreHoriz /></button>
							<div class="menu shadow-md" v-show="showActions">
								<a href="#" class="link"><div class="advanced">Advanced</div></a>
								<a href="#" class="link" @click.prevent="deleteAttribute" v-if="attribute._id">
									<div class="cancel">Delete</div>
								</a>
								<a href="#" class="link" @click.prevent="attState.items.splice(i, 1)" v-else>
									<div class="cancel">Cancel</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="admin-attribute-select">
				<FormsBaseSelect
					@update:modelValue="addAttribute"
					v-model="attributeSelect"
					:options="
						attState.items.map((a) => {
							return { key: a._id, name: a.name }
						})
					"
				/>
			</div> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.admin-product-attributes-panel {
		// border: 1px solid red;
		height: 95%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 4rem 2rem;
		header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 2rem;
		}

		main {
			form {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.btn {
					align-self: flex-end;
					margin-top: 1rem;
				}
			}
			// flex: 1;
			// border: 1px solid red;
		}
		// footer {
		//   display: flex;
		//   justify-content: flex-end;
		//   gap: 2rem;
		//   padding: 1rem 3rem;

		//   .btn {
		//     padding: 2rem 3rem;
		//     border-radius: 5px;
		//   }
		// }
	}
</style>
