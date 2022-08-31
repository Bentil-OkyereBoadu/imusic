const backendUrl = process.env.DEV_BACKEND
const frontendUrl = process.env.DEV_SERVER

// const frontendUrl = process.env.PRODUCTION_URL
// const backendUrl = process.env.PROD_BACKEND

module.exports = {
    api: backendUrl,
    productionUrl: frontendUrl,
};