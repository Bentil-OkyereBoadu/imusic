// const backendUrl = process.env.REACT_APP_DEV_BACKEND
// const frontendUrl = process.env.REACT_APP_DEV_SERVER

const frontendUrl = process.env.REACT_APP_PRODUCTION_URL
const backendUrl = process.env.REACT_APP_PROD_BACKEND

module.exports = {
    api: backendUrl,
    productionUrl: frontendUrl,
};