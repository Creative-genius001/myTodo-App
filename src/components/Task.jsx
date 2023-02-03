import {
	BsCircle,
	BsCheckCircleFill,
} from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import React, { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Task = ({ tasks, setChange, change }) => {
	const navigate = useNavigate();

	const myStyle1 = {
		marginLeft: "0.5rem",
	};
	const myStyle = {
		color: "red",
		textDecoration: "line-through",
		marginLeft: "0.5rem",
	};

	const { handleIsCompleted, handleDelete } =
		useContext(AppContext);

	const updateTask = (id) => {
		navigate(`/home/updatetask/${id}`);
	};

	return (
		<div className="mt-16 ">
			<h5 className="text-gray-400 font-semibold text-sm mb-2">
				TODAY'S TASKS
			</h5>
			<div className=" h-[450px] w-full">
				{tasks.length === 0 ? (
					<p className="text-gray-500 font-medium text-center text-sm mt-16">
						No task has been added
					</p>
				) : (
					tasks.map((task, index) => {
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
												setChange(!change);
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
												setChange(!change);
											}}
											className="text-blue-700 cursor-pointer"
										/>
									)}
									<span
										style={
											task.isCompleted
												? myStyle
												: myStyle1
										}>
										{task.task}
									</span>
								</div>
								<FiTrash2
									onClick={() => {
										handleDelete(task._id);
										setChange(!change);
									}}
									className="text-[#727171] text-[1.4rem]"
								/>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Task;
