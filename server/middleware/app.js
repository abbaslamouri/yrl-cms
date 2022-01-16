import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import colors from 'colors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const mongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL, {})
    console.log(colors.magenta.bold(`Database connection succesfull at host: ${connect.connection.host}`))
  } catch (err) {
    console.log('Mongo DB Error', err)
    console.log('Mongo DB Error Message', err.message)
  }
}

mongoDB()

// app.post('/api/v1/auth/register', (req, res, next) => {
//   console.log('ROUTE = REGISTER')
//   next()
// })

// app.post('/api/v1/auth/login', (req, res, next) => {
//   console.log('ROUTE = LOGIN')
//   // res.json({ kkkk: req.params })
//   next()
// })

// app.post('/api/v1/auth/forgotpassword', (req, res, next) => {
//   console.log('ROUTE = FORGOT PASSWORD', req.body)
//   // res.json({ kkkk: req.params })
//   next()
// })

// app.patch('/api/v1/auth/resetpassword/:restToken', (req, res, next) => {
//   console.log('ROUTE = RESETPASSWORD')
//   console.log({ 'request parameters': req.params })
//   next()
// })

// app.patch('/api/v1/auth/updateme', (req, res, next) => {
//   console.log('ROUTE = UPDATEME')
//   // console.log({ 'request parameters': req.params })
//   next()
// })

// app.patch('/api/v1/auth/updatemypassword', (req, res, next) => {
//   console.log('ROUTE = UPDATE MY PASSWORD')
//   // console.log({ 'request parameters': req.params })
//   next()
// })

// app.get('/api/v1/users', (req, res, next) => {
//   console.log('ROUTE = USERS')
//   // res.json({ kkkk: req.params })
//   next()
// })

// app.get('/api/v1/users/:id', (req, res, next) => {
//   console.log('ROUTE = USERS with ID')
//   // req.userId = req.params
//   console.log('TOKEN=', req.params)
//   next()
// })
// app.delete('/api/v1/media', (req, res, next) => {
//   console.log('ROUTE = Media')
//   // req.userId = req.params
//   // console.log('REQUEST PARAMS=', req.params)
//   // req.query = req.query
//   next()
// })

// app.all('*', (req, res, next) => {
//   console.log('ROUTE = *', req.params)
//   console.log('TOKEN=', req.cookies)
//   console.log('================', res)
//   next()
// })

// app.use(errorHandler)

export default app

// export default (context) => {
//   console.log(context)
// }
