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
        .then(({ body }) => {
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

describe("GET /api/articles/:article_id", () => {
    test("200: should respond with an article object, matching the inputted article ID", () => {
        return request(app)
        .get("/api/articles/5")
        .expect(200)
        .then(({ body }) => {
            expect(body).toBeInstanceOf(Object);
            expect(body.article[0].article_id).toBe(5);
        })

    })
    test("200: should respond with an article object containing author title, article_id, body, topic, created_at, votes, article_img_url", () => {
        return request(app)
        .get("/api/articles/6")
        .expect(200)
        .then(({ body }) => {
            expect(body.article[0]).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            })
        })
        
    })
})

    // TEST TEST

    describe("404 not found test for /api/articles/:article_id", () => {
        test("404: should return status code '404 Not Found' when passed a none-existant ID", () => {
            return request(app)
            .get('/api/articles/100')
            .expect(404)
            .then(({ body }) => {
                console.log(body.status, "body");
                expect(body.msg).toBe('Not found');
            })
        })
    })

    describe("400 invalid request for /api/articles/:article_id", () => {
        test("400: should return 'invalid request' when passed an invalid ID", () => {
            return request(app)
            .get('/api/articles/bananas')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad Request');
            })
        })
    })

    // 404 none existant- same type but doesnt exist
    // 400 different type totally- invalid
