import { useContext } from "react";
import { DrinksContext } from "../context/DrinksProvider";

export default function useDrinks() {
    return useContext(DrinksContext);
}
