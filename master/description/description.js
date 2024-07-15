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
    const { name, description } = req.body

    if (!isNonEmptyString(name)) {
        return res.status(400).json({ error: 'name is required must be a string integer.' });
    }
    if (!isNonEmptyString(description)) {
        return res.status(400).json({ error: 'description is required must be a string integer.' });
    }

    next();
};



router.post('/', validateRequest, tokenverify, (req, res) => {
    const { name, description, doctor } = req.body
    const date = new Date()
    db.query('INSERT INTO doctor_description(name,description,doctor,date)VALUES(?,?,?,?)', [name, description, doctor, date], function (err, result) {
        if (err) {
            console.error(err.errno)
            res.status(400).json({ message: err.sqlMessage })
        }
        else {
            const id = result.insertId;
            console.log(result)
            db.query('select * from doctor_description where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'doctor_description not found' })
                }
                else {
                    res.status(200).json(result2[0])
                }
            })

            // res.send(JSON.parse(result))
        }


    })
})


router.get('/', function (req, res) {
    db.query('SELECT doctor.name AS doctor_name,doctor.hospital,doctor.phone AS doctor_phone,doctor.address AS doctor_address,doctor_description.name,doctor_description.date,doctor_description.id,doctor_description.description,doctor.id AS doctor_id FROM doctor_description JOIN doctor ON doctor.id = doctor_description.doctor', function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            if (result.length >= 0) {
                const DataList = []
                for (let i of result) {
                    let data = {
                        id: i.id,
                        description: i.description,
                        name: i.name,
                        date: i.date,

                        doctor: {
                            id: i.doctor_id,
                            address: i.doctor_address,
                            phone: i.doctor_phone,
                            doctor: i.doctor_name

                        }
                    }
                    DataList.push(data)
                }
                res.status(200).send(DataList)

            }
            else {
                res.status(200).send(result)
            }
        }
    })
})

router.get('/:id', function (req, res) {
    const { id } = req.params
    db.query('SELECT doctor.name AS doctor_name,doctor.hospital,doctor.phone AS doctor_phone,doctor.address AS doctor_address,doctor_description.name,doctor_description.date,doctor_description.id,doctor_description.description,doctor.id AS doctor_id FROM doctor_description JOIN doctor ON doctor.id = doctor_description.doctor WHERE doctor_description.doctor=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }

        else {
            if (result.length >= 0) {
                const DataList = []
                for (let i of result) {
                    let data = {
                        id: i.id,
                        description: i.description,
                        name: i.name,
                        date: i.date,

                        doctor: {
                            id: i.doctor_id,
                            address: i.doctor_address,
                            phone: i.doctor_phone,
                            doctor: i.doctor_name

                        }
                    }
                    DataList.push(data)
                  
                }
                res.status(200).send(DataList)
                
            }
            else {
                res.status(200).send(result)
            }
        }

    })
})

router.delete('/delete/:id', function (req, res) {
    const { id } = req.params
    db.query('delete from doctor_description where id=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            res.status(200).json({ message: id + ' ' + 'is Deleted' })
        }
    })
})

router.post('/update', function (req, res) {
    const { id, description, name } = req.body
    db.query('update doctor_description set name=?,description=? where id=?', [name, description, id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            db.query('select * from doctor_description where id=?', [id], function (err, result2) {
                if (err) {
                    console.error(err)
                    res.status(400).json({ message: 'doctor_description not found' })
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

