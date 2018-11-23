/**
 * validate
 */

const validate = {
  // mobile
  mobile: function(v) {
    return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
      v
    );
  },

  // pwd
  pwd: function(v) {
    return /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,15}$/.test(v);
  }
};

export default validate;
