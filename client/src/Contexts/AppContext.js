import React, {
	createContext,
	useContext,
	useState,
} from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
	const { userid } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const getTasks = async () => {
		let { id } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		if (id === null) {
			await axios
				.post("http://localhost:5000/get", {
					userid,
				})
				.then((res) => {
					setTasks(res.data);
				})
				.catch("could not get tasks");
		} else {
			let userid = id;
			await axios
				.post("http://localhost:5000/get", {
					userid,
				})
				.then((res) => {
					setTasks(res.data);
				})
				.catch("could not get tasks");
		}
	};

	const handleNewTask = async () => {
		let { jwt } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		let config = {
			headers: {
				"x-auth-token": jwt,
				"content-type": "application/json",
			},
		};
		let url = "http://localhost:5000/add";
		let data = {
			task: newTask,
			userid,
		};
		await axios
			.post(url, data, config)
			.then()
			.catch((err) =>
				console.error("could not add the task!"),
			);
	};

	const handleIsCompleted = async (
		id,
		isCompleted,
	) => {
		let { jwt } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		let config = {
			headers: {
				"x-auth-token": jwt,
				"content-type": "application/json",
			},
		};
		let url = "http://localhost:5000/complete";
		let data = {
			id,
			isCompleted,
		};
		await axios
			.put(url, data, config)
			.then()
			.catch((err) =>
				console.error(
					"error updating task to completion!",
				),
			);
	};

	const handleUpdateTask = async (id) => {
		let { jwt } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		let config = {
			headers: {
				"x-auth-token": jwt,
				"content-type": "application/json",
			},
		};
		let url = `http://localhost:5000/update/${id}`;
		let data = { task: newTask };
		await axios.put(url, data, config);
	};

	const handleDelete = async (id) => {
		await axios({
			method: "delete",
			data: { id },
			url: "http://localhost:5000/delete",
		});
	};

	return (
		<AppContext.Provider
			value={{
				handleUpdateTask,
				handleDelete,
				setName,
				tasks,
				handleNewTask,
				setNewTask,
				newTask,
				getTasks,
				name,
				handleIsCompleted,
			}}>
			{children}
		</AppContext.Provider>
	);
}
