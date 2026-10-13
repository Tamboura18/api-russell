const test = require("node:test"); 
const assert = require("node:assert/strict");

const { validateCatway } = require("../middlewares/catwayMiddlewares"); 
const { validateReservation } = require("../middlewares/reservationMiddlewares"); 
const { validateUser } = require("../middlewares/userMiddlewares");

const runMiddleware = (middleware, body) => { 
    let statusCode = 200; let responseBody; 
    let nextCalled = false;

const req = { body };
const res = {
    status(code) {
        statusCode = code;
        return this;
    },
    json(data) {
        responseBody = data;
        return this;
    }
};

middleware(req, res, () => {
    nextCalled = true;
});

return { statusCode, responseBody, nextCalled };
};
test("un catway incomplet est refusé", () => { 
    const result = runMiddleware(validateCatway, {}); 
    assert.equal(result.statusCode, 400); 
    assert.equal(result.nextCalled, false); });

test("une réservation avec des dates invalides est refusée", () => { 
    const result = runMiddleware(validateReservation, { 
        clientName: "Test", 
        boatName: "Bateau test", 
        startDate: "date invalide", 
        endDate: "date invalide" });

assert.equal(result.statusCode, 400);
assert.equal(result.nextCalled, false);
});
test("un utilisateur avec un email invalide est refusé", () => { 
    const result = runMiddleware(validateUser, { 
        username: "Test", 
        email: "email-invalide", 
        password: "123456" });
        
assert.equal(result.statusCode, 400);
assert.equal(result.nextCalled, false);
});