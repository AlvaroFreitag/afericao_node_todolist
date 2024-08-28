async function notFoundError(response, message) {
    const errorMessage = message || 'Not Found';

    response.status(404)
        .json({
            message: errorMessage
        })
}

export default notFoundError;