//Action types

import { createAction} from '@reduxjs/toolkit';

// const BUG_ADDED="bugAdded";
// const BUG_REMOVED="bugRemoved";
// const BUG_RESOLVED='bugResolved';


export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");
//ACtion creators

// const bugAdded = description=>({
//     type: BUG_ADDED,
//     payload: {
//         description
//     }
// });


// const bugResolved = id => ({
//     type:BUG_RESOLVED,
//     payload:{
//         id
//     }
// })

// export function bugAdded(description) {
//     return {
//         type: BUG_ADDED,
//         payload: {
//             description: "Bug1"
//         }
//     }
// }



//reducer


let lastId = 0;

export default function reducer(state = [], action) {


    if (action.type === bugAdded.type) {
        return [...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        }];
    } else if (action.type === bugRemoved.type) {
        return state.filter(bug => bug.id !== action.payload.id);

    } else if (action.type === bugResolved.type) {


        return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved : true})

        // return produce(state, draft => {

        //     const index = state.findIndex(i === action.payload.id);
        //     if (index !== -1) {
        //         draft[index].resolved = true;
        //     }

        // })

    }

    return state;
}