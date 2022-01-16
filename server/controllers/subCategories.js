import asyncHandler from '~/server/utils/asyncHandler'
import slugify from 'slugify'

const preSave = asyncHandler(async (req, res, next) => {
  // console.log('RBS', req.body)
  req.body.slug = slugify(req.body.name, { lower: true })
  req.body.path = `/${req.body.slug}`
  next()
})

export { preSave }
