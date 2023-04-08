export const LOADING                	= 'loading';
export const WHITE_COLOR				= '#ffffff';
export const RED_COLOR					= '#da291c';
export const PRIMARY_COLOR				= '#0072bc';
export const SECONDARY_COLOR			= '#1b3c54';
export const ALTERNATE_COLOR			= '#b0b8b8';

export const emptyStringIfEmpty = ( value ) =>
{
	if( Number.isInteger( value ) )
	{
		return value;
	}

	if( !value )
	{
		return ' ';
	}

	return value;
};

export const dateFormatter = ( value ) =>
{
    if( !value ){ return ''; }

    return new Date( value ).toLocaleDateString( "en-US" );
};

export const timeFormatter = ( value ) =>
{
    if( !value ){ return ''; }

    return new Date( value ).toLocaleTimeString( "en-US" );
};

export const dateTimeFormatter = ( value ) =>
{
    if( !value ){ return ''; }
	if( value === 0 ){ return ''; }

	value *= 1000;

    return dateFormatter( value ) + ' ' + timeFormatter( value );
};
