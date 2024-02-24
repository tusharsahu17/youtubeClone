export const moneyFormat = number => {
  const formatt = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return formatt.format(number);
};
export const numberFormat = number => {
  const formatt = new Intl.NumberFormat('en-IN', {
    maximumSignificantDigits: 3,
  });
  return formatt.format(number);
};

export const formatErrorMessage = error => {
  const erroType = typeof error?.response?.data;

  switch (erroType) {
    case 'string':
      return {
        status: false,
        message: error?.response?.data,
      };
    case 'object':
      const errorMessageObject = error.response?.data;
      // console.log('erroType', errorMessageObject);
      if (
        errorMessageObject?.message ||
        errorMessageObject?.Message ||
        errorMessageObject?.detail
      ) {
        return {
          status: false,
          message:
            errorMessageObject?.message ||
            errorMessageObject?.Message ||
            errorMessageObject?.detail,
        };
      } else if (errorMessageObject.error) {
        return {
          status: false,
          message: 'Something went wrong please try again later',
        };
      } else {
        const formattedErrorMessages = [];

        function processErrors(errors, prefix = '') {
          for (const subKey in errors) {
            if (errors.hasOwnProperty(subKey)) {
              if (Array.isArray(errors[subKey])) {
                // Check if it's an array, and if so, iterate through its elements
                for (const errorMsg of errors[subKey]) {
                  formattedErrorMessages.push(
                    `${prefix}${subKey} : ${errorMsg}`,
                  );
                }
              } else if (typeof errors[subKey] === 'object') {
                processErrors(errors[subKey], `${prefix}${subKey} : `);
              }
            }
          }
        }

        processErrors(errorMessageObject);
        const formattedMessage = formattedErrorMessages.join('\n');

        return {
          status: false,
          message: formattedMessage,
        };
      }
    default:
      return {
        status: false,
        message: error?.message || 'Something went wrong',
      };
  }
};
