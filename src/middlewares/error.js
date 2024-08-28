async function databaseHandler(response, error) {
    response.status(422)
        .json({
            message: error.error_message
        })
}

async function errorMiddleware(error, request, response, next) {
    console.log(error);

    if (error.database_error) {
        return databaseHandler(response, error);
    }

    response.status(500)
        .json({
            error,
            message: "Internal server error"
        })
}

export default errorMiddleware;