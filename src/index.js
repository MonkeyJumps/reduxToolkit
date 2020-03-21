import { compose, pipe } from 'lodash/fp';
import { produce } from 'immer';

import store from './store';

store.dispatch({
  type:"bugAdded",
  payload : {
  description : "Bug1"  
  }
})

console.log(store.getState())



