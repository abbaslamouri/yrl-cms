import express from 'express'
import errorHandler from '~/server/utils/errorHandler'
import { imageUpload, otherFileUpload, resizeImage } from '~/server/controllers/media'

import { getAllDocs, getDoc, getDocsCount, deleteMedia, updateDoc, createMedia } from '~/server/controllers/factory'
import Media from '~/server/models/media'

const router = express.Router()

router.route('/').get(getAllDocs(Media))
router.route('/count').get(getDocsCount(Media))
router.route('/:id').get(getDoc(Media))

router.route('/:id').patch(updateDoc(Media))
router.route('/:id').delete(deleteMedia(Media))
router.route('/image').post(imageUpload, resizeImage, createMedia(Media))
router.route('/').post(otherFileUpload, createMedia(Media))

router.use(errorHandler)

export default router
