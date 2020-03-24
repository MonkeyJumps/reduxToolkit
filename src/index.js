

import configureStore from './store/configureStore';

// import { bugAdded, bugResolved, getUnresolvedBugs, bugAssigned, getBugsAssignedTo } from './store/bugs';
// import { userAdded } from './store/users';
// import { projectAdded } from './store/projects';
import * as actions from './store/api';
import {loadBugs,addBug, resolveBug, assignBug} from './store/bugs';


const store = configureStore();

store.subscribe(() => {
    console.log("Store changed!");

});



// store.dispatch((dispatch, getState) => {

//     //call an API 
//     //when the promise is resolved => dispatch()

//     dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });

//     dispatch({ type: "x", payload: { message: "Toastify: An error occurred." } })
// })



//loading UI Layer
store.dispatch(loadBugs());





setTimeout( ()=> { store.dispatch(resolveBug(2)),2000})

setTimeout( ()=> { store.dispatch(assignBug(4,4)),2000});


// store.dispatch(userAdded({name:"User 1"}));
// store.dispatch(userAdded({name:"User 2"}));
// store.dispatch(projectAdded({name : "Project 1"}));
// store.dispatch(projectAdded({name : "Project 2"}));
// store.dispatch(bugAdded({description : "Bug 1"}));
// store.dispatch(bugAdded({description : "Bug 2"}));
// store.dispatch(bugAdded({description : "Bug 3"}));
// store.dispatch(bugAssigned({bugId:1,userId:2}))

// store.dispatch(bugResolved({id:3}));


// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());
// console.log( x===y );


// const assignedBugs = getBugsAssignedTo(2)(store.getState());

// console.log(assignedBugs);









