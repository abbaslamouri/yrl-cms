import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
import { preSave, fetchBySlug } from '~/server/controllers/categories'
// import { protect, authorize } from '~/server/controllers/auth'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory'
import Category from '~/server/models/category'

const router = express.Router()

router.route('/').get(getAllDocs(Category))
router.route('/:id').get(getDoc(Category))
router.route('/slug/:slug').get(fetchBySlug)

// router.use(protect)
// router.use(authorize('admin', 'shop-manager'))

router.route('/').post(preSave, createDoc(Category))
router.route('/:id').patch(preSave, updateDoc(Category))
router.route('/:id').delete(deleteDoc(Category))

router.use(errorHandler)

export default router
