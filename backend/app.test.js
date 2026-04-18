const request = require("supertest");
const app = require("./app");

describe("API tesztek", () => {
  test("GET /api/health visszaadja hogy a szerver él", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("POST /api/cart hibát ad hibás bemenetnél", async () => {
    const response = await request(app)
      .post("/api/cart")
      .send({ productId: null, quantity: 0 });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Érvénytelen bemenet");
  });
});