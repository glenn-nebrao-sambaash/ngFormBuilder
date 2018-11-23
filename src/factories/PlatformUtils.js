'use strict';

module.exports = ['FormioUtils', 'PLATFORM_OPTIONS', function(FormioUtils, PLATFORM_OPTIONS) {

  function getApiUri(apiUriPattern, params) {
    var uri = apiUriPattern;
    if (params && params.constructor === Array) {
        for (var i = 0; i < params.length; i++) {
            uri = uri.replace('$PARAM_'+(i+1),params[i]);
        }        
    }
    return uri;
  }

  return {
    getApiUri: getApiUri
  };

}];
