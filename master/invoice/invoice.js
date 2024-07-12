const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../../database/db')
const tokenverify = require('../../tokenverify/tokenverify')

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
    const { medicine,stock,balance } = req.body
   
    db.query('INSERT INTO stock(medicine,stock)VALUES(?,?,?)',[medicine,stock], function (err, result) {
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
})


router.get('/',function(req,res){
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id FROM stock JOIN medicine ON stock.medicine = medicine.id',function(err,result){
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
    const {id}=req.body
    db.query('select * from stock where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result[0])
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
    const {id, medicine,stock,balance,qty } = req.body
    db.query('update stock set medicine=?,stock=? where id=?',[medicine,stock,id],function(err,result){
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

