import express from 'express';
import errorHandler from '~/server/utils/errorHandler';
// import { preSave } from '~/server/controllers/attributes'
import { protect, authorize } from '~/server/controllers/auth';
import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory';
import AttributeTerm from '~/server/models/attributeterm';

const router = express.Router();

router.route('/').get(getAllDocs(AttributeTerm));
router.route('/:id').get(getDoc(AttributeTerm));

// router.use(protect)
// router.use(authorize('admin', 'shop-manager'))

router.route('/').post(createDoc(AttributeTerm));
router.route('/:id').patch(updateDoc(AttributeTerm));
router.route('/:id').delete(deleteDoc(AttributeTerm));

router.use(errorHandler);

export default router;
