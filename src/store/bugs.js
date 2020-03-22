//Action types

import { createAction, createReducer ,createSlice} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
// const BUG_ADDED="bugAdded";
// const BUG_REMOVED="bugRemoved";
// const BUG_RESOLVED='bugResolved';


export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");
export const assignBug = createAction("assignBug");



//reducer

let lastId = 0;

export default createReducer([], {
    // key : value 
    //actions : functions  (event => event handler)

    [bugAdded.type]: (bugs, action) => {
        bugs.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        })
    },
    [bugRemoved.type]: (state, action) => {
        state.filter(bug => bug.id !== action.payload.id);
    },
    [bugResolved.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        if (index !== -1)
            bugs[index].resolved = true;

    }
})






//selector functions 

// export const getUnresolvedBugs = state =>
//     state.entities.bugs.filter(bug => !bug.resolved);

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
)


export const getBugsAssignedTo = createSelector(

    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.assignedUser === userId)
)