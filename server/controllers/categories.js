import slugify from 'slugify'
import ApiFeatures from '~/server/utils/ApiFeatures'

import asyncHandler from '~/server/utils/asyncHandler'

import Category from '~/server/models/category'

const preSave = asyncHandler(async (req, res, next) => {
  // console.log('RBS', req.body)
  req.body.slug = slugify(req.body.name, { lower: true })
  // req.body.path = `/${req.body.slug}`
  next()
})

// const fetchAll = asyncHandler(async (req, res, next) => {
//   // return next(new AppError(`We can't find a document with ID`, 404))
//   const features = new ApiFeatures(Category.find(), req.query).filter().search().sort().fields().paginate()
//   const docs = await features.query
//   res.status(200).json({
//     status: 'succes',
//     results: docs.length,
//     docs,
//   })
// })

// const deleteDoc = () =>
//   asyncHandler(async (req, res, next) => {
//     const doc = await Category.findByIdAndDelete(req.params.id)
//     if (!doc) return next(new AppError(`We can't find a document with ID = ${req.params.id}`, 404))
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     })
//   })

const fetchBySlug = asyncHandler(async (req, res, next) => {
  console.log('RP', req.params.slug)
  let query = Category.find({ slug: req.params.slug })
  // if (populateOptions) query.populate(populateOptions)
  const doc = await query
  if (!doc) return next(new AppError(`We can't find a document with slug = ${req.params.slug}`, 404))
  res.status(200).json({
    status: 'succes',
    doc,
  })
})

export { preSave, fetchBySlug }
