import { createStore } from 'redux';
import createWidgetReducer from './reduxReducer';
// coding start
const store = createStore(createWidgetReducer, {});
export default store;
