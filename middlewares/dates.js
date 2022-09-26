let dates = {
    myDate,
    today,
    month
}

function myDate(req, _res, next) {
    req.date = new Date();
    next();
}

function today(req, _res, next) {
    let today = req.date;
    req.today = today.getDay();
    console.log(req.today);
    next();
}

function month(req, _res, next) {
    let today = req.date;
    req.month = today.getMonth();
    console.log(req.month);
    next();
}



module.exports = dates;