const SubmitInput = ({
  bgColor,
	textColor,
  value,
}: {
  bgColor: string;
	textColor: string;
  value?: string,
}) => {
	return (
		<input
			type="submit"
			value={value || "Submit"}
			className={`rounded-sm mx-auto px-4 py-2 mt-4 hover:cursor-pointer ${bgColor} ${textColor}`}
		/>
	);
};

export default SubmitInput;
