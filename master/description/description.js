const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../../database/db')
const tokenverify = require('../../tokenverify/tokenverify');
const { route } = require('./description');

app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({ extended: true }));

const secretKey = 'pharmacy_key';



// Utility function to check if a value is a non-empty string
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim() !== '';
};



// Middleware to validate incoming data
const validateRequest = (req, res, next) => {
    const { name, age } = req.body

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ error: 'name is required must be a string integer.' });
    }
    if (!isNonEmptyString(age)) {
        return res.status(400).json({ error: 'age is required must be a string integer.' });
    }

    next();
};



router.post('/', validateRequest, tokenverify, (req, res) => {
    const { name,description,doctor,age,phone,weight } = req.body
    const date = new Date()
    db.query('INSERT INTO doctor_description(name,doctor,age,phone,weight,date)VALUES(?,?,?,?,?,?)', [name,doctor,age,phone,weight,date],function(error,result1){
        if (error) {
            throw error
        }
        else{
            const id = result1.insertId
            description.map((item)=>{
                db.query('INSERT INTO description(category,medicine,take,description,date)VALUES(?,?,?,?,?)', [item.category,item.medicine,item.take,id,date], function (err, result) {
                    if (err) {
                        console.error(err.errno)
                        res.status(400).json({ message: err.sqlMessage })
                    }
                    else {
                        res.status(200).json({ message: 'doctor_description added' })
            
                        // res.send(JSON.parse(result))
                    }
            
            
                })
            
            })
        }
    })
   
  
})


router.get('/', function (req, res) {
    db.query('SELECT doctor.name AS doctor_name,doctor.hospital,doctor.phone AS doctor_phone,doctor.address AS doctor_address,doctor_description.name,doctor_description.date,doctor_description.age,doctor_description.phone,doctor_description.weight,doctor_description.id,doctor.id AS doctor_id FROM doctor_description JOIN doctor ON doctor.id = doctor_description.doctor', function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            if (result.length >= 0) {
                const DataList = []
                for (let i of result) {
                    let data = {
                        id: i.id,
                        age:i.age,
                        phone:i.phone,
                        weight:i.weight,
                        name: i.name,
                        date: i.date,

                        doctor: {
                            id: i.doctor_id,
                            address: i.doctor_address,
                            phone: i.doctor_phone,
                            doctor: i.doctor_name

                        }
                    }
                    DataList.push(data)
                }
                res.status(200).send(DataList)

            }
            else {
                res.status(200).send(result)
            }
        }
    })
})

router.get('/:id', function (req, res) {
    const { id } = req.params
    db.query('SELECT doctor.name AS doctor_name,doctor.hospital,doctor.phone AS doctor_phone,doctor.address AS doctor_address,doctor_description.name,doctor_description.date,doctor_description.id,doctor_description.description,doctor.id AS doctor_id FROM doctor_description JOIN doctor ON doctor.id = doctor_description.doctor WHERE doctor_description.doctor=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }

        else {
            if (result.length >= 0) {
                const DataList = []
                for (let i of result) {
                    let data = {
                        id: i.id,
                        description: i.description,
                        name: i.name,
                        date: i.date,

                        doctor: {
                            id: i.doctor_id,
                            address: i.doctor_address,
                            phone: i.doctor_phone,
                            doctor: i.doctor_name

                        }
                    }
                    DataList.push(data)
                  
                }
                res.status(200).send(DataList)
                
            }
            else {
                res.status(200).send(result)
            }
        }

    })
})

router.delete('/delete/:id', function (req, res) {
    const { id } = req.params
    db.query('delete from doctor_description where id=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            res.status(200).json({ message: id + ' ' + 'is Deleted' })
        }
    })
})
router.delete('/single/delete/:id',function (req, res) {
    const { id } = req.params
    db.query('delete from description where id=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            res.status(200).json({ message: id + ' ' + 'is Deleted' })
        }
    })
})
router.post('/single',function(req,res){
    const {category,medicine,take,id}= req.body
    db.query('INSERT INTO description(category,medicine,take,description)VALUES(?,?,?,?)', [category,medicine,take,id],function(err,result){
        if (err) {
            throw err
        }
        else{
            res.status(200).json({ message:'inserted' }) 
        }
    })
})
router.get('/single/:description',function(req,res){
    const {description}=req.params
    db.query('SELECT * FROM `description` WHERE description=?',[description],function(err,result){
        if (err) {
            throw err
        }
        else{
            res.status(200).send(result)   
        }
    })
})
router.get('/description_details/:id',function(req,res){
    const {id}=req.params
    db.query('SELECT * FROM `description` WHERE description=? GROUP BY date',[id],function(err,result){
        if (err) {
            throw err
        }
        else{
            res.status(200).send(result)   
        }
    })
})
router.post('/update', function (req, res) {
    const { id,age,weight,name,phone,orders} = req.body
    const date = new Date()
    orders.map((item)=>{
        db.query('INSERT INTO description(category,medicine,take,description,date)VALUES(?,?,?,?,?)', [item.category,item.medicine,item.take,id,date], function (err, result) {
            if (err) {
                console.error(err.errno)
                res.status(400).json({ message: err.sqlMessage })
            }
            else {
                db.query('update doctor_description set name=?,age=?,phone=?,weight=? where id=?', [name,age,phone,weight,id], function (err, result) {
                    if (err) {
                        res.status(400).json({ message: 'server problem' })
                    }
                    else {
                        
                        res.status(200).json({ message: 'updated' })
                    }
                })
            }
    
    
        })
    
    })
   
})

router.post('/Des/update', function (req, res) {
    const {orders,id} = req.body
    orders.map((item)=>{
        db.query('update description set category=?,medicine=?,take=? where description=?',[item.category,item.medicine,item.take,id], function (err, result) {
            if (err) {
                res.status(400).json({ message: 'server problem' })
            }
            else {
                  res.status(200).json({message:'updated done'})
            }
        })
    })
    
})
module.exports = router
// Check if user already exists

