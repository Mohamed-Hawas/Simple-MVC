const logger = require("../Logger/logger");
// const correlationId = require ('../CorrelationId/correlationId');

const errorHandler = (err, req, res, next) => {
    const message = err.message;
    const status = err.status ;
    const operational = err.isOperational;
    
    logger.error(message,{
        statusCode: err.status,
        body: req.body,
        Id: req.correlationId
    });

    if(operational)
        return res.status(status).json({error: message});

    return res.status(500).json({error: "Something went wrong"});
}

module.exports = errorHandler;
