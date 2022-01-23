import express from 'express';
import errorHandler from '~/server/utils/errorHandler';
import { protect, authorize } from '~/server/controllers/auth';
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory';
import VariantGroup from '~/server/models/variantgroup';

const router = express.Router();

router.route('/').get(getAllDocs(VariantGroup));
router.route('/:id').get(getDoc(VariantGroup));

router.use(protect);
router.use(authorize('admin', 'shop-manager'));

router.route('/').post(createDoc(VariantGroup));
router.route('/:id').patch(updateDoc(VariantGroup));
router.route('/:id').delete(deleteDoc(VariantGroup));

router.use(errorHandler);

export default router;
