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
    errorMsg: '',
  })

  const fetchAll = async (params, pick) => {
    state.errorMsg = ''
    const { data, error } = await useFetch(`/v1/${collection}/`, {
      baseURL: state.baseURL,
      method: 'get',
      params,
      pick,
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

  return { state, fetchAll }
}

export default useFactory
