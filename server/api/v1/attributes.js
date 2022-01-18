import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
// import { preSave } from '~/server/controllers/attributes'
import { protect, authorize } from '~/server/controllers/auth'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc, createSlug } from '~/server/controllers/factory'
import Attribute from '~/server/models/attribute'

const router = express.Router()

router.route('/').get(getAllDocs(Attribute))
router.route('/:id').get(getDoc(Attribute))

router.use(protect)
router.use(authorize('admin', 'shop-manager'))

router.route('/').post(createSlug, protect, authorize('admin', 'shop-manager'), createDoc(Attribute))
router.route('/:id').patch(createSlug, protect, authorize('admin', 'shop-manager'), updateDoc(Attribute))
router.route('/:id').delete(protect, authorize('admin', 'shop-manager'), deleteDoc(Attribute))

router.use(errorHandler)

export default router
