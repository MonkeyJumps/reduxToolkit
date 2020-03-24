


const toastify  = ({dispatch, getState})=> next => action=>{

    if( action.type === "error"){
        console.log(action.payload.message);
    }

    return next(action);
}



export default toastify;