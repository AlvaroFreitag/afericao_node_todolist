async function forbiddenError(response, message) {
    const errorMessage = message || 'Forbidden';

    response.status(403)
        .json({
            message: errorMessage
        })
}

export default forbiddenError;