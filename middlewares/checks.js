const { validateEmail } = require('../helpers/helpers');

const checkMail = (req, res, next) => {
    if(validateEmail(req.body.email)) {
        next();
    } else {
        const error = new Error("Bad request");
        error.status = 400;
        next(error);
    }
}

module.exports = {
    checkMail
}