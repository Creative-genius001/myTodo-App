import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	BsCircle,
	BsCheckCircleFill,
} from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { AppContext } from "../Contexts/AppContext";

const TaskCard = ({ task, index }) => {
	const navigate = useNavigate();
	const myStyle1 = {
		marginLeft: "0.5rem",
	};
	const myStyle = {
		color: "red",
		textDecoration: "line-through",
		marginLeft: "0.5rem",
	};

	const updateTask = (id) => {
		navigate(`/home/updatetask/${id}`);
	};

	const { handleIsCompleted, handleDelete } =
		useContext(AppContext);

	return (
		<div
			onDoubleClick={() => {
				updateTask(task._id);
			}}
			key={index}
			className="flex items-center justify-between rounded-2xl p-4 bg-white mb-2 hover:cursor-pointer">
			<div className="flex items-center">
				{task.isCompleted ? (
					<BsCheckCircleFill
						onClick={() => {
							handleIsCompleted(
								task._id,
								task.isCompleted,
							);
						}}
						className="text-blue-700 cursor-pointer"
					/>
				) : (
					<BsCircle
						onClick={() => {
							handleIsCompleted(
								task._id,
								task.isCompleted,
							);
						}}
						className="text-blue-700 cursor-pointer"
					/>
				)}
				<span
					style={
						task.isCompleted ? myStyle : myStyle1
					}>
					{task.task}
				</span>
			</div>
			<FiTrash2
				onClick={() => {
					handleDelete(task._id);
				}}
				className="text-[#727171] text-[1.4rem]"
			/>
		</div>
	);
};

export default TaskCard;
