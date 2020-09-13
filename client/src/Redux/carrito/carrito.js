import axios from 'axios'

// --- CONSTANTES ---
const GET_CARRITO = "GET_CARRITO"
const SET_NUMORDEN = 'SET_NUMORDEN'

// --- STATE ---

const initialState = {
    carrito: [],
    numeroOrden: 1,
  };

// --- REDUCER ---

export default function ordenReducer (state = initialState,action) {
    switch(action.type){
        case SET_NUMORDEN:
            return {
                ...state,
                numeroOrden: state.numeroOrden + 1
            }
        
        case GET_CARRITO:
            return{
                ...state,
                carrito: action.payload
            };
        default: 
            return {
                ...state
            }
    };
};


//---- ACTION -----
export const getCarrito = (userId) => async (dispatch,getState) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/user/${userId}/carrito`)
        console.log(data);
        dispatch({
            type: GET_CARRITO,
            payload: data,
        })
        
    } catch (error) {
        console.log(error);
    };
};

export const newOrden = (userId,carrito) => async(dispatch,getState) => {
    try {
        await axios.post("http://localhost:3001/orders/counter");
        const {data} = await axios.get("http://localhost:3001/orders/counter/count")
        carrito.map( async (e) => {
            await axios.put(`http://localhost:3001/user/${userId}/cantidad/${e.id}`, e)
            await axios.put(`http://localhost:3001/user/${userId}/creada/${data[0].id}`)
        })
        dispatch({type:SET_NUMORDEN})
    }
    catch(error){
        console.log(error)
    }
}