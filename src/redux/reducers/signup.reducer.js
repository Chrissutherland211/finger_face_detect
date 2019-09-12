const INITIAL_STATE = {
  image:'',
  finger:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6J2076vCCRrAu4yPIiBz/arMJ2wQWohFunQROsMkmgJLvIzDLNWC++RTJ5GE+DKswR69myV2VAKqUwEuBMD/XzN3+HQAJbmG2KP7d/Sj3HfwtgorPZZtH39brdPlll09P5X1tFRPZ8rpRduovHdM09oWGvQ2pgOfqBbnbhwNLQlmuiJCrBtcofnD0ooeEnmyabx610Pg8eW/eEIInier7GcZH4DFpuAjBxnBQErzY9yRDBC68P6WTQwNQJMGHHQYAdfefU0ty1bx3z3iFfqmhI5JUe3OK8Vjgf4wuUA9isNb/ltx081sv0sGPTi3b5QlVK6kH1KxHEdWBjV2QYeavQIDAQAB',
  personId:'a0c74852-bedb-4ed8-b057-1980b83fd3de',
  checkface:'',
};

export default (state = INITIAL_STATE, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'SETFINGERDATA':         
      return {
        ...state,
        finger:action.payload
      };
    case 'SET_CHECK_FACE':         
      return {
        ...state,
        checkface:action.payload
      };
    case 'SET_PERSON_ID':         
      return {
        ...state,
        personId:action.payload
      };
    case 'SETFACEDATA':
      return action.payload;
    case 'DECREMENT':        
      return action.payload;
    case 'SET_IMAGE_URL':
      return {
        ...state,
        image:action.payload
      };
    default:
      return state;
  }
}