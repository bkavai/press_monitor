import React, { createContext } from 'react';
import DialogLoading from "../dialogs/dialogLoading.js";
import AwsService from "./awsService.js";

export const StateContext = createContext( {

	loading:		false,

	awsService:		null,

	update:			() => {}
} );

export class StateProvider extends React.Component
{
	update = ( key, value, callback ) =>
	{
		this.setState
		(
			{ [key]: value },
			function()
			{
				if( callback ){ callback(); }
			}
		);
	};

	awsService		= AwsService( this );

	state = {
		loading:		false,

		awsService:		this.awsService,

		update:			this.update
	};

	render() {
		return (
			<StateContext.Provider value={ this.state }>
				<DialogLoading open={ this.state.loading }/>
				{ this.props.children }
			</StateContext.Provider>
		);
	}
}
