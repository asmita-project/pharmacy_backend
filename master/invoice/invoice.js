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
    const { stock } = req.body

    if (!isNonEmptyString(stock)) {
        return res.status(400).send({ error: 'stock is required must be a string integer.' });
    }

    next();
};



router.post('/', tokenverify, (req, res) => {

    const { grandtotal,customer, orders } = req.body

    db.query('INSERT INTO order_table(grand_total,customer)VALUES(?,?)', [grandtotal,customer], async function (err, result1) {
        if (err) {
            res.status(400).json({ message: err.sqlMessage })
        }
        else {
            const orderid = result1.insertId
            orders.map((item) => {
                db.query('INSERT INTO suborder(medicine,qty,medicine_price,total,category,order_id,phamacy_id,subcategory,medicine_name)VALUES(?,?,?,?,?,?,?,?,?)', [item.medicine, item.qty, item.medicine_price, item.total, item.category, orderid, item.pharmacy,item.subcategory,item.medicine_name], async function (err, result) {
                    if (err) {
                        console.log(err)
                        res.end()
                        // res.status(400).send({ message: err })
                    }
                    else {
                        const id = result.insertId;
                        console.log("item",item)
                        stockdata(item)
                        db.query('select suborder.medicine,suborder.qty,suborder.medicine_price,suborder.total,suborder.category,suborder.phamacy_id,order_table.grand_total from suborder JOIN order_table ON suborder.order_id=order_table.id WHERE suborder.order_id=?', [orderid], function (er, resultO) {
                            if (er) {
                                console.log(er)
                                 res.status(400).send({message:er.sqlMessage})
                              
                                
                            }
                            else {
                                res.end()
                                // console.log(result)
                                // res.status(200).send(resultO)
                            }
                        })
                        



                    }


                })
            })
            //  res.status(200).json(req.body)



        }
    })

})

const ordernew = (orderid, Values) => {

}
const stockdata =  (Values) => {
    db.query('SELECT stock.id AS stock_id,stock.stock,stock.balance,suborder.qty,suborder.medicine AS medicine_id ,suborder.phamacy_id FROM stock JOIN suborder ON suborder.medicine = stock.medicine WHERE suborder.medicine IN(?) AND suborder.phamacy_id IN(?)', [Values.medicine,Values.pharmacy],function (err, result2) {
        if (err) {
            console.log('err',err)
        }
        else {
           result2.map((item) => {
                console.log(item.stock_id, " item.stock_id")
                db.query('update stock set balance=? where id=?', [item.stock-item.qty,item.stock_id], function (err, result3) {
                    if (err) {
                        console.log(err)
                       
                        
                        // throw err
                    }
                    else {
                       
                        console.log("data stock updated", result3)
                    }
                })
            })

        }
    })
}
router.get('/order',function(req,res){
    db.query('select * from order_table',function(err,result){
        if (err) {
            throw err
        }
        else{
            res.status(200).send(result)
        }
    })
})
router.get('/', function (req, res) {
    db.query('SELECT suborder.id,suborder.medicine,suborder.qty,suborder.medicine_price,suborder.total,suborder.category,suborder.subcategory,suborder.phamacy_id,order_table.grand_total,order_table.id AS grand_id FROM suborder JOIN order_table ON suborder.order_id = order_table.id', function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            if (result.length >= 0) {
                 
                const DataList = []
                 for(let i of result){
                    let data ={
                        orders:{
                            id:i.id,
                            medicine_name:i.medicine_name,
                            category:i.category,
                            subcategory:i.subcategory,
                            price:i.medicine_price,
                            qty:i.qty,
                            pharmacy:i.phamacy_id,
                            total:i.total
                        },
                        id:i.grand_id,
                        grandtotal:i.grand_total
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
    const { id } = req.body
    db.query('select * from stock where id=?', [id], function (err, result) {
        if (err) {
            res.status(400).json({ message: 'server problem' })
        }
        else {
            res.status(200).json(result[0])
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
    const { id, medicine, stock, balance, qty } = req.body
    db.query('update stock set medicine=?,stock=? where id=?', [medicine, stock, id], function (err, result) {
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
})
module.exports = router
// Check if user already exists

