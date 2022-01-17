import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
import { slugifyFolderName } from '~/server/controllers/folders'

import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~/server/controllers/factory'
import Folder from '~/server/models/folder'

const router = express.Router()

router.route('/').get(getAllDocs(Folder))
router.route('/').post(createDoc(Folder))
router.route('/:id').get(getDoc(Folder))
router.route('/:id').patch(slugifyFolderName, updateDoc(Folder))
router.route('/:id').delete(deleteDoc(Folder))

router.use(errorHandler)

export default router
