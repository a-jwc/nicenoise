import { ReactNode, FunctionComponent } from "react";

type Props = {
	children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
	return (
		<div className="container mx-auto px-5 h-full">
			{children}
		</div>
	);
};

export default Container;
