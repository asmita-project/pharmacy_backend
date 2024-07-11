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
    const { name} = req.body;

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ error: 'stock is required must be a string integer.' });
    }

    next();
};



router.post('/',validateRequest,tokenverify,(req, res) => {
    const { medicine,stock,balance,qty } = req.body
   
    db.query('INSERT INTO stock(medicine,stock,qty,balance)VALUES(?,?,?,?)',[medicine,stock,qty,balance], function (err, result) {
        if (err) {
            console.error(err)
            res.status(400).json({ message: 'Server Problem' })
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
    db.query('SELECT subcategory.id AS subcateid,subcategory.name AS subcateroryname,category.name AS category,subcategory.category AS cateid,company.name AS companyname,company.id AS companyid,composition.name AS comp_name,composition.id AS comp_id,units.name,units.id FROM subcategory JOIN category ON subcategory.category = category.id JOIN company ON company.subcategory = subcategory.id JOIN composition ON composition.company = company.id JOIN units ON units.composition = composition.id',function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            if (result.length>=0) {
                const DataList=[]
                for (let i of result) {
                   let data = {
                       id:i.id,
                       name:i.name,
                       category:{
                           id:i.cateid,
                           name:i.category
                       },
                       subcategory:{
                           id:i.subcateid,
                           name:i.subcateroryname
                       },
                       company:{
                        id:i.companyid,
                        name:i.companyname
                    },
                    composition:{
                        id:i.comp_id,
                        name:i.comp_name
                       
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
    db.query('update stock set medicine=?,stock=?,balance=?,qty=? where id=?',[medicine,stock,balance,qty,id],function(err,result){
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

