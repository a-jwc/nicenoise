import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import UploadSound from "./UploadSound";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectIsLoggedIn, logout } from "../features/user/userSlice";
import { useSelector } from "react-redux";

export const Navbar = () => {
	let navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { isLoading, apiData, error } = useFetch<boolean>(
		"http://localhost:8000/api/v1/user/is-logged-in"
	);
	const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectIsLoggedIn)

	useEffect(() => {
		if (apiData) setIsLoggedIn(apiData);
	}, [apiData, loggedIn]);

	return (
		<>
			<nav className="my-4 mx-8 border-b-2 object-contain">
				<ul className="navbar flex flex-row gap-6 text-white items-stretch object-contain font-bold">
					<li key={"Home"}>
						<Link to="/">Home</Link>
					</li>
					<li key={"Effector"}>
						<Link to="/effector">Effector</Link>
					</li>
					{isLoggedIn ? (
						[
							<li key={"Profile"}>
								<Link to="/profile">Profile</Link>
							</li>,
							<li key={"Logout"}>
								<Link
									to="/"
									onClick={async (e) => {
										try {
											const res = await fetch(
												"http://localhost:8000/api/v1/auth/logout",
												{
													mode: "cors",
													method: "POST",
													headers: {
														"Content-Type": "application/json",
													},
													credentials: "include",
												}
											);
											if (!res.ok) throw Error("Could not fetch data");
											const data = await res.json();
                      dispatch(logout())
											navigate("/", { replace: true });
										} catch (err) {
											console.error(err);
											throw Error("Error");
										} finally {
											console.log("Logged out");
											setIsLoggedIn(false);
										}
									}}
								>
									Logout
								</Link>
							</li>,
						]
					) : (
						<li key={"Login"}>
							<Link to="/login">Login</Link>
						</li>
					)}
					<li key={"Upload"}>
						<UploadSound />
					</li>
				</ul>
			</nav>
		</>
	);
};
