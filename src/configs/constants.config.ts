const PORT = process.env.PORT || 9871;
const SECRET = process.env.SECRET!;
const MAXAGE = 3 * 24 * 60 * 60;

const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected",
        ERROR: "There was an error while connecting to the database."
    },
    USER: {
        CREATED: "User created successfully.",
        DUPLICATE_EMAIL: "Email already exist.",
        DUPLICATE_PHONENUMBER: "Phonenumber already exist.",
        DUPLICATE_IMAGE: "Image already belongs to a registered user.",
        INVALID_USERNAME: "UserName does not exist.",
        INVALID_ID: "ID does not exist.",
        INVALID_PASSWORD: "Incorrect password.",
        LOGGEDIN: "Successfully logged in",
        LOGGEDOUT: "Successfully logged out"
    },
    AUTH: {
        TOKENERROR: 'Access Denied: Token not provided',
        INVALIDTOKEN: 'Access Denied: Invalid token',
        DENIED: 'Access Denied: Unauthorized request'
    }
};

export {
    PORT,
    SECRET,
    MAXAGE,
    MESSAGES,
    // DATABASE_URI,
    // SALTROUNDS,
    // ENUM,
    // DATABASES,
};