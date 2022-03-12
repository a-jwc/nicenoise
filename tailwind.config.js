const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"eggshell": "#eee",
			},
			screens: {
        "2xs": "360px",
				"xs": "475px",
				...defaultTheme.screens,
			},
		},
	},
	plugins: [],
};
