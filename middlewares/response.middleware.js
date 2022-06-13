const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query
    if (res.error) {
        res.status(res.error.status || 400).send({
            "error": true,
            "message": res.error.message
        });
    } else {
        res.status(200).send(res.data);
    }

    next();
}

exports.responseMiddleware = responseMiddleware;