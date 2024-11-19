import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// Replace with your actual hosted URL
const HOSTED_URL = "https://e-commerce-backend-sxn6.onrender.com";

const getDefaultCart = () => { 
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // Fetch all products
        fetch(`${HOSTED_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_Product(data));

        // Fetch cart data if the user is authenticated
        if (localStorage.getItem("auth-token")) {
            fetch(`${HOSTED_URL}/getcart`, {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: "",
            })
            .then((response) => response.json())
            .then((data) => setCartItems(data));
        }
    }, []);

    // Add item to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (localStorage.getItem("auth-token")) {
            fetch(`${HOSTED_URL}/addtocart`, {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem("auth-token")) {
            fetch(`${HOSTED_URL}/removefromcart`, {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) { 
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Get total cart items count
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
