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
        return res.status(400).json({ error: 'unit is required must be a string integer.' });
    }

    next();
};



router.post('/',validateRequest,tokenverify,(req, res) => {
    const { name,category,subcategory,company,composition } = req.body
   
    db.query('INSERT INTO units(name,category,subcategory,company,composition)VALUES(?,?,?,?,?)',[name,category,subcategory,company,composition], function (err, result) {
        if (err) {
            console.error(err)
            res.status(400).json({ message: 'Server Problem' })
        }
        else {
            const id = result.insertId;
            console.log(result)
            db.query('select * from units where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'units not found' })
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
    db.query('select * from units',function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).send(result)
        }
    })
})
router.get('/compositionby/:id',function(req,res){
    const {id}=req.params
    db.query('SELECT units.name,units.id,composition.id AS comp_id,composition.name AS comp_name from units JOIN composition ON composition.id = units.id WHERE units.composition = ?',[id],function(err,result){
        if (err) {
            res.status(400).send({ message: 'server problem'})
        }
        else{
            if (result.length>=0) {
                const DataList =[]
                for (let i of result) {
                    let data = {
                        id:i.id,
                        name:i.name,
                        unit:{
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
    db.query('select * from units where id=?',[id],function(err,result){
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
    db.query('delete from units where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+''+'is Deleted'})
        }
    })
})

router.post('/update',function(req,res){
    const {id,name}=req.body
    db.query('update units set name=? where id=?',[name,id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+''+'is Deleted'})
        }
    })
})
module.exports = router
// Check if user already exists

