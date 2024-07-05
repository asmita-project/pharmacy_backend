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
    const { name,category,subcategory,composition,company,unit,price,manufacturing,expire} = req.body;

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ error: 'composition is required must be a string.' });
    }
    if (!isPositiveInteger(category)) {
        return res.status(400).json({ error: 'category is required must be a positive integer.' });
    }
    if (!isPositiveInteger(subcategory)) {
        return res.status(400).json({ error: 'subcategory is required must be a positive integer.' });
    }
    if (!isPositiveInteger(composition)) {
        return res.status(400).json({ error: 'composition is required must be a positive integer.' });
    }
    if (!isPositiveInteger(company)) {
        return res.status(400).json({ error: 'company is required must be a positive integer.' });
    }
    if (!isPositiveInteger(unit)) {
        return res.status(400).json({ error: 'unit is required must be a positive integer.' });
    }
    if (!isNonEmptyString(price)) {
        return res.status(400).json({ error: 'price is required must be a positive integer.' });
    }
    if (!isValidDate(manufacturing)) {
        return res.status(400).json({ error: 'manufacuring date is required must be date format.' });
    }
    if (!isValidDate(expire)) {
        return res.status(400).json({ error: 'expiry date is required must be date format.' });
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


router.get('/',tokenverify,function(req,res){
    db.query('select * from medicine',function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result)
        }
    })
})
router.get('/:id',tokenverify,function(req,res){
    const {id}=req.body
    db.query('select * from medicine where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json(result[0])
        }
    })
})

router.get('/delete/:id',tokenverify,function(req,res){
    const {id}=req.body
    db.query('delete from medicine where id=?',[id],function(err,result){
        if (err) {
            res.status(400).json({ message: 'server problem'})
        }
        else{
            res.status(200).json({message:id+''+'is Deleted'})
        }
    })
})

router.get('/update',tokenverify,function(req,res){
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
module.exports = router
// Check if user already exists

