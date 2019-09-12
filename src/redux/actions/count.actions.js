
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increase(number)
{
    return (dispatch) => {
        dispatch({
            type   : INCREMENT,
            payload: number
        })
    }
}
export function decrease(number)
{
    return (dispatch) => {
        dispatch({
            type   : DECREMENT,
            payload: number
        })
    }
}