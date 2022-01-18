import express from 'express';
import errorHandler from '~/server/utils/errorHandler';
import { uploadProducts, deleteProducts, preSave, setRating, fetchBySlug } from '~/server/controllers/products';
import { protect, authorize } from '~/server/controllers/auth';
import {
  getAllDocs,
  getDoc,
  deleteManyDocs,
  createDoc,
  deleteDoc,
  updateDoc,
  getDocsCount,
  searchDb,
} from '~/server/controllers/factory';

import Product from '~/server/models/product';

const router = express.Router();

router.route('/').get(getAllDocs(Product));
router.route('/count').get(getDocsCount(Product));
router.route('/search').get(searchDb(Product));
router.route('/:id').get(getDoc(Product));
router.route('/slug/:slug').get(fetchBySlug);

router.use(protect);
router.use(authorize('admin', 'shop-manager'));

router.route('/').post(preSave, createDoc(Product));
router.route('/:id').patch(preSave, updateDoc(Product));
// router.route('/delete-many').post(deleteManyDocs(Product))

router.route('/upload').post(uploadProducts);
router.route('/:id').delete(deleteDoc(Product));
router.route('/rating/:id').patch(setRating);

// router.route('/login').post(login)
// router.route('/logout').get(logout)
// router.route('/forgotpassword').post(forgotPassword)
// router.route('/resetpassword/:resetToken').patch(resetPassword)
// router.route('/me').get(protect, getMe)
// router.route('/updateme').patch(protect, uploadUserAvatar, resizeAvatar, updateMe)
// router.route('/updatemypassword').patch(protect, updateMyPassword)

router.use(errorHandler);

export default router;
