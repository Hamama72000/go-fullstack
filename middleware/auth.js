//Importation du token
const secret = process.env.TOKKEN;
const jwt = require("jsonwebtoken");

const { model } = require("mongoose");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, secret);


    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    console.log("----> 3", error)

    res.status(401).json({ error });
  }
};
