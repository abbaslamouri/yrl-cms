<script setup>
	const prodState = inject('prodState')
	const attTermsState = inject('attTermsState')

	const props = defineProps({
		prodAttr: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
	})

	const termSelect = ref('')

	const removeVariantCallback = (termId) => {
		let j = 0
		while (j < prodState.selectedItem.variants.length) {
			const k = prodState.selectedItem.variants[j].attrTerms.findIndex((t) => t._id == termId)
			const countBefore = prodState.selectedItem.variants[j].attrTerms.length
			console.log('Before', countBefore)
			if (k !== -1) prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
			const countAfter = prodState.selectedItem.variants[j].attrTerms.length
			console.log('After', countAfter)
			if (countBefore != countAfter) prodState.selectedItem.variants[j].discard = true

			j++
		}
		prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.discard)

		if (!prodState.selectedItem.variants.length) prodState.selectedItem.variants = []
	}

	const removeAttribute = () => {
		if (!confirm('Are you sure?')) return

		// Remove all terms whose parent attarubute is to be deleted and mark all variants with empty eterms fro deletion
		let j = 0
		while (j < prodState.selectedItem.variants.length) {
			const k = prodState.selectedItem.variants[j].attrTerms.findIndex(
				(t) => t.parent == prodState.selectedItem.attributes[props.index].item._id
			)
			if (k !== -1) prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
			if (!prodState.selectedItem.variants[j].attrTerms.length) prodState.selectedItem.variants[j].delete = true
			j++
		}

		// Delete all marked variations
		prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.delete)

		// Delete attribute
		prodState.selectedItem.attributes.splice(props.index, 1)
	}

	const addAllTerms = () => {
		console.log('PAI', prodState.selectedItem.attributes[props.index].item._id)
		console.log('TERMS', attTermsState.items)
		const terms = attTermsState.items.filter(
			(el) => el.parent == prodState.selectedItem.attributes[props.index].item._id
		)
		console.log(terms)
		prodState.selectedItem.attributes[props.index].terms = terms
	}

	const addTerm = () => {
		console.log(termSelect.value)
		const term = attTermsState.items.find((el) => el._id == termSelect.value)
		console.log(term)
		if (term) {
			if (!prodState.selectedItem.attributes[props.index].terms) {
				prodState.selectedItem.attributes[props.index].terms = [term]
				console.log('here', prodState.selectedItem.attributes[props.index].terms)
			} else {
				const j = prodState.selectedItem.attributes[props.index].terms.findIndex((el) => el._id == term._id)
				console.log(j)
				if (j == -1) prodState.selectedItem.attributes[props.index].terms.push(term)
			}
		}
		termSelect.value = ''
	}

	const removeTerm = (i, termId) => {
		if (!confirm('Are you sure?')) return
		prodState.selectedItem.attributes[props.index].terms.splice(i, 1)
		removeVariantCallback(termId)
		// let j = 0
		// prodState.selectedItem.attributes[props.index].terms.splice(i, 1)
		// while (j < prodState.selectedItem.variants.length) {
		//   const k = prodState.selectedItem.variants[j].attrTerms.findIndex((t) => t._id == termId)
		//   if (k !== -1) prodState.selectedItem.variants[j].discard = true
		//   j++
		// }
		// prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.discard)

		// if (prodState.selectedItem.variants.length < 2) prodState.selectedItem.variants = []

		// if (!prodState.selectedItem.attributes[props.index].terms.length)
		// delete prodState.selectedItem.attributes[props.index].terms

		// if (prodState.selectedItem.attributes[props.index].terms.length < 2) {
		//   while (j < prodState.selectedItem.variants.length) {
		//     const k = prodState.selectedItem.variants[j].attrTerms.findIndex(
		//       (t) => t._id == prodState.selectedItem.attributes[props.index].terms[0]._id
		//     )
		//     if (k !== -1) {
		//       // prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
		//       // if (prodState.selectedItem.variants[j].attrTerms.length < 2)
		//       prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
		//     }
		//     j++
		//   }
		// }
		// prodState.selectedItem.variants = prodState.selectedItem.variants.filter((el) => !el.delete)
		// prodState.selectedItem.attributes[props.index].terms.splice(0, 1)
		// if (prodState.selectedItem.attributes[props.index].terms.length < 2) {
		//   prodState.selectedItem.variants.filter((v) => {
		//     return v.attrTerms.filter((a) => a.parent != prodState.selectedItem.attributes[props.index].item._id)
		//   })
		// }
		// j = 0
		// while (j < prodState.selectedItem.variants.length) {
		//   const k = prodState.selectedItem.variants[j].attrTerms.findIndex((t) => t._id == termId)
		//   if (k !== -1) {
		//     prodState.selectedItem.variants[j].attrTerms.splice(k, 1)
		//     if (prodState.selectedItem.variants[j].attrTerms.length < 2) prodState.selectedItem.variants[j].delete = true
		//   }
		//   j++
		// }
	}

	const removeAllTerms = () => {
		// Remove all terms from ttribute
		if (!confirm('Are you sure?')) return
		for (const prop in prodState.selectedItem.attributes[props.index].terms) {
			console.log('TTTTT', prop)
			removeVariantCallback(prodState.selectedItem.attributes[props.index].terms[prop]._id)
		}
		prodState.selectedItem.attributes[props.index].terms = []

		// const index = prodState.selectedItem.attributes.findIndex(
		//   (a) => a._id == prodState.selectedItem.attributes[props.index]._id
		// )
		// console.log(index)
		// if (index !== -1) prodState.selectedItem.attributes[props.index].terms = []
	}
</script>

<template>
	<div>
		<pre>{{ prodAttr }}======</pre>
		<div class="header bg-blue-100 p-2 flex justify-between">
			<div>
				{{ prodState.selectedItem.attributes[index].attribute.name }}
			</div>
			<div>
				<IconsDeleteFill @click="removeAttribute" />
			</div>
		</div>
		<div class="content flex gap-10">
			<!-- <div class="checkboxes border">
				<div>
					<input
						class="h-6 w-6 cursor-pointer"
						type="checkbox"
						v-model="prodState.selectedItem.attributes[index].attribute.visible"
					/>
					<label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
						Visible on the product page
					</label>
				</div>
				<div v-show="prodState.selectedItem.type === 'variable'">
					<input
						class="h-6 w-6 cursor-pointer"
						type="checkbox"
						v-model="prodState.selectedItem.attributes[index].attribute.variation"
					/>
					<label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
						Used for variations
					</label>
				</div>
			</div> -->
			<div class="values">
				<div class="options border border-blue-200 p-10 flex gap-4">
					<div
						v-if="prodState.selectedItem.attributes[index].terms"
						class="option bg-gray-200 flex gap-2 rounded border border-gray-300 pl-4"
						v-for="(term, i) in prodState.selectedItem.attributes[index].terms"
						:key="term._id"
					>
						<span>{{ term.name }}</span>
						<span class="remove bg-white px-2 ml-2 cursor-pointer" @click="removeTerm(i, term._id)">x</span>
					</div>
				</div>
				<div class="actions">
					<button class="btn" @click.prevent="addAllTerms()">Select All</button>
					<button class="btn" @click.prevent="removeAllTerms(prodState.selectedItem.attributes[index]._id)">
						Select None
					</button>

					<select class="" v-model="termSelect" @change="addTerm">
						<option value="">select term</option>
						<option
							v-for="term in attTermsState.items.filter(
								(el) => el.parent == prodState.selectedItem.attributes[index].attribute._id
							)"
							:key="term._id"
							:value="term._id"
							:disabled="
								prodState.selectedItem.attributes[index].terms &&
								prodState.selectedItem.attributes[index].terms.find((el) => el._id == term._id)
							"
						>
							{{ term.name }}
						</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang=""></style>
