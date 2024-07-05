const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const bcrypt = require('bcryptjs');
const db = require('../database/db')
const multer = require("multer");
const path = require("path");
app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({ extended: true }));
const secretKey = 'pharmacy_key';



// Utility function to check if a value is a non-empty string
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim() !== '';
};



// Middleware to validate incoming data
const validateRequest = (req, res, next) => {
    const { name, email, phone, role, password } = req.body;

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ error: 'Name is required must be a positive integer.' });
    }

    if (!isNonEmptyString(phone)) {
        return res.status(400).json({ error: 'Phone is required and must be a positive integer.' });
    }
    if (!isNonEmptyString(role)) {
        return res.status(400).json({ error: 'role is required and must be a positive integer.' });
    }
    if (!isNonEmptyString(password)) {
        return res.status(400).json({ error: 'password is required and must be a positive integer.' });
    }
    if (!isNonEmptyString(email)) {
        return res.status(400).json({ error: 'Email is required and must be a non-empty string.' });
    }

    next();
};

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage
    // limits: {
    //     fileSize: 10
    // }
})

router.post('/',upload.single('profile'),validateRequest,(req, res) => {
    const { name, email, phone, role, password } = req.body
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
      }
    db.query('INSERT INTO admin(name,email,phone,role,photo)VALUES(?,?,?,?,?)',[name, email, phone, role,file.filename], function (err, result) {
        if (err) {
            console.error(err)
            res.status(400).json({ message: 'Server Problem' })
        }
        else {
            const id = result.insertId
            loginfun(email, password, role, id)
            console.log(result)
            db.query('select * from admin where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'User already exists' })
                }
                else {
                    res.status(200).json(result2[0])
                }
            })

            // res.send(JSON.parse(result))
        }


    })
})
const loginfun = async (username, password, role, id) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO login(username,password,role,register)VALUES(?,?,?,?)', [username, hashedPassword, role, id], function (err, result) {
        if (err) {
            console.log('error login')
        }
        else {
            console.log('status ok')
        }
    })
}

module.exports = router
// Check if user already exists

