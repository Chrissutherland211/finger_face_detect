const INITIAL_STATE = {
  image:'',
  finger:'',
  personId:'',
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