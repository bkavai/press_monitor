import { io, iot, mqtt } from 'aws-iot-device-sdk-v2'

const AwsService = ( context ) =>
{
	let sub_topic_			= null;
	let connection_			= null;
	let message_callback_	= null;

	const connect = ( client_id, topic, message_callback, callback, error_callback ) =>
	{
		// Already connected ...
		if( connection_ != null ){ if( callback ){ callback(); } return; }

		const	client_bootstrap	= new io.ClientBootstrap();
		const	config_builder		= iot.AwsIotMqttConnectionConfigBuilder.new_with_websockets();
		let		config				= null;
		let		client				= null;

		sub_topic_			= topic;
		message_callback_	= message_callback;

		config_builder.with_clean_session( false );
		config_builder.with_client_id( client_id );
		config_builder.with_endpoint( `${ process.env.REACT_APP_MQTT_ID }.iot.${ process.env.REACT_APP_REGION }.amazonaws.com` );
		config_builder.with_credentials( process.env.REACT_APP_REGION, process.env.REACT_APP_ACCESS_KEY_ID, process.env.REACT_APP_SECRET_KEY, null );

		config		= config_builder.build();
		client		= new mqtt.MqttClient( client_bootstrap );
		connection_	= client.new_connection( config );

		connection_.on( 'connect', onConnected );
		connection_.on( 'disconnect', onDisconnected );
		connection_.on( 'error', onError );
		connection_.on( 'interrupt', onInterrupt );
		connection_.on( 'message', onMessage );
		connection_.on( 'resume', onResume );

		connection_.connect().then( ( is_resuming ) => { if( callback ){ callback( is_resuming ); } } ).catch( ( error ) => { console.log( error ); if( error_callback ){ error_callback( error ); } } );
	};

	const disconnect = () =>
	{
		if( !connection_ ){ return; }

		connection_.disconnect();
	};

	const getConnection = () => { return connection_; }

	/* Private Functions */
	const onConnected = ( session_present ) =>
	{
		console.log( 'onConnected' );

		if( sub_topic_ != null )
		{
			connection_.subscribe( sub_topic_, 1 );
		}
	};

	const onDisconnected = () =>
	{
		console.log( 'onDisconnected' );

		sub_topic_			= null;
		connection_			= null;
		message_callback_	= null;
	};

	const onError = ( error ) => { console.log( error ); };

	const onInterrupt = ( error ) => { console.log( error ); };

	const onResume = ( return_code, session_present ) => { console.log( return_code ); };

	const onMessage = ( topic, payload, dup, qos, retain ) =>
	{
		const message	= new TextDecoder().decode( payload );
		const json		= JSON.parse( message );

		if( message_callback_ )
		{
			message_callback_( json );
		}
	};


	return {
		connect,
		disconnect,
		getConnection
	};
};

export default AwsService;
