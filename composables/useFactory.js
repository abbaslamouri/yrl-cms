import axios from 'axios'
// import { useError } from '~/pinia/useError'
// const appError = useError()

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
        // appError.setSnackbar(true, state.errorMsg)
        // console.log('ERROR', error)S
      } else {
        state.items = data.value
      }
    },

    async fetchItemById(id) {
      state.errorMsg = ''
      try {
        const response = await http.get(`v1/${collection}/${id}`)
        // console.log(response)
        return response.data
      } catch (err) {
        console.log('MyERROR', err)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        // appError.setSnackbar(true, state.errorMsg)
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
        // appError.setSnackbar(true, state.errorMsg)
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
          console.log('HERE', response.data)
        }
        // appError.setSnackbar(true, 'Changes saved successfully', 'Success')
        return response.data
        // state.selectedItem = {}
      } catch (err) {
        console.error('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        // appError.setSnackbar(true, state.errorMsg)
      }
    },

    async savePayload(payload) {
      state.errorMsg = ''
      try {
        const response = await http.post(`v1/${collection}/`, payload)
        // appError.setSnackbar(true, 'Changes saved successfully', 'Success')
        return response.data
      } catch (err) {
        console.error('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        // appError.setSnackbar(true, state.errorMsg)
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
        // console.log(response)
        // state.items.push(response.data)
        // }
        // return response.data
        // state.selectedItem = {}
      } catch (err) {
        console.error('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        // appError.setSnackbar(true, state.errorMsg)
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
            // console.log(response)
          } catch (err) {
            console.error('MyERROR', err)
            state.errorMsg = err.response.data.message || err.response.data.statusMessage
            // appError.setSnackbar(true, state.errorMsg)
          }
        })
      )
    },

    async deleteItem() {
      state.errorMsg = ''
      try {
        const response = await http.delete(`v1/${collection}/${state.selectedItem._id}`)
        // console.log(response)
        const index = state.items.findIndex((el) => el._id == state.selectedItem._id)
        // console.log(index)
        if (index !== -1) state.items.splice(index, 1)
      } catch (err) {
        console.log('MyERROR', err.response)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        // appError.setSnackbar(true, state.errorMsg)
      }
    },

    async deleteMany(payload) {
      state.errorMsg = ''
      // await Promise.all(
      // state.selectedItems.map(async (item) => {
      try {
        const response = await http.post(`v1/${collection}/delete-many`, payload)
        // console.log(response)
        // let index = state.items.findIndex((el) => el._id == item._id)
        // if (index !== -1) state.items.splice(index, 1)
        // index = state.selectedItems.findIndex((el) => el._id == item._id)
        // if (index !== -1) state.selectedItems.splice(index, 1)
      } catch (err) {
        console.log('MyERROR', err)
        state.errorMsg = err.response.data.message || err.response.data.statusMessage
        // appError.setSnackbar(true, state.errorMsg)
      }
      // })
      // )
      // console.log('DONE')
    },

    async searchDb(keyword) {
      // console.log(keyword)
      state.errorMsg = ''
      const { data, error } = await useFetch(`/v1/${collection}/search`, {
        baseURL: state.baseURL,
        method: 'get',
        params: { keyword: keyword },
      })
      // console.log('DATA', data.value)
      if (error.value) {
        state.errorMsg = 'Error while fetching docs count'
        // appError.setSnackbar(true, state.errorMsg)
        // console.log('ERROR', error)
      } else {
        state.selectedItems = data.value
      }
    },

    async deleteItems() {
      state.errorMsg = ''
      // console.log('state.selectedItems', [...state.selectedItems])

      await Promise.all(
        state.selectedItems.map(async (item) => {
          try {
            const response = await http.delete(`v1/${collection}/${item._id}`)
            // console.log(response)
            let index = state.items.findIndex((el) => el._id == item._id)
            if (index !== -1) state.items.splice(index, 1)
            index = state.selectedItems.findIndex((el) => el._id == item._id)
            if (index !== -1) state.selectedItems.splice(index, 1)
          } catch (err) {
            console.log('MyERROR', err)
            state.errorMsg = err.response.data.message || err.response.data.statusMessage
            // appError.setSnackbar(true, state.errorMsg)
          }
        })
      )
      // console.log('DONE')
    },
  }

  const fetchAll = async (params) => {
    state.errorMsg = ''
    const { data, error } = await useFetch(`/v1/${collection}/`, {
      baseURL: state.baseURL,
      method: 'get',
      params,
      lazy: true,
    })
    if (error.value) {
      state.errorMsg = 'Error while fetching docs'
      // appError.setSnackbar(true, state.errorMsg)
      return false
    } else {
      state.items = data.value
      return data.value
    }
  }

  const fetchCount = async (params) => {
    state.errorMsg = ''
    const { data, error } = await useFetch(`/v1/${collection}/count`, {
      baseURL: state.baseURL,
      method: 'get',
      params: params,
    })
    if (error.value) {
      state.errorMsg = 'Error while fetching docs count'
      // appError.setSnackbar(true, state.errorMsg)
      return false
    } else {
      state.totalItemCount = data.value
      return data.value
    }
  }

  const fetchBySlug = async (slug, params) => {
    state.errorMsg = ''
    const { data, error } = await useFetch(`/v1/${collection}/`, {
      baseURL: state.baseURL,
      method: 'get',
      params: { ...params, slug },
      lazy: true,
    })
    if (error.value) {
      state.errorMsg = 'Error while fetching docs'
      // appError.setSnackbar(true, state.errorMsg)
      return false
    } else {
      state.selectedItem = data.value[0]
      return data.value
    }
  }

  const deleteById = async (id) => {
    state.errorMsg = ''
    try {
      await http.delete(`v1/${collection}/${id}`)
      const index = state.items.findIndex((el) => el._id == id)
      if (index !== -1) state.items.splice(index, 1)
      return true
    } catch (err) {
      console.log('MyERROR', err.response)
      state.errorMsg = err.response.data.message || err.response.data.statusMessage
      // appError.setSnackbar(true, state.errorMsg)
      return false
    }
  }

  return { state, actions, fetchAll, fetchCount, deleteById, fetchBySlug }
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
