//Action types

import { createAction, createReducer ,createSlice} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import {apiCallBegan}  from './api';
import moment from 'moment';


// const BUG_ADDED="bugAdded";
// const BUG_REMOVED="bugRemoved";
// const BUG_RESOLVED='bugResolved';


const slice = createSlice ( {
    name : "bugs",
    initialState : {
        list:[],
        loading:false,
        lastFetch:null
    },
    reducers:{

//adding new reducer will automatically create a new action for us.
        bugsRequested : (bugs,action)=>{

            bugs.loading = true;
        },
        bugsRequestFailed : (bugs,action)=>{

            bugs.loading = false;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload)},
        bugsReceived : (bugs,action)=>{
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now()  //using timestamp here becaue date object not serializable

        },
        bugResolved: (bugs,action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            if (index !== -1)
                bugs.list[index].resolved = true;
        },
        bugRemoved : (bugs,action)=>{
            state.filter(bug => bug.id !== action.payload.id);
        },
        bugAssigned : (bugs, action)=>{
            console.log(action.payload)
            const { id : bugId , userId} = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            //if (index !== -1)
                bugs.list[index].userId =userId;

        }

    },

})
//reducer


const { bugAdded,bugResolved,bugRemoved, bugAssigned, bugsReceived,bugsRequested, bugsRequestFailed} = slice.actions;
export default slice.reducer;

const url = "/bugs";

//Action Creators

export const loadBugs =()=> (dispatch,getState)=>{
    const {lastFetch}=  getState().entities.bugs;


    const diffInminutes = moment().diff(moment(lastFetch), 'minutes');
    if ( diffInminutes < 10 ) return;
    console.log(lastFetch);
    dispatch(apiCallBegan({
        url: "/bugs",
        onStart : bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
        
    })
    );
}
// export const loadBugs =() => apiCallBegan({
//     url: "/bugs",
//     onStart : bugsRequested.type,
//     onSuccess: bugsReceived.type,pm 
//     onError: bugsRequestFailed.type
    
// })



export const addBug  = bug => apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type
})


export const assignBug = (bugId, userId)=> apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data : {userId},
    onSuccess : bugAssigned.type
})

export const resolveBug = bugId => apiCallBegan({
    url: `${url}/${bugId}`,
    method:"patch",
    data:{resolved: true},
    onSuccess : bugResolved.type
})
//selector functions 

// export const getUnresolvedBugs = state =>
//     state.entities.bugs.filter(bug => !bug.resolved);

//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => !bug.resolved)
)


export const getBugsAssignedTo = userId => createSelector(

    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
)