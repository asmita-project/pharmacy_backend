const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../../database/db')
const tokenverify = require('../../tokenverify/tokenverify');
const e = require('express');

app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({ extended: true }));

const secretKey = 'pharmacy_key';



// Utility function to check if a value is a non-empty string
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim() !== '';
};



// Middleware to validate incoming data
const validateRequest = (req, res, next) => {
    const {stock } = req.body

    if (!isNonEmptyString(stock)) {
        return res.status(400).json({ error: 'stock is required must be a string integer.' });
    }

    next();
};



router.post('/',validateRequest,tokenverify,(req, res) => {
    const { medicine,stock,pharmacy,batch,expire } = req.body
     db.query('select * from stock where medicine=? And pharmacy=? And batch=?',[medicine,pharmacy,batch],function(err,result3){
         if (err) {
            res.status(400).json({ message:'duplicate'})
         }
         else{
            if (result3.length>0) {
                res.status(400).json({ message:'Duplicate entry'})
            }
            else{
                db.query('INSERT INTO stock(medicine,stock,pharmacy,batch,expire,balance,min_stock)VALUES(?,?,?,?,?,?,?)',[medicine,stock,pharmacy,batch,expire,stock,10], function (err, result) {
                    if (err) {
                        console.error(err.errno)
                        res.status(400).json({ message:err.sqlMessage})
                    }
                    else {
                        const id = result.insertId;
                        console.log(result)
                        db.query('select * from stock where id=?', [id], function (err, result2) {
                            if (err) {
                                console.error(err)
                                res.status(400).json({ message: 'stock not found' })
                            }
                            else {
                                res.status(200).json(result2[0])
                            }
                        })
            
                        // res.send(JSON.parse(result))
                    }
            
            
                })
            }
           
           
         }
     })
  
})


router.get('/',function(req,res){
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id,stock.balance,stock.batch,stock.expire,stock.min_stock,medicine.photo FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy',function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            if (result.length>0) {
                const DataList=[]
                for (let i of result) {
                   let data = {
                       id:i.id,
                       stock:i.stock,
                       balance:i.balance,
                       min_stock:i.min_stock,
                       batch:i.batch,
                       expire:i.expire,
                      
                    medicine:{
                        id:i.medicine_id,
                        medicine_name:i.medicine_name,
                        price:i.price,
                        photo:i.photo
                    },
                    pharmacy:{
                        id:i.pharmacy_id,
                        name:i.pharmacy
                    }            
                }
                DataList.push(data)
               }
               res.status(200).send(DataList)
           
           }
           else{
               res.status(200).send(result)
           }
        }
    })
})

router.get('/:id',function(req,res){
    const {id}=req.params
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy WHERE stock.pharmacy = ?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            if (result.length>=0) {
                const DataList=[]
                for (let i of result) {
                   let data = {
                       id:i.id,
                       stock:i.stock,
                       balance:i.balance,
                      
                    medicine:{
                        id:i.medicine_id,
                        medicine_name:i.medicine_name,
                        price:i.price
                    },
                    pharmacy:{
                        id:i.pharmacy_id,
                        name:i.pharmacy
                    }            
                }
                DataList.push(data)
               }
               res.status(200).send(DataList)
           
           }
           else{
               res.status(200).send(result)
           }
        }
    })
})

router.delete('/delete/:id',function(req,res){
    const {id}=req.params
    db.query('delete from stock where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+' '+'is Deleted'})
        }
    })
})

router.post('/update',function(req,res){
    const {id, medicine,stock,pharmacy,batch,balance,expire } = req.body
    db.query('update stock set medicine=?,stock=?,pharmacy=?,balance=?,batch=?,expire=? where id=?',[medicine,stock,pharmacy,balance,batch,expire,id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            db.query('select * from stock where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'stock not found' })
                }
                else {
                    res.status(200).json(result2[0])
                }
            })
        }
    })
})
module.exports = router
// Check if user already exists

