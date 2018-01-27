
/*
	function names has the following format:
		as{representation of X}{representation of O}

	for example, asPhpHack will render X using the PHP logo
	and O using the Hack logo.
*/

import OLogo from './logo_o.svg';
import XLogo from './logo_x.svg';


import phpLogo from './logo_php.svg';
import hackLogo from './logo_hack.svg';

import reactLogo from './logo_react.svg';
import angularLogo from './logo_angular.svg';

function asXO(player) {
	if (player === null) {
		return
	}
	return isX(player) ? XLogo : OLogo;
}

function asPhpHack(player) {
	if (player === null) {
		return
	}
	return isX(player) ? phpLogo : hackLogo;
}

function asReactAngular(player) {
	if (player === null) {
		return
	}
	return isX(player) ? reactLogo : angularLogo;
}

function isX(player) {
	if (player === 'X') {
		return true;
	} 
	return false;
}


export default {
	"asXO": asXO,
	"asPhpHack": asPhpHack,
	"asReactAngular": asReactAngular
}