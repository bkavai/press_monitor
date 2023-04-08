import { createTheme } from "@mui/material";
import { ALTERNATE_COLOR, PRIMARY_COLOR, RED_COLOR, SECONDARY_COLOR } from "./constants.js";

const theme = createTheme( {
	typography: {
		fontFamily: [
			'Kanit', 'Tahoma', 'Verdana', 'sans-serif'
		].join( ',' )
	},
	palette: {
		type: 'dark',
		primary: {
			main: PRIMARY_COLOR
		},
		secondary: {
			main: SECONDARY_COLOR
		},
		error: {
			main: RED_COLOR,
		},
		background: {
			default: ALTERNATE_COLOR
		}
	},
	overrides: {
		MuiInputBase: {
			root: {
				backgroundColor: '#FFFFFF !important'
			}
		},
		MuiOutlinedInput: {
			input: {
				backgroundColor: '#FFFFFF !important'
			},
			root: {
				backgroundColor: '#FFFFFF !important'
			}
		}
	}
} );

export default theme;
