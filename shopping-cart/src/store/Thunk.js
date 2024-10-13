import { setproduct, setstate, status } from "./ProductSlice";

function fetchproducts(){
    
    return async function fetchproducts(dispatch,state){
    //loading status load thase
    dispatch(setstate(status.LOADING))
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(setproduct(data)); //data display thase
            dispatch(setstate(status.IDLE))
        } catch (error) {
            console.log(error);
            dispatch(setstate(status.ERROR))
        }
    }
}

export default fetchproducts;