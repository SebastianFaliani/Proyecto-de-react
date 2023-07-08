import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesProvider";

export default function useCategories() {
    return useContext(CategoriesContext);
}
