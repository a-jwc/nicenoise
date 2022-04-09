const Button = ({
  name,
	color,
	onClick,
	styles,
}: {
  name: string,
	color: string;
	onClick: () => void;
	styles?: string;
}) => {
	return (
		<button
			onClick={onClick}
			className={`rounded-sm text-white mx-auto px-4 py-2 m-4 hover:cursor-pointer ${color} ${styles}`}
		>
			{name}
		</button>
	);
};

export default Button;
