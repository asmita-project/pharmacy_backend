const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../../database/db')
const multer = require("multer");
const path = require("path");
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
        return res.status(400).json({ error: 'subcategory is required must be a string.' });
    }

    next();
};

const storage = multer.diskStorage({
    destination: './upload/subcategory',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage
    // limits: {
    //     fileSize: 10
    // }
})

router.post('/',upload.single('subcategory'),validateRequest,tokenverify,(req, res) => {
    const { name,category } = req.body
    const file = req.file;
    if (!file) {
        return res.send('No file uploaded.');
      }
    db.query('INSERT INTO subcategory(name,category,photo)VALUES(?,?,?)',[name,category,file.filename], function (err, result) {
        if (err) {
            console.error(err)
            res.json({ message: 'Server Problem' })
        }
        else {
            const id = result.insertId;
            console.log(result)
            db.query('select * from subcategory where id=?', [id], function (err, result2) {
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
    db.query('SELECT subcategory.id,subcategory.photo,subcategory.name,category.name AS category,subcategory.category AS cateid FROM subcategory JOIN category ON subcategory.category = category.id',function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result)
        }
    })
})
router.get('/categoryby/:id',function(req,res){
    const {id}=req.params
    db.query('SELECT * FROM `subcategory` WHERE category=?',[id],function(err,result){
        if (err) {
            res.status(400).send({ message: 'server problem'})
        }
        else{
            for(let i of result){
                db.query('select * from category where id=?',[i.category],function(err2,result2){
                    if (err2) {
                        res.status(400).send({ message: 'server problem'})
                    }
                    else{
                        const isEmpty = (obj) => {
                            return Object.keys(obj).length === 0;
                          };
                        if (isEmpty(result2)) {
                            res.status(200).send({ message: 'empty'})
                        }
                        else{
                            const Datalist =[]
                            for (let i of result) {
                                let data ={
                                    id:i.id,
                                    name:i.name,
                                    categoryid:i.category,
                                    photo:i.photo,
                                    category:{
                                        id:result2[0].id,
                                        name:result2[0].name,
                                        photo:result2[0].photo
                                    }
    
                                }
                                Datalist.push(data)
                            }
                            
                            res.status(200).send(Datalist)
                           
                        }
                        
                    }
                })
            }
            
        }
    })
})

router.get('/:id',function(req,res){
    const {id}=req.body
    db.query('select * from subcategory where id=?',[id],function(err,result){
        if (err) {
            res.json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result[0])
           
        }
    })
})

router.delete('/delete/:id',function(req,res){
    const {id}=req.params
    db.query('delete from subcategory where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+' '+'is Deleted'})
        }
    })
})

router.post('/update',function(req,res){
    const {id,name,category}=req.body
    db.query('update subcategory set name=?,category=? where id=?',[name,category,id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+''+'is Deleted'})
        }
    })
})
router.post('/upload',upload.single('subcategory'), (req, res) => {
    const {id}=req.body
    const file = req.file;

    if (!file) {
        res.status(400).json({ message: 'file not selected'})
    }
    db.query('update subcategory set photo=? where id=?',[file.filename,id],function(er,result){
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

