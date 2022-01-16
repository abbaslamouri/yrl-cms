<script setup>
const state = inject('state')

// defineProps({
//   items: {
//     type: Array,
//     required: true,
//   },
//   viewStyle: {
//     type: String,
//     default: 'tile',
//   },
// })

const viewStyle = ref('list')
</script>

<template>
  <div class="flex gap-4" :class="{ list: viewStyle === 'list', tile: viewStyle === 'tile' }">
    <ProductsAdminCard :product="item" v-for="item in state.items" :key="item._id" />
  </div>
</template>

<style lang="scss" scoped>
// padding: 2rem;
.tile {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>

<!-- <script setup>
useMeta({
  title: 'Home | YRL',
})

// const categoryStore = useCategory()

// const children = computed(() => categoryStore.items.filter((el) => el.parent))
// const parents = computed(() => categoryStore.items.filter((el) => !el.parent))

// const getChildren = (parent_id) => {
// 	return children.value.filter((el) => el.parent._id === parent_id)
// }

// categoryStore.fetchAll()
</script>

<template>
  <div class="shop">
    <h3>Shop</h3>
    <nav>
			<h3>Categories</h3>
			{{ categoryStore.items }}========{{ children }}++++++++++{{ parents }}
			<ul class="parents">
				<li class="parent" v-for="parent in parents" :key="parent.slug">
					{{ parent.name }}
					<ul class="children" v-if="getChildren(parent._id).length">
						<li class="child" v-for="child in getChildren(parent._id)" :key="child._id">{{ child.name }}</li>
					</ul>
				</li>
				<NuxtLink class="link" :to="{ name: 'index' }" v-for=><span>Home</span></NuxtLink>
			</ul>
		</nav>
  </div>
</template>

<style lang="scss" scoped>
.shop {
  padding: 2rem;

  nav {
    .parents {
      border: 1px solid red;
      display: flex;

      .parent {
        border: 1px solid teal;
        background-color: #ddd;
        padding: 2rem 1rem;

        .children {
          display: flex;
        }
      }
    }
  }
}
</style> -->
