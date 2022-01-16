// import slugify from 'slugify'
// import ApiFeatures from '~/server/utils/ApiFeatures'

import asyncHandler from '~/server/utils/asyncHandler'
import Product from '~/server/models/product'
import Variant from '~/server/models/variant'
import Cart from '../models/cart'

const saveCart = asyncHandler(async (req, res, next) => {
  console.log(req.body)

  // Create new items with the stored product prices
  const newItems = []
  await Promise.all(
    req.body.items.map(async (item) => {
      const product = await Product.findById(item.product)
      if (item.variant) product.variant = await Variant.findById(item.variant)
      const newItem = { ...item }
      newItem.price = item.variant ? product.variant.price : product.price
      newItems.push(newItem)
    })
  )
  req.body.items = newItems

  // Find existing carts by current user and delete
  const cart = await Cart.find({ customer: { email: req.body.email } })
  if (cart) await Cart.deleteMany({ customer: req.body.customer })

  // Save new cart
  const doc = await Cart.create(req.body)
  if (!doc) return next(new AppError(`We are not able to create a new document`, 404))
  res.status(201).json(doc)
})

export { saveCart }
