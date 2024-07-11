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

router.post('/',upload.single('medicine'),validateRequest,tokenverify,(req, res) => {
    const { name,category,subcategory,composition,company,unit,price,manufacturing,expire} = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
      }
    db.query('INSERT INTO medicine(name,category,subcategory,company,composition,unit,price,manufacturing,expiry,photo)VALUES(?,?,?,?,?,?,?,?,?,?)',[name,category,subcategory,company,composition,unit,price,manufacturing,expire,file.filename], function (err, result) {
        if (err) {
            console.error(err)
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
    db.query('SELECT subcategory.id AS subcateid,subcategory.name AS subcateroryname,category.name AS category,subcategory.category AS cateid,company.name AS companyname,company.id AS companyid,composition.name AS comp_name,composition.id AS comp_id,units.name AS unit_name,units.id AS unit_id,medicine.id,medicine.name,medicine.photo,medicine.price,medicine.expiry,medicine.Manufacturing FROM subcategory JOIN category ON subcategory.category = category.id JOIN company ON company.subcategory = subcategory.id JOIN composition ON composition.company = company.id JOIN units ON units.composition = composition.id JOIN medicine ON units.id = medicine.unit',function(err,result){
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
                       manufacturing:i.Manufacturing,
                       expire:i.expiry,
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
                       
                    }  ,
                    unit:{
                        id:i.unit_id,
                        name:i.unit_name
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
    db.query('select * from medicine where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result[0])
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

