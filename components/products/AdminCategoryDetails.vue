<script setup>
const state = inject('state')
</script>

<template>
  <section class="details shadow-md">
    <header class="admin-section-header">Details</header>
    <div class="content">
      <div class="name-permalink">
        <div class="name">
          <FormsBaseInput label="Name" placeholder="Name" required v-model="state.selectedItem.name" />
        </div>
        <div class="permalink">
          <FormsBaseInput label="Permalink" placeholder="Permalink" v-model="state.selectedItem.permalink" />
        </div>
      </div>
      <div class="base-textarea">
        <textarea
          v-model="state.selectedItem.description"
          label="Description"
          placeholder="Description"
          rows="5"
        ></textarea>
        <label>Description</label>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.details {
  background-color: white;
  border-radius: 5px;
  padding: 2rem 2rem 4rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .name-permalink {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 100%;

      .name,
      .permalink {
        flex: 1;
      }
    }
  }
}
</style>
