import { compose, pipe } from 'lodash/fp';
import { produce } from 'immer';

import configureStore from './store/configureStore';
import {bugAdded,bugResolved}  from './store/bugs';




const store = configureStore();

store.subscribe(()=>{
    console.log("Store changed!");

});

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugAdded("Bug 2"));
store.dispatch(bugAdded("Bug 3"));

store.dispatch(bugResolved(3));

console.log(store.getState() );







