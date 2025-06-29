import { apiConnector } from "./apiConnector";
import { setLoading, setTasks, setToken, setUser } from "./redux/userSlice";

const SIGNUP_API = "https://task-manager-5ca3.onrender.com/api/auth/signup"
const SIGNIN_API = "https://task-manager-5ca3.onrender.com/api/auth/signin"
export async function signUp(singnUpData, navigate) {
    try {
        const { email, password, name, country } = singnUpData;
        const response = await apiConnector("POST", SIGNUP_API, {
            email,
            password,
            name,
            country
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        navigate("/signin");
    }
    catch (error) {
        console.log("SIGNUP API ERROR............", error)
        navigate("/signup")
    }
}


export function signIn(signInData, navigate) {
    return async (dispatch) => {
        try {
            const { email, password } = signInData
            const response = await apiConnector("POST", SIGNIN_API, {
                email,
                password
            })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setLoading(true));
            dispatch(setUser(response.data.user))
            dispatch(setToken(response.data.token));

            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("loading", JSON.stringify(true));
            localStorage.setItem("token", JSON.stringify(response.data.token))

            navigate("/dashboard/status");
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
        }
    }

}

export function logOut(navigate) {
    return async (dispatch) => {
        try {
            dispatch(setTasks(null));
            dispatch(setLoading(null));
            dispatch(setUser(null));
            localStorage.removeItem("user");
            localStorage.removeItem("loading");
            localStorage.clear();
            navigate("/signin");

        } catch (error) {
            console.log("Logout Unsuccessfull")
        }
    }
}