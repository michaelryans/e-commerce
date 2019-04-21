const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect

const app = require('../app')
chai.use(chaiHttp)

const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')


before(function() {
    Product.deleteMany({}, () => {
        console.log('successfully deleted all product data')
    })
    User.deleteMany({}, () => { 
        console.log('successfully deleted all user data') 
    })
    Cart.deleteMany({}, () => {
        console.log('successfully deleted all cart list')
    })
})

let token; 
let product_id;
describe('Add Item to cart', function() {
    describe('User register + login', function () {
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
                // expect(err).to.be.null
                expect(res.body).to.be.an('object')
                // expect(res.body).to.have.property('_id', '__v','email','password','name','address', 'cart')
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


        describe('register-product', function() {
            it('should return registered product', function(done) {
                let product_register = {
                    name:"barang tes",
                    price: 50000,
                    stock: 5
                }
                chai.request(app)
                .post('/products')
                .set('token', token)
                .send(product_register)
                .end((err,res) => {
                    
                    product_id = res.body._id
                    // console.log(res.body)
                    // console.log('-----created product')
                    // console.log(product_id)
                    // console.log('----- product id')
                    expect(err).to.be.null
                    // expect(res.body).to.be.an('object')
                    expect(res).to.have.status(201)
                    
                    done()
                })
                
            })


            it('should return with user with cart', function (done) {
                let form_belanja = {
                    product: product_id,
                    quantity: 3,
                    // user: objectId from req decoded
                }

                chai.request(app)
                .post('/cart')
                .set('token', token)
                .send(form_belanja)
                .set('token', token)
                .end((err,res) => {
                    // console.log(product_id)
                    // console.log("nanannananan")
                    // console.log('----- product id')
                    // console.log(token)
                    // console.log('-----------token')
                    
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('product')
                    expect(res.body).to.have.property('quantity')
                    done()
                })
            })

            it('should return with user specific item', function(done) {
                chai.request(app)
                .get('/cart')
                .set('token',token)
                .end((err,res) => {
                    expect(err).to.be.null
                    expect(res.body).to.be.an('array')
                    // console.log(res.body)
                    // console.log('findallbyuser cart')
                    done()
                })
            })

            it('should return with message successfully deleted item from cart', function(done) {
                chai.request(app)
                .delete('/cart/' + product_id)
                .set('token', token)
                .end((err,res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.message).to.equal('successfully deleted item from cart')
                    done()
                })
            })

            it('should return with error message, item quantity must be greater than 0', function(done) {
                let negative_quantity = {
                    product: product_id,
                    quantity: -1,
                    // user: objectId from req decoded
                }
                chai.request(app)
                .post('/cart')
                .send(negative_quantity)
                .set('token',token)
                .end((err,res) => {
                    expect(err).to.be.null
                    expect(res.body.message).to.equal('error adding item to cart')
                    expect(res.body.error.errors.quantity.message).to.equal('quantity must be greater than 0')
                    done()
                })
            })
        })
    })
})
