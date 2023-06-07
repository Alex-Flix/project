const { model } = require("mongoose");

const Movies = model("movies");

module.exports = (req, res, next) => {
  const { id } = req.body;
  Movies.findById( id )
    .then((data) => {
        if(!data) throw new Error("Movies Id not exists")
        req.moves=data
        next();
    })
    .catch((error) => next(error));
};
