import axios from 'axios'
import { useError } from '~/pinia/useError'
const appError = useError()

const baseURL = `http://localhost:3000/api`

const http = axios.create({
  baseURL,
})

const useFactory = (collection) => {
  const state = reactive({
    baseURL: `http://localhost:3000/api`,
    items: [],
    totalItemCount: null,
    selectedItem: {},
    selectedItems: [],
    sort: {
      field: null,
      order: null,
    },
    query: {
      keyword: null,
      fields: null, // Comma separated values like "originalname, path"
      page: 1,
      limit: null,
      populate: null,
    },
    errorMsg: '',
  })

  const actions = {
    async resetSelectedItem() {
      state.selectedItem = {
        name: 'Camera',
        description: 'wrrerewrwwre',
        price: '1289',
        category: 'camera',
        attributes: [],
        shipping: 'yes',
        countInStock: 20,
        featuredImage: null,
        gallery: [],
      }
    },

    async fetchAll() {
      // console.log('SQ', state.query)
      state.errorMsg = ''
      const { data, error } = await useFetch(`/v1/${collection}/`, {
        baseURL: state.baseURL,
        method: 'get',
        params: state.query,
        // pick: ['name', 'slug'],
        // lazy: true,
      })
      // console.log(`${collection} DATA`, data.value)
      if (error.value) {
        state.errorMsg = 'Error while fetching docs'
        appError.setSnackbar(true, state.errorMsg)
        // console.log('ERROR', error)S
      } else {
        state.items = data.value
      }
    },

    async fetchItemById(id) {
      state.errorMsg = ''
      try {
        const response = await http.get(`v1/${collection}/${id}`)
        console.log(response)
        return response.data
      } catch (err) {
        console.log('MyERROR', err)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        appError.setSnackbar(true, state.errorMsg)
      }
    },

    async fetchCount() {
      state.errorMsg = ''
      const { data, error } = await useFetch(`/v1/${collection}/count`, {
        baseURL: state.baseURL,
        method: 'get',
        params: state.query,
      })
      // console.log('DATA', data.value)
      if (error.value) {
        state.errorMsg = 'Error while fetching docs count'
        appError.setSnackbar(true, state.errorMsg)
        // console.log('ERROR', error)
      } else {
        state.totalItemCount = data.value
      }
    },

    async saveItem() {
      state.errorMsg = ''

      try {
        let response = {}
        if (state.selectedItem._id) {
          response = await http.patch(`v1/${collection}/${state.selectedItem._id}`, state.selectedItem)
          const index = state.items.findIndex((el) => el._id == response.data._id)
          if (index != -1) state.items.splice(index, 1, response.data)
        } else {
          response = await http.post(`v1/${collection}/`, state.selectedItem)
          state.items.push(response.data)
        }
        appError.setSnackbar(true, 'Changes saved successfully', 'Success')
        return response.data
        // state.selectedItem = {}
      } catch (err) {
        console.error('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        appError.setSnackbar(true, state.errorMsg)
      }
    },

    async saveMany() {
      state.errorMsg = ''
      // await Promise.all(
      // state.selectedItems.map(async (item) => {
      try {
        // let response = {}
        // if (item._id) {
        //   response = await http.patch(`v1/${collection}/${item._id}`, item)
        // const index = state.items.findIndex((el) => el._id == response.data._id)
        // if (index != -1) state.items.splice(index, 1, response.data)
        // } else {
        const response = await http.post(`v1/${collection}/`, state.selectedItems)
        console.log(response)
        // state.items.push(response.data)
        // }
        // return response.data
        // state.selectedItem = {}
      } catch (err) {
        console.error('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        appError.setSnackbar(true, state.errorMsg)
      }
      // })
      // )
    },

    async updateItems(payload) {
      state.errorMsg = ''
      await Promise.all(
        state.selectedItems.map(async (item) => {
          try {
            const response = await http.patch(`v1/${collection}/${item._id}`, payload)
            console.log(response)
          } catch (err) {
            console.error('MyERROR', err)
            state.errorMsg = err.response.data.message || err.response.data.statusMessage
            appError.setSnackbar(true, state.errorMsg)
          }
        })
      )
    },

    async deleteItem() {
      state.errorMsg = ''
      try {
        const response = await http.delete(`v1/${collection}/${state.selectedItem._id}`)
        console.log(response)
        const index = state.items.findIndex((el) => el._id == state.selectedItem._id)
        console.log(index)
        if (index !== -1) state.items.splice(index, 1)
      } catch (err) {
        console.log('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        appError.setSnackbar(true, state.errorMsg)
      }
    },

    async deleteMany(payload) {
      state.errorMsg = ''
      // await Promise.all(
      // state.selectedItems.map(async (item) => {
      try {
        const response = await http.post(`v1/${collection}/delete-many`, payload)
        console.log(response)
        // let index = state.items.findIndex((el) => el._id == item._id)
        // if (index !== -1) state.items.splice(index, 1)
        // index = state.selectedItems.findIndex((el) => el._id == item._id)
        // if (index !== -1) state.selectedItems.splice(index, 1)
      } catch (err) {
        console.log('MyERROR', err)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        appError.setSnackbar(true, state.errorMsg)
      }
      // })
      // )
      // console.log('DONE')
    },

    async searchDb(keyword) {
      console.log(keyword)
      state.errorMsg = ''
      const { data, error } = await useFetch(`/v1/${collection}/search`, {
        baseURL: state.baseURL,
        method: 'get',
        params: { keyword: keyword },
      })
      console.log('DATA', data.value)
      if (error.value) {
        state.errorMsg = 'Error while fetching docs count'
        appError.setSnackbar(true, state.errorMsg)
        // console.log('ERROR', error)
      } else {
        state.selectedItems = data.value
      }
    },

    async deleteItems() {
      state.errorMsg = ''
      console.log('state.selectedItems', [...state.selectedItems])

      await Promise.all(
        state.selectedItems.map(async (item) => {
          try {
            const response = await http.delete(`v1/${collection}/${item._id}`)
            console.log(response)
            let index = state.items.findIndex((el) => el._id == item._id)
            if (index !== -1) state.items.splice(index, 1)
            index = state.selectedItems.findIndex((el) => el._id == item._id)
            if (index !== -1) state.selectedItems.splice(index, 1)
          } catch (err) {
            console.log('MyERROR', err)
            state.errorMsg = err.response.data.message || err.response.data.statusMessage
            appError.setSnackbar(true, state.errorMsg)
          }
        })
      )
      console.log('DONE')
    },

    // async fetchAllProductsAndCategories() {
    // 	let queryStr = `?sort=${state.query.sort.order}${state.query.sort.field}`
    // 	if (state.query.slug) queryStr = `${queryStr}&slug=${state.query.slug}`
    // 	if (state.query.category) queryStr = `${queryStr}&category=${state.query.category}`
    // 	if (state.query.keyword) queryStr = `${queryStr}&keyword=${state.query.keyword}`
    // 	if (state.query.fields) queryStr = `${queryStr}&fields=${state.query.fields}`
    // 	if (state.query.page) queryStr = `${queryStr}&page=${state.query.page}`
    // 	if (state.query.limit) queryStr = `${queryStr}&limit=${state.query.limit}`
    // 	if (state.query.populate) queryStr = `${queryStr}&populate=${state.query.populate}`
    // 	state.errorMsg = ''

    // 	const [{ data: categoriesRes }, { data: productsRes }] = await Promise.all([
    // 		useFetch(`${baseURL}/v1/categories`),
    // 		useFetch(`${baseURL}/v1/products/${queryStr}`),
    // 	])
    // 	state.totalItemCount = productsRes.value.count
    // 	state.categories = categoriesRes.value.docs
    // 	state.items = productsRes.value.docs

    // 	// const { data, error } = await useFetch(`${baseURL}/v1/products/${queryStr}`)

    // 	// console.log('DATA', data.value)
    // 	// console.log('ERROR', error.value)
    // 	// if (error.value) state.errorMsg = 'Error while fetching products'
    // 	// else state.items = data.value.docs
    // },

    // async fetchBySlug(slug, filters) {
    //   state.errorMsg = ''
    //   const { data, error } = await useFetch(`/v1/${collection}/slug/${slug}`, {
    //     baseURL: state.baseURL,
    //     method: 'get',
    //     params: filters,
    //     // pick: ['name', 'slug'],
    //     lazy: true,
    //   })
    //   console.log('DATA', data.value)
    //   if (error.value) {
    //     appError.setSnackbar(true, 'Error while fetching products')
    //     // console.log('ERROR', error)S
    //   } else {
    //     state.selectedIitem = data.value
    //   }
    // },

    // async deleteFolder() {
    //   state.errorMsg = ''
    //   try {
    //     const response = await http.get(`v1/media/?folder=${state.selectedFolder._id}`)
    //     console.log(response)
    //     if (response.data.results) {
    //       state.errorMsg = 'You cannot delete a folder that contais files'
    //     } else {
    //       const response = await http.delete(`v1/folders/${state.selectedFolder._id}`)
    //       console.log(response)
    //       const index = state.folders.findIndex((f) => f._id === state.selectedFolder._id)
    //       if (index !== -1) state.folders.splice(index, 1)
    //       state.selectedFolder = ''
    //     }
    //   } catch (err) {
    //     console.log('MyERROR', err)
    //     state.errorMsg = err.response.data.message || err.response.data.statusMessage
    //   }
    // },

    // async fetchBySlug() {
    // 	let queryStr = `?sort=${state.query.sort.order}${state.query.sort.field}`
    // 	if (state.query.slug) queryStr = `${queryStr}&slug=${state.query.slug}`
    // 	if (state.query.category) queryStr = `${queryStr}&category=${state.query.category}`
    // 	if (state.query.keyword) queryStr = `${queryStr}&keyword=${state.query.keyword}`
    // 	if (state.query.fields) queryStr = `${queryStr}&fields=${state.query.fields}`
    // 	if (state.query.page) queryStr = `${queryStr}&page=${state.query.page}`
    // 	if (state.query.limit) queryStr = `${queryStr}&limit=${state.query.limit}`
    // 	if (state.query.populate) queryStr = `${queryStr}&populate=${state.query.populate}`
    // 	state.errorMsg = ''
    // 	const { data, error } = await useFetch(`${baseURL}/v1/products/${queryStr}`)
    // 	// console.log('DATA', data.value)
    // 	// console.log('ERROR', error.value)
    // 	if (error.value) state.errorMsg = 'Error while fetching products'
    // 	else state.selectedItem = data.value.docs[0]
    // },

    // async fetchRelatedProducts() {
    // 	state.errorMsg = ''
    // 	const queryStr = `?category=${state.selectedItem.category._id}&populate=featuredImage`
    // 	const { data, error } = await useFetch(`${baseURL}/v1/products/${queryStr}`)
    // 	// console.log('DATA', data.value)
    // 	// console.log('ERROR', error.value)
    // 	if (error.value) state.errorMsg = 'Error while fetching products'
    // 	else state.relatedItems = data.value.docs.filter((el) => el._id != state.selectedItem._id)
    // },

    // async setRating(newRating, userId) {
    // 	if (!userId) {
    // 		state.errorMsg = 'Please login to set a ratinnewR for this product'
    // 		return
    // 	}
    // 	console.log('RRRRRR', newRating, userId)
    // 	state.errorMsg = ''
    // 	try {
    // 		const response = await http.patch(`v1/products/rating/${state.selectedItem._id}`, { rating: newRating })
    // 		console.log(response)
    // 		// const index = state.selectedItem.ratings.findIndex((el) => el.postedBy == userId)
    // 		// console.log(index)
    // 		// if (index != -1) {
    // 		state.selectedItem = response.data.doc
    // 		// state.selectedItem.ratings.splice(index, 1, response.data.newRating)
    // 		// state.selectedItem.averageRating = response.data.averageRating
    // 		// } else {

    // 		// }
    // 	} catch (err) {
    // 		console.log('MyERROR', err.response)
    // 		state.errorMsg = err.response.data.message || err.response.data.statusMessage
    // 	}
    // 	// try {
    // 	// const { data, error } = await useAsyncData('product', () => $fetch(`${baseURL}/v1/products/?slug=${slug}`))
    // 	// console.log('DATA', data.value)
    // 	// console.log('ERROR', error.value)
    // 	// if (error.value) state.errorMsg = 'Error while fetching products'
    // 	// else state.selectedItem = data.value.docs[0]
    // 	// const response = await http.get(`v1/products/slug/${slug}`)
    // 	// console.log(response)
    // 	// state.selectedItem = response.data.doc
    // 	// } catch (err) {
    // 	//   console.log('MyERRORLog', err.response)
    // 	//   console.error('MyERRORError', err)
    // 	//   state.errorMsg = err.response.data.message || err.response.data.statusMessage
    // 	// }
    // },

    // async updateProductRating(rating, userId) {
    //   if (!userId) {
    //     state.errorMsg = 'Please login to set a rating for this product'
    //     return
    //   }
    //   console.log('RRRRRR', rating, userId)
    //   const index = state.selectedItem.ratings.findIndex((el) => el.postedBy == userId)
    //   console.log(index)
    //   if (index != -1) state.selectedItem.ratings.splice(index, 1, { rating, postedBy: userId })
    // },

    // async saveItem() {
    //   state.errorMsg = ''
    //   try {
    //     const itemToSave = { ...state.selectedItem }
    //     console.log('itemToSave', itemToSave)
    //     if (itemToSave.gallery) itemToSave.gallery = itemToSave.gallery.map((el) => el._id)
    //     if (itemToSave.featuredImage) itemToSave.featuredImage = itemToSave.featuredImage._id
    //     console.log('IIIIIIII', itemToSave)

    //     if (state.selectedItem._id) {
    //       const itemToUpdate = state.items.find((el) => el._id === state.selectedItem._id)
    //       if (!itemToUpdate) {
    //         state.errorMsg = 'We cannot find the item you are trying to update'
    //       } else {
    //         const response = await http.patch(`v1/products/${state.selectedItem._id}`, itemToSave)
    //       }
    //     } else {
    //       const response = await http.post(`v1/products/`, itemToSave)
    //       state.items.push(response.data.doc)
    //     }
    //     state.selectedItem = {
    //       name: 'Camera',
    //       description: 'wrrerewrwwre',
    //       price: '1289',
    //       category: 'camera',
    //       attributes: [],
    //       shipping: 'yes',
    //       countInStock: 20,
    //       featuredImage: null,
    //       gallery: [],
    //     }
    //   } catch (err) {
    //     console.error('MyERROR', err.response)
    //     state.errorMsg = err.response.data.message || err.response.data.statusMessage
    //   }
    // },
  }
  return { state, actions }
}

export default useFactory

// await Promise.all(
//   req.files.images.map(async (file, i) => {
//     const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//     await sharp(file.buffer)
//       .resize(2000, 1333)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`public/img/tours/${filename}`);

//     req.body.images.push(filename);
//   })
// );
