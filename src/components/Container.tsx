import { ReactNode, FunctionComponent } from "react";

type Props = {
	children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
	return (
		<div className="container px-5 mt-8 h-full object-contain mx-auto flex justify-center">
			{children}
		</div>
	);
};

export default Container;
