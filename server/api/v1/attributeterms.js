import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
// import { preSave } from '~/server/controllers/attributes'
import { protect, authorize } from '~/server/controllers/auth'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc, createSlug } from '~/server/controllers/factory'
import AttributeTerm from '~/server/models/attributeterm'

const router = express.Router()

router.route('/').get(getAllDocs(AttributeTerm))
router.route('/:id').get(getDoc(AttributeTerm))

router.use(protect)
router.use(authorize('admin', 'shop-manager'))

router.route('/').post(protect, authorize('admin', 'shop-manager'), createDoc(AttributeTerm))
router.route('/:id').patch(protect, authorize('admin', 'shop-manager'), updateDoc(AttributeTerm))
router.route('/:id').delete(protect, authorize('admin', 'shop-manager'), deleteDoc(AttributeTerm))

router.use(errorHandler)

export default router
