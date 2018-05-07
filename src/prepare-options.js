const defaultOptions = {

  toggleScheme: 0

};

export const prepareOptions = userOptions =>

  Object.assign({},
    defaultOptions,
    userOptions
  );
