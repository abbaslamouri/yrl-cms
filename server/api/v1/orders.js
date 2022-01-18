import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory'
import { createOrder } from '~/server/controllers/orders'
import Order from '~/server/models/order'

const router = express.Router()

// router.route('/').get(getAllDocs(Product))
// router.route('/:id').get(getDoc(Product))
// router.route('/upload').post(uploadProducts)
// router.route('/delete').delete(deleteProducts)

router.route('/').post(createOrder)
// router.route('/logout').get(logout)
// router.route('/forgotpassword').post(forgotPassword)
// router.route('/resetpassword/:resetToken').patch(resetPassword)
// router.route('/me').get(protect, getMe)
// router.route('/updateme').patch(protect, uploadUserAvatar, resizeAvatar, updateMe)
// router.route('/updatemypassword').patch(protect, updateMyPassword)

router.use(errorHandler)

export default router
