import axios from 'axios'
import { useError } from '~/pinia/useError'
const appError = useError()
const baseURL = `http://localhost:3000/api`
const http = axios.create({
  baseURL,
})

const useHttp = (collection) => {
  const state = reactive({
    baseURL: `http://localhost:3000/api`,
    errorMsg: '',
  })

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
      appError.setSnackbar(true, state.errorMsg)
      return null
    } else {
      return data.value
    }
  }

  const fetchCount = async (params) => {
    state.errorMsg = ''
    const { data, error } = await useFetch(`/v1/${collection}/count`, {
      baseURL: state.baseURL,
      method: 'get',
      params,
    })
    if (error.value) {
      state.errorMsg = 'Error while fetching docs count'
      appError.setSnackbar(true, state.errorMsg)
      return null
    } else {
      return data.value
    }
  }

  const deleteItem = async () => {
    state.errorMsg = ''
    try {
      await http.delete(`v1/${collection}/${state.selectedItem._id}`)
      return true
    } catch (err) {
      console.log('MyERROR', err.response)
      state.errorMsg = err.response.data.message || err.response.data.statusMessage
      appError.setSnackbar(true, state.errorMsg)
      return false
    }
  }

  return { state, fetchAll, fetchCount, deleteItem }
}

export default useHttp
