/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-catch */


import strings from '../values/stringEn';

export default {
  validateMobileno(numericStr) {
    const phoneno = /^\+[1-9]{1}[0-9]{3,14}$/;
    if (numericStr.match(phoneno)) {
      return true;
    }
    return false;
  },

  validateSpace(value) {
    const spaceRegex = new RegExp('\\s');
    return spaceRegex.test(value);
  },

  validateNumber(number) {
    const numberFormet = /^[0-9]*$/;
    return numberFormet.test(number);
  },

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },

  stringHasSpecialChars(str) {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(str);
  },

  validateString(string) {
    return !/\d/.test(string);
  },

  validateForm(formData) {
    const iterator = Object.keys(formData);
    let error = false;

    if (iterator.length > 0) {
      const validationArr = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < iterator.length; index++) {
        if (formData[iterator[index]] === undefined) {
          formData[iterator[index]] = '';
        }
        if (formData[iterator[index]].required) {
          if (
            formData[iterator[index]].value !== undefined
            && formData[iterator[index]].value !== ''
            && formData[iterator[index]].value !== null // &&
            // formData[iterator[index]].value.trim() !== ""
          ) {
            if (
              formData[iterator[index]].propname === 'firstName'
              || formData[iterator[index]].propname === 'lastName'
            ) {
              if (this.validateSpace(formData[iterator[index]].value)) {
                formData[iterator[index]].err = true;
                formData[iterator[index]].errMsg = strings.noSpace;
              } else if (
                !this.validateString(formData[iterator[index]].value)
              ) {
                formData[iterator[index]].err = true;
                formData[iterator[index]].errMsg = `The ${
                  formData[iterator[index]].propname === 'firstName'
                    ? 'first name'
                    : 'last name'
                } field may only contain alphabetical characters.`;
              } else {
                formData[iterator[index]].err = false;
                formData[iterator[index]].errMsg = '';
              }
            } else if (formData[iterator[index]].propname === 'email') {
              if (!this.validateEmail(formData[iterator[index]].value)) {
                formData[iterator[index]].err = true;
                formData[iterator[index]].errMsg = strings.validEmailError;
              } else {
                formData[iterator[index]].err = false;
                formData[iterator[index]].errMsg = '';
              }
            } else if (formData[iterator[index]].propname === 'password') {
              if (formData[iterator[index]].value.length < 6) {
                formData[iterator[index]].err = true;
                formData[iterator[index]].errMsg = strings.maxLimit;
              } else if (this.validateSpace(formData[iterator[index]].value)) {
                formData[iterator[index]].err = true;
                formData[iterator[index]].errMsg = strings.noSpace;
              } else {
                formData[iterator[index]].err = false;
                formData[iterator[index]].errMsg = '';
              }
            } else {
              formData[iterator[index]].err = false;
              formData[iterator[index]].errMsg = '';
            }
          } else {
            formData[iterator[index]].err = true;
            formData[iterator[index]].errMsg = strings.requiredField;
          }
        } else {
          formData[iterator[index]].err = false;
          formData[iterator[index]].errMsg = '';
        }
        validationArr.push(formData[iterator[index]].err);
      }
      if (validationArr.indexOf(true) !== -1) {
        error = true;
      } else {
        error = false;
      }
    } else {
      error = true;
    }
    return new Promise((resolve) => {
      resolve({ error, formDataObj: formData });
    });
  },
};
