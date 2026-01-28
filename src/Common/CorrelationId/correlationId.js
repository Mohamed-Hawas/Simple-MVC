const { v4: uuidv4 } = require("uuid");

const correlationId = (req, res, next) => {
    const id = uuidv4();
    req.correlationId = id;
    res.setHeader("X-Correlation-Id", id);
    next();
};

module.exports = correlationId ;