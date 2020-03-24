


const logger = param => store => next => action=>{


    console.log(param);

    return next(action);

}


export default logger;
