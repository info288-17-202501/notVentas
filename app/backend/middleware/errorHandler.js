
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "ocurrio un Error Inesperado";
    
    console.error(`[ERROR] ${new Date().toISOString()} - ${statusCode} - ${message}`)

    if (error.stack){
        console.error(error.stack);
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack}) 
    });
};

module.exports = errorHandler;