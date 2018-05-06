const defaultOptions = {

  toggleMode: 0

};

export const prepareOptions = userOptions =>

  Object.assign({},
    defaultOptions,
    userOptions
  );
