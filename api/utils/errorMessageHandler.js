const errorMessageHandler = (error) => {
  if (error.message.includes('validation failed')) {
    const errors = {};

    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  }
  return false;
};

export default errorMessageHandler;
