import { useReducer, createContext } from "react";
import { PropTypes } from "prop-types";

const CartContext = createContext();

const cartInitialStates = {
    cartItems: [],
};

const actionTypes = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_ONE_FROM_CART: "REMOVE_ONE_FROM_CART",
    REMOVE_ALL_FROM_CART: "REMOVE_ALL_FROM_CART",
    CLEAR_CART: "CLEAR_CART",
};

function cartReducer(state, { type, payload }) {
    const { idDrink } = payload;
    let drinkInCart = state.cartItems.find((drink) => drink.idDrink == idDrink);
    switch (type) {
        case actionTypes.ADD_TO_CART:
            //saber si el producto a agregar esta en el carrito
            if (drinkInCart) {
                //afirmativo, incremento la cantidad en 1
                let cartItemUpdate = state.cartItems.map((drink) => {
                    if (drink.idDrink === idDrink) {
                        return {
                            ...drink,
                            quantity: drink.quantity++,
                        };
                    }
                    return drink;
                });
                return {
                    ...state,
                    cartItems: cartItemUpdate,
                };
            } else {
                //negativo, agrego el producto con cantidad 1
                payload.quantity = 1;
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload],
                };
            }
        case actionTypes.REMOVE_ONE_FROM_CART:
            if (drinkInCart.quantity > 1) {
                //afirmativo, decremento la cantidad en 1
                let cartItemUpdate = state.cartItems.map((drink) => {
                    if (drink.idDrink === idDrink) {
                        return {
                            ...drink,
                            quantity: drink.quantity--,
                        };
                    }
                    return drink;
                });
                return {
                    ...state,
                    cartItems: cartItemUpdate,
                };
            } else {
                //negativo, agrego el producto con cantidad 1
                let cartItemUpdate = state.cartItems.filter((drink) => drink.idDrink !== idDrink);
                return {
                    ...state,
                    cartItems: cartItemUpdate,
                };
            }
        case actionTypes.REMOVE_ALL_FROM_CART:
            if (drinkInCart) {
                let cartItemUpdate = state.cartItems.filter((drink) => drink.idDrink !== idDrink);
                return {
                    ...state,
                    cartItems: cartItemUpdate,
                };
            }
            return state;
        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
    }
}

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, cartInitialStates);

    function addToCart(drink) {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: drink });
    }

    function removeOneFromCart(idDrink) {
        dispatch({ type: actionTypes.REMOVE_ONE_FROM_CART, payload: { idDrink } });
    }

    function removeAllFromCart(idDrink) {
        dispatch({ type: actionTypes.REMOVE_ALL_FROM_CART, payload: { idDrink } });
    }

    function clearCart() {
        dispatch({ type: actionTypes.CLEAR_CART });
    }

    const cartValues = {
        cart: state,
        addToCart,
        removeOneFromCart,
        removeAllFromCart,
        clearCart,
    };

    return <CartContext.Provider value={cartValues}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export { CartContext, CartProvider };
