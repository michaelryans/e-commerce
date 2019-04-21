const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const {jwtVerify, jwtSign} = require('../helpers/jwt')

//import app
var app = require('../app.js')
chai.use(chaiHttp)

//HOOKS
const User = require('../models/user')
before(function() {
    User.deleteMany({}, () => {
        console.log('successfully deleted all data')
    })
})

let token;

describe('User', function () {
    describe('register-user', function () {
        it('should return created account', function (done) {
            let obj_test = {
                email:"michael@yahoo.com",
                password:"hahaha",
                name: "michael",
                address: "bandung",
                cart: [],
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

        it('enter invalid email - return status 500 and error object', function (done) {
            let obj_email_invalid = {email:"michaelyahoooooo", password:"yehehe"}
            
            chai.request(app)
            .post('/users/register')
            .send(obj_email_invalid)
            .end((err,res) => {
                // console.log('error invalid email')
                // console.log(err)
                //expect(err.message).to.equal('invalid email address')
                expect(res.body).to.be.an('object')
                expect(res).to.have.status(500)
            })
            done()
        })

    })

    describe('login-testing', function () {
        it('should return jwt token', function (done) {
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
                done()
            })
        })

        it('should return login fail - wrong credentials', function (done) {
            chai.request(app)
            .post('/users/login')
            .send({
                email:"mic123hael@yahoo.com1",
                password:"hahaha"
            })
            .end((err,res) => {
                // console.log(err)
                // console.log('error login email')
                //expect(err.message).to.equal('wrong email/password')
                expect(res).to.be.an('object')
                expect(res).to.have.status(401)
                done()
            })
        })
    })


    // describe('add-to-cart', function() {
    //     it('should return successfully add to cart', function() {

    //         chai.request(app)
    //         .patch('/users/cart' + )
            

    //     })
    // })
})


