import { StateProvider } from "./services/stateService.js";
import { ViewportProvider } from "./services/viewportService.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages/index.js";
export default function App()
{
	return (
		<StateProvider>
			<ViewportProvider>
				<BrowserRouter>
					<Switch>
						<Route path="/" children={ <Index/> }/>
					</Switch>
				</BrowserRouter>
			</ViewportProvider>
		</StateProvider>
	);
}
