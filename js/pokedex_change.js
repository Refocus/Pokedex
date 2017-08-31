/**
 * This JS holds the functionality of the pokedex to change the details of the pokemon on the click of previous and next butttons
 * 
 * 
 */

document.getElementById('plus').addEventListener('click', function(event) {
  change_pokedex(event.target);
});
//Defines the function to be called on click
/**
 * This function is used to change the pokemon image and pokemon number in their place holder on the click of button
 * @param {button} button is used to update pokemon based on whether it is a previous button or the next button.
 * @returns None.
 */
change_pokedex = function(button){
	console.log(button.id);
	if(currentPokeobj == null){
		return;
	}
	var pokeObj = null;
	if(button.id == 'prev'){
		pokeObj = getPokemonObject(currentPokeobj.name,1);
	}else if (button.id == 'next'){
		pokeObj = getPokemonObject(currentPokeobj.name,-1);
	}else{
		//Ignoring the rest of the events
		return
	}
		if(null == pokeObj){
                    pokemonDoesNotExist();
                    document.getElementById('pokenumber').innerHTML ='';
                    document.getElementById('pokename').value='';
                }else{
                	currentPokeobj = pokeObj;
                    updateImage(pokeObj);  
                    document.getElementById('pokenumber').innerHTML = pokeObj.num;
                    document.getElementById('pokename').value=pokeObj.name;
                    // updateDescription(pokeObj);
                }
}


