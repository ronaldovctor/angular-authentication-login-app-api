let ProductModel = require('../models/ProductModel')

let controller = {
    all: (req, res) => {
        ProductModel.find({}).lean().exec(
            (err, prods) => {
                if(err)
                    res.status(500).send(err)
                else
                    res.status(200).json(prods)
            }
        )
    }
}

module.exports = {
    controller
}