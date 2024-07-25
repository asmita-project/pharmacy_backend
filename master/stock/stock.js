const express = require('express')
const app = express()
const router = express.Router()
const bodyParsor = require('body-parser')
const db = require('../../database/db')
const tokenverify = require('../../tokenverify/tokenverify');

app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({ extended: true }));

const secretKey = 'pharmacy_key';



// Utility function to check if a value is a non-empty string
const isNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim() !== '';
};



// Middleware to validate incoming data
const validateRequest = (req, res, next) => {
    const { stock } = req.body

    if (!isNonEmptyString(stock)) {
        return res.status(400).json({ error: 'stock is required must be a string integer.' });
    }

    next();
};



router.post('/', validateRequest, tokenverify, (req, res) => {
    const { medicine, stock, pharmacy, batch, expire, min_stock } = req.body
    db.query('select * from stock where medicine=? And pharmacy=? And batch=?', [medicine, pharmacy, batch], function (err, result3) {
        if (err) {
            res.status(400).json({ message: 'duplicate' })
        }
        else {
            if (result3.length > 0) {
                res.status(400).json({ message: 'Duplicate entry' })
            }
            else {
                db.query('INSERT INTO stock(medicine,stock,pharmacy,batch,expire,balance,min_stock)VALUES(?,?,?,?,?,?,?)', [medicine, stock, pharmacy, batch, expire, stock, min_stock], function (err, result) {
                    if (err) {
                        console.error(err.errno)
                        res.status(400).json({ message: err.sqlMessage })
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
            }


        }
    })

})

router.get('/expire', function (req, res) {
    db.query('select * from expire_medicine', function (err, result) {
        if (err) {
            throw err
        }
        else {
            res.status(200).send(result)
        }
    })
})
router.get('/', function (req, res) {
    db.query('SELECT * FROM `stock` WHERE expire<=CURRENT_DATE', function (err1, result2) {
        if (err1) {
            throw err1
        }
        else {
            console.log(result2)
            if (result2.length > 0) {

                result2.map((item) => {
                    db.query('INSERT INTO expire_medicine(medicine,stock,pharmacy,batch,expire,balance,min_stock)VALUES(?,?,?,?,?,?,?)', [item.medicine, item.stock, item.pharmacy, item.batch, item.expire, item.balance, item.min_stock], function (err3, result3) {
                        if (err3) {
                            throw err3
                        }
                        else {
                            console.log('inserted expire medicine')
                            result2.map((entry) => {
                                db.query('delete from stock where id IN(?)', [entry.id], function (err4, result4) {
                                    if (err4) {
                                        throw err4
                                    }
                                    else {
                                        console.log('delete data ' + entry.id)
                                        db.query('SELECT stock.id,SUM(stock.stock) AS stock ,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id,SUM(stock.balance) AS balance,stock.batch,stock.expire,SUM(stock.min_stock) AS min_stock,medicine.photo FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy GROUP BY stock.medicine', function (err, result) {
                                            if (err) {
                                                throw err

                                            }
                                            else {
                                                if (result.length > 0) {
                                                    const DataList = []
                                                    for (let i of result) {
                                                        let data = {
                                                            id: i.id,
                                                            stock: i.stock,
                                                            balance: i.balance,
                                                            min_stock: i.min_stock,
                                                            batch: i.batch,
                                                            expire: i.expire,

                                                            medicine: {
                                                                id: i.medicine_id,
                                                                medicine_name: i.medicine_name,
                                                                price: i.price,
                                                                photo: i.photo
                                                            },
                                                            pharmacy: {
                                                                id: i.pharmacy_id,
                                                                name: i.pharmacy
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
                                    }
                                })
                            })

                        }
                    })

                })
            }
            else {
                db.query('SELECT stock.id,SUM(stock.stock) AS stock ,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id,SUM(stock.balance) AS balance,stock.batch,stock.expire,SUM(stock.min_stock) AS min_stock,medicine.photo FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy GROUP BY stock.medicine', function (err, result) {
                    if (err) {
                        res.status(400).json({ message: 'server problem' })
                    }
                    else {
                        if (result.length > 0) {
                            const DataList = []
                            for (let i of result) {
                                let data = {
                                    id: i.id,
                                    stock: i.stock,
                                    balance: i.balance,
                                    min_stock: i.min_stock,
                                    batch: i.batch,
                                    expire: i.expire,

                                    medicine: {
                                        id: i.medicine_id,
                                        medicine_name: i.medicine_name,
                                        price: i.price,
                                        photo: i.photo
                                    },
                                    pharmacy: {
                                        id: i.pharmacy_id,
                                        name: i.pharmacy
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
            }

        }
    })

})
router.get('/expire_medicine', function (req, res) {
    db.query('SELECT expire_medicine.id,expire_medicine.stock,expire_medicine.balance,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id,expire_medicine.balance,expire_medicine.batch,expire_medicine.expire,expire_medicine.min_stock,medicine.photo FROM expire_medicine JOIN medicine ON expire_medicine.medicine = medicine.id JOIN pharmacy ON pharmacy.id = expire_medicine.pharmacy', function (err, result) {
        if (err) {
            throw err
        }
        else {
            if (result.length > 0) {
                const DataList = []
                for (let i of result) {
                    let data = {
                        id: i.id,
                        stock: i.stock,
                        balance: i.balance,
                        min_stock: i.min_stock,
                        batch: i.batch,
                        expire: i.expire,

                        medicine: {
                            id: i.medicine_id,
                            medicine_name: i.medicine_name,
                            price: i.price,
                            photo: i.photo
                        },
                        pharmacy: {
                            id: i.pharmacy_id,
                            name: i.pharmacy
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
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id,stock.balance,stock.batch,stock.expire,stock.min_stock,medicine.photo FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy WHERE stock.pharmacy=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            if (result.length >= 0) {
                const DataList = []
                for (let i of result) {
                    let data = {
                        id: i.id,
                        stock: i.stock,
                        balance: i.balance,
                        min_stock: i.min_stock,
                        batch: i.batch,
                        expire: i.expire,

                        medicine: {
                            id: i.medicine_id,
                            medicine_name: i.medicine_name,
                            price: i.price,
                            photo: i.photo
                        },
                        pharmacy: {
                            id: i.pharmacy_id,
                            name: i.pharmacy
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
router.get('/medicine/:pharmacy/:batch/:medicine', function (req, res) {
    const { pharmacy,batch,medicine } = req.params
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.photo,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id ,subcategory.id AS subcat_id,subcategory.name AS subcate_name,medicine.composition,medicine.category,medicine.company,medicine.unit,category.name AS category_name,stock.stock,stock.balance,stock.batch FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy JOIN category ON category.id=medicine.category JOIN subcategory ON subcategory.id=medicine.subcategory  WHERE stock.pharmacy=? AND stock.batch=? AND stock.medicine=?', [pharmacy,batch,medicine], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            if (result.length >= 0) {
                let data = {
                    id: result[0].id,
                    stock: result[0].stock,
                    balance: result[0].balance,
                    batch: result[0].batch,

                    medicine: {
                        id: result[0].medicine_id,
                        medicine_name: result[0].medicine_name,
                        price: result[0].price,
                        photo: result[0].photo
                    },
                    category: {
                        id: result[0].category,
                        name: result[0].category_name,
                    },
                    subcategory: {
                        id: result[0].subcat_id,
                        name: result[0].subcate_name
                    },
                    pharmacy: {
                        id: result[0].pharmacy_id,
                        name: result[0].pharmacy
                    }
                }
                res.status(200).send(data)

            }
            else {
                res.status(200).send(result)
            }
        }
    })
})
router.get('/pharmacy/:pharmacy', function (req, res) {
    const { pharmacy } = req.params
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.photo,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id ,subcategory.id AS subcat_id,subcategory.name AS subcate_name,medicine.composition,medicine.category,medicine.company,medicine.unit,category.name AS category_name,stock.stock,stock.balance,stock.batch FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy JOIN category ON category.id=medicine.category JOIN subcategory ON subcategory.id=medicine.subcategory  WHERE stock.pharmacy=? GROUP BY stock.batch', [pharmacy], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            const DataList=[]
            if (result.length >= 0) {
                for(let i of result){
                    let data = {
                        id: i.id,
                        stock: i.stock,
                        balance: i.balance,
                        batch: i.batch,
    
                        medicine: {
                            id: i.medicine_id,
                            medicine_name: i.medicine_name,
                            price: i.price,
                            photo: i.photo
                        },
                        category: {
                            id: i.category,
                            name: i.category_name,
                        },
                        subcategory: {
                            id: i.subcat_id,
                            name: i.subcate_name
                        },
                        pharmacy: {
                            id: i.pharmacy_id,
                            name: i.pharmacy
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

router.get('/pharmacy/:pharmacy/:batch', function (req, res) {
    const { pharmacy,batch } = req.params
    db.query('SELECT stock.id,stock.stock,stock.balance,medicine.name AS medicine_name,medicine.photo,medicine.price,medicine.id AS medicine_id,pharmacy.name AS pharmacy,pharmacy.id AS pharmacy_id ,subcategory.id AS subcat_id,subcategory.name AS subcate_name,medicine.composition,medicine.category,medicine.company,medicine.unit,category.name AS category_name,stock.stock,stock.balance,stock.batch FROM stock JOIN medicine ON stock.medicine = medicine.id JOIN pharmacy ON pharmacy.id = stock.pharmacy JOIN category ON category.id=medicine.category JOIN subcategory ON subcategory.id=medicine.subcategory  WHERE stock.pharmacy=? AND stock.batch=?', [pharmacy,batch], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            const DataList=[]
            if (result.length >= 0) {
                for(let i of result){
                    let data = {
                        id: i.id,
                        stock: i.stock,
                        balance: i.balance,
                        batch: i.batch,
    
                        medicine: {
                            id: i.medicine_id,
                            medicine_name: i.medicine_name,
                            price: i.price,
                            photo: i.photo
                        },
                        category: {
                            id: i.category,
                            name: i.category_name,
                        },
                        subcategory: {
                            id: i.subcat_id,
                            name: i.subcate_name
                        },
                        pharmacy: {
                            id: i.pharmacy_id,
                            name: i.pharmacy
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
    db.query('delete from stock where id=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            res.status(200).json({ message: id + ' ' + 'is Deleted' })
        }
    })
})
router.post('/update', function (req, res) {
    const { id, medicine, stock, pharmacy, batch, balance, expire, min_stock } = req.body
    db.query('select * from stock where stock=?', [stock], function (err1, result1) {
        if (err1) {
            throw err1
        }
        else {
            if (result1.length > 0) {
                db.query('update stock set medicine=?,stock=?,pharmacy=?,balance=?,batch=?,expire=?,min_stock=? where id=?', [medicine, stock, pharmacy, balance, batch, expire, min_stock, id], function (err, result) {
                    if (err) {
                        res.status(400).json({ message: 'server problem' })
                    }
                    else {
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
            }
            else {
                db.query('update stock set medicine=?,stock=?,pharmacy=?,balance=?,batch=?,expire=?,min_stock=? where id=?', [medicine, stock, pharmacy, stock, batch, expire, min_stock, id], function (err, result) {
                    if (err) {
                        res.status(400).json({ message: 'server problem' })
                    }
                    else {
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
            }
        }
    })

})

router.get('/dashboard/count', function (req, res) {
    db.query('SELECT COUNT(id) AS totalMedicine FROM medicine', function (err, result) {
        if (err) {
            console.log("err", err)
            throw err
        }
        else {
            db.query('SELECT COUNT(id) AS totalPharmacy FROM pharmacy', function (err2, result2) {
                if (err2) {
                    throw err2
                }
                else {
                    db.query('SELECT COUNT(id) AS totalDoctor FROM doctor', function (err3, result3) {
                        if (err3) {
                            throw err3
                        }
                        else {
                           
                            db.query('SELECT COUNT(id) AS totalStock FROM stock', function (err4, result4) {
                                if (err4) {
                                    throw err4
                                }
                                else {
                                   
                                    db.query('SELECT COUNT(id) AS totalExpire FROM expire_medicine', function (err5, result5) {
                                        if (err5) {
                                            throw err5
                                        }
                                        else {
                                           
                                            db.query('SELECT COUNT(id) AS totalOrder FROM order_table', function (err6, result6) {
                                                if (err6) {
                                                    throw err6
                                                }
                                                else {
                                                   
                                                    res.status(200).send({
                                                        totalMedicine:result[0].totalMedicine,
                                                        totalPharmacy:result2[0].totalPharmacy,
                                                        totalDoctor:result3[0].totalDoctor,
                                                        totalStock:result4[0].totalStock,
                                                        totalExpire:result5[0].totalExpire,
                                                        totalOrder:result6[0].totalOrder
                
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        }
    })
})
module.exports = router
// Check if user already exists

