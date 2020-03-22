import { compose, pipe } from 'lodash/fp';
import { produce } from 'immer';

import configureStore from './store/configureStore';
import {bugAdded,bugResolved, getUnresolvedBugs, getBugsAssignedTo, assignBug}  from './store/bugs';
import {userAdded} from './store/users';
import {projectAdded } from './store/projects';




const store = configureStore();

store.subscribe(()=>{
    console.log("Store changed!");

});


store.dispatch(userAdded({name:"User 1"}));
store.dispatch(userAdded({name:"User 2"}));
store.dispatch(projectAdded({name : "Project 1"}));
store.dispatch(projectAdded({name : "Project 2"}));
store.dispatch(bugAdded({description : "Bug 1", assignedUser: 10}));
store.dispatch(bugAdded({description : "Bug 2", assignedUser:10}));
store.dispatch(bugAdded({description : "Bug 3"}));

store.dispatch(bugResolved({id:3}));


const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log( x===y );


const assignedBugs = getBugsAssignedTo(store.getState());

console.log(assignedBugs);







