import React from "react";
import {
	Navigate,
	useLocation,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	let checked = localStorage.getItem("jwt");
	const location = useLocation();
	if (!checked) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}
	return children;
};

export default ProtectedRoute;
