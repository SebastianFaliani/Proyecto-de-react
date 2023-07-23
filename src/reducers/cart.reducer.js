import { actionTypes } from "../actions/cart.actions";

export const cartInitialStates = {
    cartItems: [],
};

export function cartReducer(state, { type, payload = {} }) {
    // Si la funtion payload no trae nada por defecto me da un objeto vacio, para que no rompar el la siguente linea cuando hace el destructury
    const { idDrink } = payload;
    let drinkInCart = state.cartItems.find((drink) => drink.idDrink == idDrink);
    switch (type) {
        case actionTypes.ADD_TO_CART:
            //saber si el producto a agregar esta en el carrito
            if (drinkInCart) {
                //afirmativo, incremento la cantidad en 1
                let cartItemsUpdate = state.cartItems.map((drink) => {
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
                    cartItems: cartItemsUpdate,
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
            if (drinkInCart.quantity >= 1) {
                //afirmativo, decremento la cantidad en 1
                let cartItemsUpdate = state.cartItems.map((drink) => {
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
                    cartItems: cartItemsUpdate,
                };
            } else {
                //negativo, agrego el producto con cantidad 1
                let cartItemsUpdate = state.cartItems.filter((drink) => drink.idDrink !== idDrink);
                return {
                    ...state,
                    cartItems: cartItemsUpdate,
                };
            }
        case actionTypes.REMOVE_ALL_FROM_CART:
            if (drinkInCart) {
                let cartItemsUpdate = state.cartItems.filter((drink) => drink.idDrink !== idDrink);
                return {
                    ...state,
                    cartItems: cartItemsUpdate,
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
