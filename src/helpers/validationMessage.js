export const validationMessage = (field, errors) => {

    if (typeof errors[field] !== 'undefined') {
      // make the uc first
      return errors[field].message.charAt(0).toUpperCase() + errors[field].message.slice(1);
    }
  
    return '';
};

export default validationMessage;