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
    return (typeof value === 'string' || typeof value === 'number') && value.trim() !== '';
};

const isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
  };
  const isValidDate = (value) => {
    return !isNaN(Date.parse(value));
  };
// Middleware to validate incoming data
const validateRequest = (req, res, next) => {
    const { name} = req.body;

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ error: 'medicine is required must be a string.' });
    }
    next();
};

const storage = multer.diskStorage({
    destination: './upload/medicine',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage
    // limits: {
    //     fileSize: 10
    // }
})

router.post('/',tokenverify,upload.single('medicine'),(req, res) => {
    const { name,category,subcategory,composition,company,unit,price} = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
      }
    db.query('INSERT INTO medicine(name,category,subcategory,company,composition,unit,price,photo)VALUES(?,?,?,?,?,?,?,?)',[name,category,subcategory,company,composition,unit,price,file.filename], function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({ message: 'Server Problem' })
        }
        else {
            const id = result.insertId;
            console.log(result)
            db.query('select * from medicine where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'composition not found' })
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
    db.query('SELECT medicine.id, subcategory.id AS subcateid,subcategory.name AS subcateroryname,category.name AS category,subcategory.category AS cateid,medicine.name,medicine.photo,medicine.price,medicine.composition,medicine.company,medicine.unit FROM subcategory JOIN category ON subcategory.category = category.id JOIN medicine ON subcategory.id = medicine.subcategory',function(err,result){
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
                       price:i.price,
                       photo:i.photo,
                       composition:i.composition,
                       company:i.company,
                       unit:i.unit,
                       category:{
                           id:i.cateid,
                           name:i.category
                       },
                       subcategory:{
                           id:i.subcateid,
                           name:i.subcateroryname
                       },
                            
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
router.get('/categoryby/:id',function(req,res){
    const {id} = req.params
    db.query('SELECT * FROM medicine WHERE category=?',[id],function(err,result){
        if (err) {
            res.status(400).send({message:'sql error'})
        }
        else{
            res.status(200).send(result)
        }
    })
})
router.get('/:id',function(req,res){
    const {id}=req.params
    db.query('SELECT subcategory.id AS subcateid,subcategory.name AS subcateroryname,category.name AS category,subcategory.category AS cateid,medicine.id,medicine.name,medicine.photo,medicine.price,medicine.composition,medicine.company,medicine.unit FROM subcategory JOIN category ON subcategory.category = category.id JOIN medicine ON subcategory.id = medicine.subcategory where medicine.id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
           
            let data = {
                id:result[0].id,
                name:result[0].name,
                price:result[0].price,
                photo:result[0].photo,
                manufacturing:result[0].Manufacturing,
                expire:result[0].expiry,
                composition:result[0].composition,
                company:result[0].company,
                unit:result[0].unit,
                category:{
                    id:result[0].cateid,
                    name:result[0].category
                },
                subcategory:{
                    id:result[0].subcateid,
                    name:result[0].subcateroryname
                },
                         
         }
         res.status(200).json(data)
        }
    })
})

router.delete('/delete/:id',tokenverify,function(req,res){
    const {id}=req.params
    db.query('delete from medicine where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+''+'is Deleted'})
        }
    })
})

router.post('/update',tokenverify,function(req,res){
    const {id, name,category,subcategory,composition,company,unit,price,manufacturing,expire} = req.body;

    db.query('update medicine set name=?,category=?,subcategory=?,company=?,composition=?,unit=?,price=?,manufacturing=?,expiry=? where id=?',[name,category,subcategory,company,composition,unit,price,manufacturing,expire,id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+''+'is Deleted'})
        }
    })
})

router.post('/upload',upload.single('medicine'), (req, res) => {
    const {id}=req.body
    const file = req.file;

    if (!file) {
        res.status(400).json({ message: 'file not selected'})
    }
    db.query('update medicine set photo=? where id=?',[file.filename,id],function(er,result){
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

