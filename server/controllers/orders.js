import asyncHandler from '~/server/utils/asyncHandler'
import AppError from '~/server/utils/AppError'
import Order from '~/server/models/order'
import User from '~/server/models/user'
// import { getAllDocs, getDoc, createDoc, deleteDoc, updateDoc } from '~~/server/controllers/factory'

const createOrder = asyncHandler(async (req, res, next) => {
	// console.log('RB', req.body)
	let customer = {}
	if (!req.body.customer._id) {
		const found = await User.find({ email: req.body.customer.email })
		if (found) {
			const foundObj = found[0]
			if (foundObj.role === 'user') foundObj.role = 'customer'
			customer = await User.findByIdAndUpdate(foundObj._id, foundObj)
			console.log('RB1', customer)
		} else {
			customer = await User.create({
				name: req.body.customer.name,
				email: req.body.customer.email,
				shippinAddress: { ...req.body.customer.shippinAddress },
				role: 'customer',
				password: 'wqewqeqwre1234kkjxvcjkxj99AQ@#ll',
				confirmPassword: 'wqewqeqwre1234kkjxvcjkxj99AQ@#ll',
			})
			if (!customer) return next(new AppError(`We are not able to create customer for this order`, 404))
		}
		req.body.customer._id = customer._id
	}

	const order = await Order.create({
		user: req.body.customer._id,
		items: req.body.items,
		paymentMethod: req.body.paymentMethod,
		subTotal: req.body.subTotal,
		shipping: req.body.shipping,
		taxes: req.body.taxes,
		total: req.body.total,
	})

	if (!order) return next(new AppError(`We are not able to create this order`, 404))
	res.status(201).json({
		status: 'success',
		order,
	})
})

export { createOrder }
