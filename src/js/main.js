import 'popper.js';
import 'bootstrap';
import eventListener from './EventListener';
import onLoadEventToFetchData from './onloadrendering';

const jQuery = require('jquery');
require('./AjaxSetting');
require('../scss/main.scss');

jQuery(document).ready(() => {
  onLoadEventToFetchData();
  eventListener();
});
