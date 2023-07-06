import { CategoriesProvider } from "./context/CategoriesProvider";
import MainLayout from "./layout";
import AppRoutes from "./routes";

function App() {
    return (
        <MainLayout>
            <CategoriesProvider>
                <AppRoutes />
            </CategoriesProvider>
        </MainLayout>
    );
}

export default App;
