<script setup>
import { useError } from '~/pinia/useError';
const { state: attState, actions: attActions } = useFactory('attributes');
const { state: attTermsState, actions: attTermsActions } = useFactory('attributeterms');
provide('attState', attState);
provide('attActions', attActions);
provide('attTermsState', attTermsState);
provide('attTermsActions', attTermsActions);

const appError = useError();

const attributeRefs = ref([]);

onMounted(() => {
  // console.log(attributeRefs.value.$el);
  // for (const prop in attributeRefs.value) console.log(attributeRefs.value[prop].$el.querySelector('.form-group input'));
});

// Populate attribute and atribute terms states
await Promise.all([attActions.fetchAll(), attTermsActions.fetchAll()]);

const handleSearch = async () => {
  await attActions.fetchAll();
};

const saveAttributes = async () => {
  await Promise.all(
    attState.items.map(async (item) => {
      attState.selectedItem = item;
      await attActions.saveItem();
    })
  );
  if (!attState.errorMsg) appError.setSnackbar(true, 'Attributes saved succesfully', 'Success');

  // if (!state.errorMsg) router.push({ name: 'admin-products-attributes' })
};

// const removeTermInputsHiddenClass = () => {
//   for (const prop in attributeRefs.value) {
//     attributeRefs.value[prop].$el.querySelector('.form-group input').classList.add('hidden');
//   }
// };
</script>

<script>
export default {
  layout: 'admin',
};
</script>

<template>
  <div class="attributes">
    <!-- <pre style="font-size: 1rem">{{ attState.items }}</pre> -->
    <!-- <pre style="font-size: 1rem">{{ attTermsState.items }}</pre> -->
    <!-- {{ attributeRefs }} -->
    <header>
      <h2>Attributes</h2>
      <!-- <NuxtLink class="link" :to="{ name: 'admin-products-attributes-slug', params: { slug: ' ' } }"> -->
      <button class="btn btn-primary" @click="attState.items.push({})">Add New</button>
      <!-- </NuxtLink> -->
    </header>
    <main>
      <div class="table">
        <div class="table__header">
          <div class="row">
            <div class="th">Name</div>
            <div class="th">Options</div>
            <div class="th">Actions</div>
          </div>
        </div>
        <ul class="table__body">
          <ProductsAdminAttribute
            :attribute="attribute"
            :i="i"
            class="row"
            v-for="(attribute, i) in attState.items"
            :key="attribute._id"
            :ref="
              (el) => {
                if (el) attributeRefs[i] = el;
              }
            "
          />
        </ul>
      </div>
    </main>
    <footer>
      <!-- <button class="btn btn-secondary">Cancel</button> -->
      <button class="btn btn-primary" @click="saveAttributes">Save Changes</button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.attributes {
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
    // flex: 1;
    // border: 1px solid red;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    padding: 1rem 3rem;

    .btn {
      padding: 2rem 3rem;
      border-radius: 5px;
    }
  }
}
</style>
