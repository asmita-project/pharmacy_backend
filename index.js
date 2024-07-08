const express = require('express')
const app = express()
const PORT = 4000
const admin = require('./admin/admin')
const bodyParsor = require('body-parser')
const cors = require('cors')
const login = require('./login/login')
const pharmacy = require('./pharmacy/pharmacy')
const doctor = require('./doctor/doctor')
const category = require('./master/category/category')
const subcategory = require('./master/subcategory/subcategory')
const company = require('./master/company/company')
const composition = require('./master/composition/composition')
const units = require('./master/units/unit')
const medicine = require('./master/medicine/medicine')
app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({ extended: true }));
app.use(cors())
app.use('/admin',admin)
app.use('/login',login)
app.use('/pharmacy',pharmacy)
app.use('/category',category)
app.use('/subcategory',subcategory)
app.use('/company',company)
app.use('/composition',composition)
app.use('/units',units)
app.use('/doctor',doctor)
app.use('/medicine',medicine)
app.use('/profile', express.static('upload/images'));


app.listen(PORT,()=>{
   console.log('App Running on',PORT)
})