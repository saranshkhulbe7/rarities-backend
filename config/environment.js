require("dotenv").config()
const config = {
    'production': {
        JSON_SECRET: process.env.JSON_SECRET,
        DATABASE: process.env.MONGO_URL_PROD,
        ENVIRONMENT: process.env.NODE_ENV,
        PORT: process.env.PORT_PROD,
        CRYPTR_SECRET: process.env.CRYPTR_SECRET,
        PUSHER: {
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.PUSHER_APP_CLUSTER,
        }
    },
    'development': {
        JSON_SECRET: process.env.JSON_SECRET,
        DATABASE: process.env.MONGO_URL_DEV,
        ENVIRONMENT: process.env.NODE_ENV,
        PORT: process.env.PORT_DEV,
        CRYPTR_SECRET: process.env.CRYPTR_SECRET,
        PUSHER: {
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.PUSHER_APP_CLUSTER,
        }
    }
}


exports.getEnvironment = function getEnvironment() {
    return config['development']
}