import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { FcMusic } from "react-icons/fc";
import UploadSound from "./UploadSound";
import useLogout from "../hooks/useLogout";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
	isLoggedIn,
	setIsLoggedIn,
}: {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { logout } = useLogout();

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="text-4xl inline-flex justify-center w-full rounded-md shadow-sm font-medium hover:text-pink-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-300">
					<BiMenu aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right bg-white bg-opacity-10 absolute right-0 mt-2 w-56 shadow-lg backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1 z-20">
						{/* <Menu.Item>
							{({ active }) => (
								<div className="block px-4 py-2 text-sm">
									<div style={{ display: "flex" }}>
										<FcMusic className="mr-1 pt-1 text-xl" />
										<UploadSound />
									</div>
								</div>
							)}
						</Menu.Item> */}
						<Menu.Item>
							{({ active }) => (
								<div className="block px-4 py-2 text-sm">
									<Link to="/profile" style={{ display: "flex" }}>
										<CgProfile className="mr-1 pt-1 text-xl" />
										profile
									</Link>
								</div>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<div className="block px-4 py-2 text-sm">
									<Link to="/settings" style={{ display: "flex" }}>
										<AiOutlineSetting className="mr-1 pt-1 text-xl" />
										settings
									</Link>
								</div>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<div className="block px-4 py-2 text-sm">
									<Link
										to="/"
										onClick={async () => {
											logout();
											setIsLoggedIn(false);
										}}
                    style={{ display: "flex" }}
									>
										<AiOutlineLogout className="mr-1 pt-1 text-xl" />
										logout
									</Link>
								</div>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
