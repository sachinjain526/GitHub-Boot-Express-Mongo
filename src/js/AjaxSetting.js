const jQuery = require('jquery');

jQuery(document).on('ajaxSend', () => {
  const interval = setInterval(() => {
    jQuery('body').append("<div class='loading' id='ajaxSpinner'></div>");
    clearInterval(interval);
  }, 1);
})
  .on('ajaxComplete', () => {
    jQuery('#ajaxSpinner').remove();
  });
