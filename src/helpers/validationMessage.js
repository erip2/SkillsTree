export const validationMessage = (field, errors, apiErrors = {}) => {
    if (typeof errors[field] !== 'undefined') {
      // make the uc first
      return errors[field].message.charAt(0).toUpperCase() + errors[field].message.slice(1);
    }

    if (typeof apiErrors[field] !== 'undefined') {
      return apiErrors[field][0];
    }
  
    return '';
};

export default validationMessage;