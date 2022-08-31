const chatUrl = () =>  process.env.NODE_ENV === 'development'? process.env.DEV_BACKEND : process.env.PROD_BACKEND;

export default chatUrl;