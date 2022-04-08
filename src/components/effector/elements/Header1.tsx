const Header1 = ({
	name,
	textColor,
	styles,
}: {
	name: string;
	textColor?: string;
	styles?: string;
}) => {
	return (
		<h1
			className={`text-center text-xl font-bold ${
				textColor || "text-white"
			} ${styles}`}
		>
			{name}
		</h1>
	);
};

export default Header1;
