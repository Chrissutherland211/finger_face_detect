export const SETFINGERDATA = 'SETFINGERDATA';
export const SETFACEDATA = 'SETFACEDATA';
export const SET_IMAGE_URL = 'SET_IMAGE_URL';
export const SET_PERSON_ID = 'SET_PERSON_ID';
export const SET_CHECK_FACE = 'SET_CHECK_FACE';


export function setFingerdata(fingerdata)
{
    return (dispatch) => {
        dispatch({
            type   : SETFINGERDATA,
            payload: fingerdata
        })
    }
}
export function setFacedata(facedata)
{
    return (dispatch) => {
        dispatch({
            type   : SETFACEDATA,
            payload: facedata
        })
    }
}
export function setImageurl(imageurl)
{
    return (dispatch) => {
        dispatch({
            type   : SET_IMAGE_URL,
            payload: imageurl
        })
    }
}
export function setPersonId(personid)
{
    return (dispatch) => {
        dispatch({
            type   : SET_PERSON_ID,
            payload: personid
        })
    }
}
export  function setCheckFace(status)
{
    return (dispatch) => {
        dispatch({
            type   : SET_CHECK_FACE,
            payload: status
        })
    }
}