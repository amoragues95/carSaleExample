const app = require('../app');
const request = require('supertest');
const {assert} = require('chai');
const db = require('../models/index');


beforeEach(() => {
    db.sequelize.truncate({ cascade: true })
});

describe("GET /users", () => {
    it("check status 200", done => {
        request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    })

    it("check theres only one user", done => {
        request(app)
        .post('/user')
        .send({
            "email": "ales@gmail.com",
            "password": "asdasd",
            "firstName": "al",
            "lastName": "moras"
        })
        .set('Accept', 'application/json')
        .then(user => {
            request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert.lengthOf(res.body, 1);
                return done();
            })
        }).catch(err => done());
    })

});

describe("POST /user", () => {
    it("check status 201", done => {
        request(app)
        .post('/user')
        .send({
            "email": "ales@gmail.com",
            "password": "asdasd",
            "firstName": "al",
            "lastName": "moras"
        })
        .set('Accept', 'application/json')
        .expect(201)
        .end(done);
    })
});

