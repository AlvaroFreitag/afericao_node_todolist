async function badRequestError(response, message) {
    const errorMessage = message 
        ? message
        : { message: 'Bad request' };

    response.status(400)
        .json(errorMessage)
}

export default badRequestError;