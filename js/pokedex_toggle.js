/**
 * This JS holds the functionality of the pokedex to switch it On and Off.
 * When the Pokedex is turned on the light will blink and it will stop on closing the pokedex.
 * 
 */


var span_to_open = document.querySelector(".open-button");
/**
 * Defines the function to be called on click which is used to open the pokedex and turn the lights on.
 * @param {} 
 * @returns None.
 */
toggle_pokedex_on = function(){
	document.getElementsByClassName('Pokedex-rightBackface')[0].className+=' rotate-open';
	document.getElementsByClassName('Pokedex-rightFrontface')[0].className+=' rotate-close';
	var d = document.getElementById("light");
	d.className += " is-animated";
}

/**
 * Checks if `addEventListener` can be used and adds the click eventlListener.
 * @param {} 
 * @returns None.
 */
if (span_to_open.addEventListener) span_to_open.addEventListener('click', toggle_pokedex_on, false);
else span_to_open.attachEvent('onclick', toggle_pokedex_on);

var span_to_close = document.querySelector(".close-button");
/**
 * Defines the function to be called on click which is used to close the pokedex and turn off the light.
 * @param {} 
 * @returns None
 */
toggle_pokedex_off = function(){
	console.log('Now closing');
	removeClass(document.getElementsByClassName('Pokedex-rightBackface')[0],'rotate-open');
	removeClass(document.getElementsByClassName('Pokedex-rightFrontface')[0],'rotate-close');
	var d = document.getElementById("light");
	d.classList.remove("is-animated");

}

//Checks if `addEventListener` can be used and adds the click eventlListener.
if (span_to_close.addEventListener) span_to_close.addEventListener('click', toggle_pokedex_off, false);
else span_to_close.attachEvent('onclick', toggle_pokedex_off);

