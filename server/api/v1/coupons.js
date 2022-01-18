import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
// import { saveCart } from '~/server/controllers/cart'
import { protect, authorize } from '~/server/controllers/auth'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory'
import Coupon from '~/server/models/coupon'

const router = express.Router()

router.route('/').get(getAllDocs(Coupon))
router.route('/:id').get(getDoc(Coupon))
// router.route('/slug/:slug').get(fetchBySlug)

router.use(protect)
router.use(authorize('admin', 'shop-manager'))

router.route('/').post(createDoc(Coupon))
router.route('/:id').patch(updateDoc(Coupon))
router.route('/:id').delete(deleteDoc(Coupon))

router.use(errorHandler)

export default router
