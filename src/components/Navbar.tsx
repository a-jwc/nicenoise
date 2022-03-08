import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="my-4 ml-8">
				<ul className="flex flex-row gap-6 text-white border-b-2">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/better">Better</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
