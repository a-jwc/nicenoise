import { ReactNode, FunctionComponent } from "react";

type Props = {
	children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
	return (
		<div className="container mx-auto px-5 sm:mt-12 h-full object-contain">
			{children}
		</div>
	);
};

export default Container;
