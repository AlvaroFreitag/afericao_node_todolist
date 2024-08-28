async function unauthorizedError(response, message) {
    const errorMessage = message || 'Not Found';

    response.status(401)
        .json({
            message: errorMessage
        })
}

export default unauthorizedError;