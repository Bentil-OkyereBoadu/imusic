const getParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
  
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
    }, {});
  
    return paramsSplitUp;
  };

export default getParamsFromSpotifyAuth