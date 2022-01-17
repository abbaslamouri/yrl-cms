<script setup>
const router = useRouter()
const route = useRoute()
const { state, actions } = useFactory('categories')

// Fetch category based on slug
state.query.populate = 'parent'
await actions.fetchAll()
state.selectedItem =
  route.params.slug !== ' ' ? state.items.filter((el) => el.slug === route.params.slug)[0] : { name: '' }

const save = async () => {
  await actions.saveItem()
  if (!state.errorMsg) router.push({ name: 'admin-products-categories' })
}

const handleCancel = async () => {
  router.push({ name: 'admin-products-categories' })
}
</script>

<script>
export default {
  layout: 'admin',
}
</script>

<template>
  <div class="categories">
    <form @submit.prevent="save">
      <h2></h2>
      {{ state.selectedItem }}==== {{ state.items }}
      <div class="inputs">
        <FormsBaseInput
          type="text"
          label="Name"
          v-model="state.selectedItem.name"
          :required="true"
          minlength="3"
          maxlength="25"
          hint="Enter a valid category name"
        />
        <FormsBaseSelect
          label="Parent Category"
          :options="
            route.params.slug != ' '
              ? state.items.filter(
                  (el) =>
                    // el.slug !== route.params.slug ||
                    (!el.parent && el.slug !== route.params.slug) ||
                    (el.parent && el.parent._id != state.selectedItem._id)
                )
              : state.items
          "
          v-model="state.selectedItem.parent"
        />
      </div>
      <div class="actions">
        <button class="btn submit primary" v-if="!state.selectedItem.slug">Create Category</button>
        <button class="btn submit primary" v-else>Update Category</button>
        <button class="btn submit outline" @click.prevent="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
