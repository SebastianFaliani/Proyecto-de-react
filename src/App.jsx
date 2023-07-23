import { CartProvider } from "./context/CartProvider";
import { CategoriesProvider } from "./context/CategoriesProvider";
import { DrinksProvider } from "./context/DrinksProvider";
import { ModalProvider } from "./context/ModalProvider";
import MainLayout from "./layout";
import AppRoutes from "./routes";

function App() {
    return (
        <ModalProvider>
            <CartProvider>
                <MainLayout>
                    <DrinksProvider>
                        <CategoriesProvider>
                            <AppRoutes />
                        </CategoriesProvider>
                    </DrinksProvider>
                </MainLayout>
            </CartProvider>
        </ModalProvider>
    );
}

export default App;
