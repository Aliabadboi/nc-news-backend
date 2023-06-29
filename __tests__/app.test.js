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
        test("200: should respond with an array of topics, each topic should have a slug and a description", () => {
            return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body}) => {
                expect(body.topics).toBeInstanceOf(Array)
                body.topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                    expect(body.topics.length).toBe(3);
                });
            });
        })
        test("404: should return status code '404 Not Found'", () => {
            return request(app)
            .get('/api/bananas')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
        });
    });


    describe("GET /api", () => {
        test("200: should respond with contents of endpoints.json", () => {
            return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual(data);
            });
        });
    });

    describe("GET /api/articles/:article_id", () => {
        test("200: should respond with an article object, matching the inputted article ID", () => {
            return request(app)
            .get("/api/articles/5")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeInstanceOf(Object);
                expect(body.article[0].article_id).toBe(5);
            });
        });
        test("200: should respond with an article object containing author title, article_id, body, topic, created_at, votes, article_img_url", () => {
            return request(app)
            .get("/api/articles/6")
            .expect(200)
            .then(({ body }) => {
                expect(body.article[0]).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
                });
            });
        });
        test("404: should return status code '404 Not Found' when passed a non-existant ID", () => {
            return request(app)
            .get('/api/articles/100')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
        });
        test("400: should return 'bad request' when passed an invalid ID", () => {
            return request(app)
            .get('/api/articles/bananas')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
        });
    });


    describe("GET /api/articles/:article_id/comments", () => {
        test("200: should return an array containing all the comment objects for the given article ID", () => {
            return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body}) => {
                expect(body.comments.length).toBe(11);
            })
        })
        test("200: should return an array of comment objects, each containing comment_id, votes, created_at, author, body, article_id", () =>{
            return request(app)
            .get("/api/articles/9/comments")
            .expect(200)
            .then(({body}) => {
                expect(body.comments).toBeInstanceOf(Array)
                expect(body.comments.length).toBe(2);
                body.comments.forEach(comment => {
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number), 
                        votes: expect.any(Number), 
                        created_at: expect.any(String), 
                        author: expect.any(String), 
                        body: expect.any(String),
                        article_id: expect.any(Number)
                    })
                })
            })
        })
        test("200: should return an array of comment objects with the most recent comments first", () =>{
            return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body}) => {
                expect(body.comments.length).toBe(11);
                expect(body.comments).toBeSortedBy("created_at", {descending: true});
            })
        })
        test("404: should return a 404 'not found' error", () => {
            return request(app)
            .get("/api/articles/150/comments")
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe("Not found");
            })
        });
        test("400: should return a 400 'bad request' error when passed an invalid ID", () => {
            return request(app)
            .get('/api/articles/bananas/comments')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Bad request');
            });
        });
    })



    // 404 not found - correct type but resource not found, psql will not detect, implement code in the model
    // 400 bad request - invalid type, handled by custom error? 