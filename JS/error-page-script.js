('use strict');

import {alertMessage} from './functions.js';

/************** Error Message **************/
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		alertMessage(["C'est trop dangereux ici, tu dois partir avant qu'il ne soit trop tard !", 'check']);
	}, 1500);
});