import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { getUserLoginService, getUserRegisterService } from "../services/user.service";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const storedToken = localStorage.getItem("_token");

    useEffect(() => {
        if (storedToken) {
            const decodedToken = storedToken ? jwt_decode(storedToken) : null;
            const { user } = decodedToken ? decodedToken : null;

            setCurrentUser(user);

            return navigate("/");
        }
    }, []);

    // ************** REGISTRAR **************
    function register(data) {
        getUserRegisterService(data)
            .then((resp) => {
                if (resp.ok) {
                    alert(resp.message);
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                    return;
                } else {
                    return Promise.reject(resp); // Si la contraseña es incorrecta me envia al catch para ejecutar el error
                }
            })
            .catch((error) => alert(JSON.stringify(error)));
    }

    // ************** LOGIN **************
    function login(data) {
        getUserLoginService(data)
            .then((resp) => {
                if (resp.ok) {
                    window.localStorage.setItem("_token", resp.token);

                    const decodedToken = resp.token ? jwt_decode(resp.token) : null;
                    const { user } = decodedToken ? decodedToken : null;

                    setCurrentUser(user);

                    return navigate("/");
                } else {
                    return Promise.reject(resp); // Si la contraseña es incorrecta me envia al catch para ejecutar el error
                }
            })
            .catch((error) => alert(JSON.stringify(error)));
    }

    // ************** LOGOUT **************
    function logout() {
        setCurrentUser(null);
        localStorage.removeItem("_token");
        navigate("/login");
    }
    const values = {
        currentUser,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
