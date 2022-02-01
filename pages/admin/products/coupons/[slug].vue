<script setup>
import slugify from 'slugify'
const router = useRouter()
const route = useRoute()
const { state, actions } = useFactory('coupons')
const { state: prodState, actions: prodActions } = useFactory('products')

const tabs = ref([
  { key: 'general', title: 'General', open: true },
  { key: 'usage-restriction', title: 'Usage Restriction', open: false },
  { key: 'usage-limits', title: 'Usage Limits', open: false },
])
const discountOptions = ref([
  { key: 'fixed-cart', name: 'Fixed Cart Discount' },
  { key: 'fixed-product', name: 'Fixed Product Discount' },
  { key: 'percent-cart', name: 'Percent Cart Discount' },
  { key: 'percent-product', name: 'Percent Product Discount' },
])

const keyword = ref('')
const timer = ref(null)

// Fetch attribute based on slug
state.query.slug = route.params.slug
state.query.populate = 'products'
await actions.fetchAll()
state.selectedItem = route.params.slug !== ' ' ? state.items[0] : { products: [] }

const handleSelectTab = (tabKey) => {
  // console.log(tabKey)
  for (const prop in tabs.value) {
    // console.log(prop, tabs.value[prop])
    if (tabs.value[prop].key == tabKey) tabs.value[prop].open = true
    else tabs.value[prop].open = false
  }
}

const save = async () => {
  if (state.selectedItem.name) state.selectedItem.slug = slugify(state.selectedItem.name, { lower: true })
  await actions.saveItem()
  if (!state.errorMsg) router.push({ name: 'admin-products-coupons' })
}

const handleCancel = async () => {
  router.push({ name: 'admin-products-coupons' })
}

const handleSelect = (product) => {
  state.selectedItem.products.push(product)
  prodState.selectedItems = []
  // keyword.value = ''
}

const handleRemove = (product) => {
  const index = state.selectedItem.products.findIndex((p) => p._id == product._id)
  if (index !== -1) state.selectedItem.products.splice(index, 1)
}

const filterSerachResults = () => {
  const productIds = state.selectedItem.products.map((p) => p._id)
  // console.log(productIds)
  return prodState.selectedItems.filter((p) => !productIds.includes(p._id))
}

watch(
  () => keyword.value,
  (newVal) => {
    if (timer.value) {
      clearTimeout(timer.value)
    }
    timer.value = setTimeout(async () => {
      await prodActions.searchDb(keyword.value)
    }, 800)
  }
)
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="">
    <form class="coupon bg-gray-50 p-10 space-y-10" @submit.prevent="save">
      <!-- <pre class="text-sm">{{ prodState.selectedItems }}</pre> -->
      <!-- {{ state.selectedItem }} -->

      <h2>Edit Coupon</h2>
      <div class="inputs">
        <FormsBaseInput type="text" label="Coupon Code" v-model="state.selectedItem.name" />
      </div>
      <div class="inputs">
        <FormsBaseInput type="text" label="Description(Optional)" v-model="state.selectedItem.description" />
      </div>
      <div class="coupon-data">
        <h2 class="bg-white border px-6">Coupon Data</h2>
        <div class="main flex gap-4">
          <div class="sidebar border">
            <ul class="border">
              <li
                class="border px-2 py-3 cursor-pointer"
                v-for="tab in tabs"
                :key="tab.key"
                @click="handleSelectTab(tab.key)"
              >
                {{ tab.title }}
              </li>
            </ul>
          </div>
          <div class="content flex-1">
            <div class="general-panel space-y-10" v-show="tabs.find((t) => t.key === 'general').open == true">
              <FormsBaseSelect label="Discount Type" v-model="state.selectedItem.type" :options="discountOptions" />
              <FormsBaseInput type="text" label="Coupon Amount" v-model="state.selectedItem.amount" />
              <FormsCheckbox label="Allow Free Shipping" v-model="state.selectedItem.freeShipping" />
              <FormsBaseInput type="date" label="Coupon Expiry Date" v-model="state.selectedItem.expiry" />
            </div>
            <div class="general-panel space-y-4" v-show="tabs.find((t) => t.key === 'usage-restriction').open == true">
              <FormsBaseInput class="w-48" type="text" label="Search for products" v-model="keyword" />
              <div class="px-5 py-5">
                <div
                  class="search-results bg-white border border-indigo-400 w-96"
                  v-show="prodState.selectedItems.length"
                >
                  <div
                    class="cursor-pointer hover:bg-blue-200 px-4 py-2"
                    v-for="product in filterSerachResults()"
                    :key="product._id"
                    @click="handleSelect(product)"
                  >
                    {{ product.name }}
                  </div>
                </div>
                <div>Please enter 3 or more characters</div>
                <div class="flex">
                  <div
                    class="bg-gray-300 px-2 py-2 text-lg rounded cursor-pointer flex items-center gap-2"
                    v-for="product in state.selectedItem.products"
                    :key="product._id"
                  >
                    <div class="border px-2 flex items-center justify-center" @click.prevent="handleRemove(product)">
                      X
                    </div>
                    {{ product.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="general-panel space-y-4" v-show="tabs.find((t) => t.key === 'usage-limits').open == true">
              Usage Limits
            </div>
          </div>
        </div>
      </div>

      <div></div>
      <div class="actions">
        <button class="btn submit primary" v-if="!state.selectedItem.slug" @click="save">Create Attribute</button>
        <button class="btn submit primary" v-else>Update Attribute</button>
        <button class="btn submit outline" @click.prevent="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
