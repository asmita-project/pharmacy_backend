const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../../database/db')
const multer = require("multer");
const path = require("path");
const fs = require('fs');
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
        return res.status(400).json({ error: 'category is required must be a positive integer.' });
    }

    next();
};

const storage = multer.diskStorage({
    destination: './upload/category',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage
    // limits: {
    //     fileSize: 10
    // }
})

router.post('/',upload.single('category'),validateRequest,tokenverify,(req, res) => {
    const { name } = req.body
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
      }
    db.query('INSERT INTO category(name,photo)VALUES(?,?)',[name,file.filename], function (err, result) {
        if (err) {
            console.error(err)
            res.status(400).json({ message: 'Server Problem' })
        }
        else {
            const id = result.insertId;
            console.log(result)
            db.query('select * from category where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'categoty not found' })
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
    db.query('select * from category',function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result)
        }
    })
})
router.get('/:id',function(req,res){
    const {id}=req.body
    db.query('select * from category where id=?',[id],function(err,result){
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
    db.query('delete from category where id=?',[id],function(err,result){
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
    db.query('update category set name=? where id=?',[name,id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            db.query('select * from category where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'categoty not found' })
                }
                else {
                    res.status(200).json(result[0])
                }
            })
        }
    })
})

router.post('/upload',upload.single('category'), (req, res) => {
    const {id}=req.body
    const file = req.file;

    if (!file) {
        res.status(400).json({ message: 'file not selected'})
    }
    db.query('update category set photo=? where id=?',[file.filename,id],function(er,result){
        if (er) {
            res.json({ message: 'server problem'})
        }
        else{
            res.status(200).json({ message:'updated'})
        }
    })
  
    // Check if a record for the current file exists
  
  });
module.exports = router
// Check if user already exists

