import isEmpty from "is-empty";
import isEmail from 'email-validator'



export const validator = (obj, type = null) => {
  const errors = {};
  
  switch (type) {
    case "LOGIN":
      if (isEmpty(obj.email)) {
        errors.email = "Please enter email";
      }
      if(!isEmail.validate(obj.email)){
          errors.email = "Please enter valid email"
      }
     
      if (isEmpty(obj.password)) {
        errors.password = "Please enter password";
      }
       if (!isEmpty(obj.password) && obj.password.length < 8) {
         errors.password = "Password must be atleast eight (8) characters";
       }

      break;
    default:
      if (isEmpty(obj.email)) {
        errors.email = "Please enter email";
      }
       if (!isEmail.validate(obj.email)) {
         errors.email = "Please enter valid email";
       }
      if (isEmpty(obj.password) || obj.password.length < 8) {
        errors.password = "Password must be atleast (8) characters";
      }
      if (isEmpty(obj.confirmPassword) || obj.confirmPassword.length < 8) {
        errors.confirmPassword = "Password must be atleast (8) characters";
      }
    
       if (!isEmpty(obj.confirmPassword) && !isEmpty(obj.password) && obj.password !== obj.confirmPassword) {
         errors.confirmPassword = "Passwords must match";
       }
      if (isEmpty(obj.firstName)) {
        errors.firstName = "Please enter your first name";
      }
      if (isEmpty(obj.lastName)) {
        errors.lastName = "Please enter your last name";
      }
     
      if (isNaN(parseInt(obj.mobilePhone))){
        errors.mobilePhone = "Invalid mobile number format"
      }
        if (isEmpty(obj.mobilePhone) || obj.mobilePhone.length < 10) {
          errors.mobilePhone =
            "Mobile phone must be atleast 10 digits. E.g 8761234567";
        }

  }
  
  if (isEmpty(errors)) {
    return null;
  } else return errors;
};
