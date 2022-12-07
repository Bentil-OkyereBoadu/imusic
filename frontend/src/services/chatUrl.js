const chatUrl = () =>  process.env.REACT_APP_NODE_ENV === 'development'? process.env.REACT_APP_DEV_BACKEND : process.env.REACT_APP_PROD_BACKEND;

module.exports =  chatUrl;