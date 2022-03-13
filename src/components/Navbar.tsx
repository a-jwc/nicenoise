import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="my-4 mx-8 border-b-2">
				<ul className="flex flex-row gap-6 text-white">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/better">Better</Link>
					</li>
          <li>
            <Link to="/login">Login</Link>
          </li>
				</ul>
			</nav>
		</>
	);
};
