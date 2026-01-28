class AppError extends Error {
    constructor( message , status = 500, isOperational = true){
        super(message);
        this.status = status;
        this.isOperational = isOperational ;
        
        Error.captureStackTrace(this, this.constructor);
        
    }
}

module.exports = AppError ;