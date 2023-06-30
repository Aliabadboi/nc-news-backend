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
                    article_id: expect.any(Number),
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

    describe("GET /api/articles", () => {
        test("200: return an array containing article objects with author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                expect(body.articles).toBeInstanceOf(Array)
                expect(body.articles.length).toBe(13);
                body.articles.forEach((article) => {
                    expect(article).toMatchObject({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(String)
                    })
                }) 
            })
            } )
        test("200: should return the array of article objects in date descending order", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                expect(articles).toBeSortedBy("created_at", { descending: true });
              });
        })
        test("404: should return a 404 'not found' if incorrect endpoint specified", () => {
            return request(app)
            .get("/api/bananas")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Not found');
            });
        })
    }) 
    


