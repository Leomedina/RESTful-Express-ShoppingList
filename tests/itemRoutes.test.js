process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const testItems = require("../utils/fakeDb");


beforeEach(() => {
    testItems.reset();
    testItems.addItem("mayo", 30);
});

afterEach(() => {
    testItems.reset();
});

describe("Test for GET /items", () => {
    test("Testing GET all items", async () => {
        const res = await request(app).get('/items');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "items": [{ "name": "mayo", "price": 30 }], "status": 200 });
    });

    test("respond with 404", async () => {
        const res = await request(app).get('/NotItem');

        expect(res.statusCode).toBe(404)
    })
});

describe("Test for POST /items", () => {
    test("Testing POST on all items; creates new item", async () => {
        const res = await request(app)
            .post('/items')
            .send({
                "name": "raygun",
                "price": 45
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            'status': 201,
            'item': {
                "name": "raygun",
                "price": 45
            }
        });
    });
});

describe("Test for PATCH /items", () => {
    test("Testing PATCH on an item to update the item", async () => {
        const res = await request(app)
            .patch('/items/mayo')
            .send({
                "name": "flayo"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            'status': 200,
            'updated': {
                "name": "flayo",
                "price": 30,
            },
        });
    });
});

describe("Test for DELETE /items/item", () => {

    test("Testing DELETE on an item", async () => {
        const res = await request(app).delete('/items/mayo');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            'status': 200,
            'message': 'mayo successfully deleted'
        });
    });
});