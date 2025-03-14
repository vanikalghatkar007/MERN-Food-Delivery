import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreCotext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        } else {
            setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))

        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(token) {
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
        }
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async ()=> {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data.reverse())
    } 

    const loadCartData = async (token) =>{
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    const getCartItemCount = () => {
        let count =0;
        for(const item in cartItems){
        if(cartItems[item]>0){
             count += cartItems[item]

        }
    }
        return count;
    } 

    useEffect(()=>{
        //load data after reload
        async function loadData() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getCartItemCount,
        url,
        token,
        setToken
    }
    return(
        <StoreCotext.Provider value={contextValue}>
            {props.children}
        </StoreCotext.Provider>
    )
}

export default StoreContextProvider