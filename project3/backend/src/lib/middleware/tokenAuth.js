const jsonwebtoken = require("jsonwebtoken");
const { confirmUserExists } = require("../../routes/users/userRoutes");

const tokenSignature = "uniqueToken";

const tokenAuth = async (request, response, next) => {
  const header = request.headers.authorization;

  if (header != undefined) {
    const [type, token] = header.split(" ");

    if (type === 'Bearer') {
      try {
        const payload = jsonwebtoken.verify(token, tokenSignature);
        console.log("payload: ", payload)
        const doesUserExist = await confirmUserExists(payload.userId);

        console.log("User existance: ", doesUserExist)
        if (doesUserExist) {
          next();
        } else {
          response.sent(401);
        }
      } catch (error) {
        response.send(error.message);
      }
    }
  } else {
    response.status(401).send("Authentication Error");
  }
};

module.exports = tokenAuth;
