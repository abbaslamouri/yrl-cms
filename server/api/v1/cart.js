import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
import { saveCart } from '~/server/controllers/cart'
import { protect, authorize } from '~/server/controllers/auth'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory'
import Cart from '~/server/models/cart'

const router = express.Router()

router.route('/').get(getAllDocs(Cart))
router.route('/:id').get(getDoc(Cart))
// router.route('/slug/:slug').get(fetchBySlug)

// router.use(protect)
// router.use(authorize('admin', 'shop-manager'))

router.route('/').post(saveCart)
router.route('/:id').patch(updateDoc(Cart))
router.route('/:id').delete(deleteDoc(Cart))

router.use(errorHandler)

export default router
