let PersonModel = require('../models/PersonModel')

let controller = {
    all: (req, res) => {
        PersonModel.find({}).lean().exec(
            (err, people) => {
                if(err)
                    res.status(500).send(err)
                else
                    res.status(200).json(people)
            }
        )
    }
}

module.exports = {
    controller
}