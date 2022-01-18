import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
import { preSave } from '~/server/controllers/subCategories'
// import { protect, authorize } from '~/server/controllers/auth'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory'
import SubCategory from '~/server/models/subCategory'

const router = express.Router()

router.route('/').get(getAllDocs(SubCategory))
router.route('/:id').get(getDoc(SubCategory))

// router.use(protect)
// router.use(authorize('admin', 'shop-manager'))

router.route('/').post(preSave, createDoc(SubCategory))
router.route('/:id').patch(preSave, updateDoc(SubCategory))
router.route('/:id').delete(deleteDoc(SubCategory))

router.use(errorHandler)

export default router
