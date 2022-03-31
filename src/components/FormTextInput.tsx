const FormTextInput = ({
	labelName,
	name,
	value,
	onChange,
  type
}: {
	labelName: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string
}) => {
	return (
		<>
			<label className="form-field">
				{labelName}
				<input
					type={type || "text"}
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
