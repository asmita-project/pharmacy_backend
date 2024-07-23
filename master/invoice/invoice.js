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
     const date = new Date()
    db.query('INSERT INTO order_table(grand_total,customer,date)VALUES(?,?,?)', [grandtotal,customer,date], async function (err, result1) {
        if (err) {
            res.status(400).json({ message: err.sqlMessage })
        }
        else {
            const orderid = result1.insertId
            orders.map((item) => {
                db.query('INSERT INTO suborder(medicine,qty,medicine_price,total,category,order_id,phamacy_id,subcategory,medicine_name,batch)VALUES(?,?,?,?,?,?,?,?,?,?)', [item.medicine, item.qty, item.medicine_price, item.total, item.category, orderid, item.pharmacy,item.subcategory,item.medicine_name,item.batch], async function (err, result) {
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
    db.query('SELECT stock.id AS stock_id,stock.stock,stock.balance,suborder.qty,suborder.medicine AS medicine_id ,suborder.phamacy_id FROM stock JOIN suborder ON suborder.medicine = stock.medicine WHERE suborder.medicine IN(?) AND suborder.phamacy_id IN(?) AND suborder.batch IN(?)', [Values.medicine,Values.pharmacy,Values.batch],function (err, result2) {
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
router.get('/order/:orderid', function (req, res) {
    const {orderid}=req.params

    db.query('select * from order_table where id=?',[orderid],function(er,result1){
        if (er) {
            throw er
        }
        else{
          
            if (result1.length>0) {
                db.query('SELECT suborder.id AS item_id, suborder.medicine_name,suborder.subcategory,suborder.medicine_price,suborder.total,suborder.category,suborder.order_id,suborder.qty,pharmacy.name AS pharmacy_name,pharmacy.address,pharmacy.phone,pharmacy.email FROM suborder JOIN pharmacy ON pharmacy.id=suborder.phamacy_id JOIN order_table ON order_table.id = suborder.order_id WHERE suborder.order_id=?',[orderid],function(err2,result2){
                    if (err2) {
                        res.status(400).send(err2)
                        // throw err2
                    }
                    else{
                        const Datalist=[]
                        const Datalist2=[]
                        const DataList = result2.map((i,ind)=>{
                            return {
                                id:i.item_id,
                                medicine:i.medicine_name,
                                category:i.category,
                                subcategory:i.subcategory,
                                price:i.medicine_price,
                                qty:i.qty,
                                total:i.total,
                                pharmacy:i.pharmacy_name,
                                pharmacy_email:i.email,
                                pharmacy_phone:i.phone,
                                pharmacy_address:i.address  
                             }
                        })
                        
                        for (let i of result1) {
                            let newListData = {
                                id:i.id,
                                grandtotal:i.grand_total,
                                customer:i.customer,
                                date:i.date,
                                orders:DataList
                              }
                              Datalist2.push(newListData)
                             
                        }
                        res.status(200).send(Datalist2)
                     
                     
                    }
                })
            }
            else{
                res.status(200).send(result1)
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

