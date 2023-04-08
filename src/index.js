import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App.js";
import theme from "./theme.js";

ReactDOM.render(
	<ThemeProvider theme={ theme }>
		<CssBaseline/>
		<App/>
	</ThemeProvider>,
	document.querySelector( '#root' )
);
