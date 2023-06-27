const request = require('supertest');
const app = require('../app');
const seed = require("../db/seeds/seed");
const testData = require('../db/data/test-data');
const db = require("../db/connection")
const data = require("../endpoints.json")

beforeEach(() => {
    return seed(testData);
});

afterAll(() => {
    return db.end();
});

describe("GET /api/topics", () => {
    test("200: should respond with 200 status code", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
    })
    test("200: should respond with an array", () => {
        return request(app)
        .get('/api/topics')
        .then(({body}) => {
            expect(body.topics).toBeInstanceOf(Array)
        })
    })
    test("200: each topic should have a slug and a description", () => {
        return request(app)
        .get('/api/topics')
        .then(({body}) => {
            body.topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
                expect(body.topics.length).toBe(3);
            })
        })
    })
})

describe("404 not found test", () => {
    test("404: should return status code '404 Not Found'", () => {
        return request(app)
        .get('/api/bananas')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not found');
        })
    })
})


describe("GET /api", () => {
    test("200: should respond with contents of endpoints.json", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(data);
        })
    })
})

