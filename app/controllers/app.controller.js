// importando os services
//const service = require("../service/appService")

// GET root/api/{query}
exports.index = async (req, res) => {
    res.render("index")
}