import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("renders nicenoise.io from Navbar component in App", () => {
	const history = createMemoryHistory();
	render(
		<Router location={history.location} navigator={history}>
			<App />
		</Router>
	);
	const linkElement = screen.getByText(/nicenoise.io/i);
	expect(linkElement).toBeInTheDocument();
});
