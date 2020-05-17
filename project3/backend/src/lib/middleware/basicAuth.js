const { confirmUser } = require("../../routes/users/userRoutes");

const basicAuth = async (request, response, next) => {
    const requestHeader = request.headers.authorization || "";

    console.log("Auth Header ", requestHeader);

    const [type, payload] = requestHeader.split(" ");

    console.log("Types: ", type);
    console.log("Payload: ", payload);

    if (type === "Basic") {
        const credentials = Buffer.from(payload, "base64").toString("ASCII");
        console.log("Credentials: ", credentials);

        const [username, password] = credentials.split(":");
        console.log("username: ", username);
        console.log("password");

        const isAuthenticated = await confirmUser(username, password);
        console.log("is authenticated?", isAuthenticated);
        if (isAuthenticated) next();
        else
            res.send({
                status: 401,
                message: "Authorization Failure",
            });
    }
};

module.exports = basicAuth;
