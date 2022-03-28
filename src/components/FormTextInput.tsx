const FormTextInput = ({
	labelName,
	name,
	value,
	onChange,
}: {
	labelName: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
	return (
		<>
			<label className="form-field">
				{labelName}
				<input
					type="text"
					name={name}
					value={value}
					onChange={onChange}
					className="input-field"
				/>
			</label>
		</>
	);
};

export default FormTextInput;
