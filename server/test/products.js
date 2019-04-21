const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require("../app")
chai.use(chaiHttp)

const User = require('../models/user')
const Product = require('../models/product')
const {jwtVerify, jwtSign} = require('../helpers/jwt')

before(function() {
    Product.deleteMany({}, () => {
        console.log('successfully deleted all data')
    })
})
let token;
let product_id;
let base_product = {
    name:"barang tes",
    price: 50000,
    stock: 5,
    user:"5cb459205774862c69126ebd"
}

describe('Product', function() {
    describe('register and login to get token', function() {
        it('should return created user', function(done) {
            let obj_test = {
                email:"michael@yahoo.com",
                password:"hahaha",
                name: "michael",
                address: "bandung",
            }

            chai.request(app)
             .post('/users/register')
             .send(obj_test)
             .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('object')
                // expect(res.body).to.have.keys('_id', '__v','email','password','name','address', 'cart')
                done();
            })
        })


        it('should return token - user login', function(done) {
            let obj_login = {
                email:"michael@yahoo.com",
                password:"hahaha",
            }
            chai.request(app)
            .post('/users/login')
            .send(obj_login)
            .end((err, res) => {
                // console.log(res.body)
                // console.log('res body login testing')
                expect(err).to.equal(null)
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.token).to.be.a('String')
                token = res.body.token
                // console.log(token)
                done()
            })
        })
    })


    describe('register-product', function() {
        it('should return registered product', function(done) {
            let product_register = base_product
            chai.request(app)
            .post('/products')
            .set('token',token)
            .send(product_register)
            .end((err,res) => {
                expect(err).to.be.null
                expect(res.body).to.be.an('object')
                expect(res).to.have.status(201)
                product_id = res.body._id
                done()
            })
            
        })

        it('should return with product data (obj) - findOne based on Id', function(done) {
            chai.request(app)
            .get('/products/' + product_id)
            .end((err,res) => {
                console.log(res.body)
                console.log("should return product data================")
                expect(err).to.be.null
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res).to.have.status(200)
                done()
            })
            
        })

        // test for input price - not number --> containts string
        // test for quantity - not negative
        it('should return invalid price product - enter negative price', function(done) {
            let product_negative_price = {
                name:"barang tes",
                price: 50000,
                stock: 5,
                user:"5cb459205774862c69126ebd"
            }
            product_negative_price.price = -50000

            chai.request(app)
             .post('/products')
             .set('token',token)
             .send(product_negative_price)
             .end((err,res)=> {
                //  console.log(res.body)
                 expect(res).to.have.status(500)
                 expect(res.body.message).to.equal('error register product')
                 expect(res.body.errors.price.message).to.equal('cannot input negative price')
                 done()
             })
        })
        
        it('should return invalid stock - enter negative stock', function(done) {
            let negative_stock = base_product
            negative_stock.stock = -5
            console.log(negative_stock)

            chai.request(app)
             .post('/products')
             .set('token',token)
             .send(negative_stock)
             .end((err,res) => {
                // console.log(res.body)
                expect(res).to.have.status(500)
                expect(res.body.message).to.equal("error register product")
                expect(res.body.errors.stock.message).to.equal('cannot input negative stock')
                done()
             })
        })

        it('should return invalid stock - enter string to price', function(done) {
            let string_price = {
                name:"barang tes",
                price: 50000,
                stock: 5,
                user:"5cb459205774862c69126ebd"
            }
            string_price.price = '2k2j3is'

            chai.request(app)
             .post('/products')
             .set('token',token)
             .send(string_price)
             .end((err,res) => {
                //  console.log(res.body)
                expect(res).to.have.status(500)
                expect(res.body.message).to.equal("error register product")
                // expect(res.body.errors.price.message).to.equal('must input number to price')
                done()
             })
        })

        it('should return invalid stock - enter string to stock', function(done) {
            let string_stock = base_product
            string_stock.stock = '2k2j3is'

            chai.request(app)
             .post('/products')
             .set('token',token)
             .send(string_stock)
             .end((err,res) => {
                //  console.log(res.body)
                expect(res).to.have.status(500)
                expect(res.body.message).to.equal("error register product")
                // expect(res.body.errors.stock.message).to.equal('must input number to stock')
                done()
             })
        })

        

        it('should return with failed to delete -- input:invalid product id', function (done) {
            chai.request(app)
            .delete('/products/2k342hk3j4')
            .set('token',token)
            .end((err,res)=> {
                expect(err).to.be.null
                expect(res).to.have.status(403)
                console.log(res.body)
                console.log("----------")
                // expect(res.body.errors)
                done()
            })
        })

        it('should return with message successfully delete - delete products', function (done) {
            console.log('product id delete')
            console.log(product_id)
            chai.request(app)
            .delete('/products/' + product_id)
            .set('token',token)
            .end((err,res) => {
                // console.log(res.body)
                // console.log('deleted---')
                expect(err).to.be.null
                // expect(res.body.message).to.equal('successfully deleted the product')
                // expect(res.body).to.be.null
                // console.log(res)
                expect(res).to.have.status(200)
                done()
            })
        })

        // null input for delete product
        it('should return with failed to delete product - null param input', function (done) {
            chai.request(app)
            .delete('/products/' + '')
            .set('token',token)
            .end((err,res) => {
                console.log(res.body)
                console.log('---null input')
                expect(err).to.be.null
                expect(res).to.have.status(404)
                done()
            })
        })


        //null input for adding product
        //null input for patching product data



        //login



    })
})



