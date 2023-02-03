import axios from "axios";
import React, {
	createContext,
	useState,
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [name, setName] = useState("");
	const [userid, setUserid] = useState("");
	const [error, setError] = useState();

	const Signup = async (
		name,
		password,
		email,
	) => {
		setError("");
		let res = await axios({
			method: "post",
			url: "https://todo-app-z5ff.onrender.com/signup",
			data: { name, password, email },
			withCredentials: false,
		}).catch((res) => {
			setError(
				(currErr) => res.response.data.error,
			);
		});
		if (error === "") {
			window.localStorage.setItem(
				"jwt",
				JSON.stringify(res.data),
			);
			window.localStorage.setItem(
				"isLoggedIn",
				"true",
			);

			setName(res.data.name);
			setUserid(res.data.id);
		}
	};

	const login = async (email, password) => {
		setError("");
		let res = await axios({
			method: "post",
			url: "https://todo-app-z5ff.onrender.com/login",
			data: { email, password },
			withCredentials: false,
		}).catch((res) => {
			setError(
				(currErr) => res.response.data.error,
			);
		});
		if (error == "") {
			window.localStorage.setItem(
				"jwt",
				JSON.stringify(res.data),
			);
			window.localStorage.setItem(
				"isLoggedIn",
				"true",
			);
			setName(res.data.name);
			setUserid(res.data.id);
			window.location = "/home";
		}
	};

	const checkUserAlreadyLoggedIn = async () => {
		let data = JSON.parse(
			localStorage.getItem("jwt"),
		);
		if (!data) {
			window.location = "/login";
		} else {
			setName(data.name);
			setUserid(data.id);
		}
	};

	const logout = async () => {
		setName("");
		window.localStorage.removeItem("jwt");
		window.localStorage.removeItem("isLoggedIn");
		window.location = "/login";
	};

	return (
		<AuthContext.Provider
			value={{
				checkUserAlreadyLoggedIn,
				error,
				Signup,
				name,
				logout,
				login,
				userid,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
