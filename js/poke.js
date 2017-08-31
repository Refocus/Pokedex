/**
 * This JS holds the functionality of the pokedex after it is switched on.
 * Processing the search and updating the details of the searched pokemon is handled in this JS
 * 
 */



var currentPokeobj = null; /*This is used store the current entire pokemonobject for the current search*/
/**
 * This function is initiated on entering a pokemon name and pressing Enter
 * @param {event,In_elem} event is the event which is on pressing Enter key, In_element is the input element on which is the event will be made
 * @returns pokeProcess function which updates image and pokemon number in their respective place holders. 
 */
formSubmit = function(event,In_elem){
			    event.preventDefault();   
			    if(event.keyCode == 13){ // On Press of Enter
			    	var pokemonName = In_elem.value;//document.getElementById('pokename').value;
					switchOn(document.getElementById("red"),"red");
					switchOn(document.getElementById("yellow"),"yellow");
					switchOn(document.getElementById("green"),"green");
					setTimeout( function(){ // In order to know that the search is being done and to turn the lights on setTimeout function is used.
						return pokeProcess(pokemonName);
					}, 3000);
			    	/*pokeProcess(pokemonName);*/
			    }
			    return false;
}
/**
 * This function is used to toggle the lights on the pokedex
 * @param {id,color} id is the id of the element on which light on effect is to be displayed, color is the color of the light
 * @returns Nothing. 
 */
switchOn = function(id,color){

	id.className += " is-animated-"+color;
}
/**
 * This function is used to turn the lights off the pokedex
 * @param {id,color} id is the id of the element on which light on effect is to be displayed, color is the color of the light
 * @returns Nothing. 
 */
switchOff = function(id,color){
	id.classList.remove("is-animated-"+color);
}
/**
 * This function is used to update the image in the image place holder and display the number of the pokemon on the number place holder
 * @param {pokemonName} pokemonname is the name of the pokemon of which we need the details
 * @returns Nothing. 
 */
pokeProcess = function(pokemonName){

				var pokeObj = getPokemonObject(pokemonName,0);
                if(null == pokeObj){
                    pokemonDoesNotExist();
                }else{
                	currentPokeobj = pokeObj;
                    updateImage(pokeObj);  
                    document.getElementById('pokenumber').innerHTML = pokeObj.num;
                    // updateDescription(pokeObj);
                }
                switchOff(document.getElementById("red"),"red");
				switchOff(document.getElementById("yellow"),"yellow");
				switchOff(document.getElementById("green"),"green");
}
/**
 * This function returns the Total Data related to the searched pokemon from the given JSON file
 * @param {pokemonName,index} pokemonName is the name of the pokemon which need to be searched, index is used to get the next and previous pokemons objects on clicking the next and previous buttons
 * @returns Array of pokemon objects. 
 */
getPokemonObject = function(pokemonName,index){
                var all_pokemons = pokedata.pokemon;
                var len = all_pokemons.length;
                for(var i=0 ; i < len; i++){
                    if(all_pokemons[i]['name'].toUpperCase() === pokemonName.toUpperCase()){  //this is used to make the search case insensitive
                        return all_pokemons[i-index];
                    }
                }
                return null;
        }
/**
 * This function is used to update the image in the left side of the pokedex display div
 * @param {pokemonObj} pokemonObj is the pokemon object of which the image needs to be updated.
 * @returns Nothing. 
 */
updateImage = function(pokemonObj){
                var img_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/XXX.png';
                img_url = img_url.replace('XXX',pokemonObj['num']);
                removeClass(document.getElementById('sprite'),'is-fullSize');
                // $('#sprite').removeClass('is-fullSize');
                showImage(img_url);
        }
/**
 * This function is used to remove the class from its parenet element
 * @param {parentEl, classToBeRemoved} parentEL is the parent element from which the class classToBeRemoved is to be removed.
 * @returns Nothing. 
 */
removeClass = function(parentEl, classToBeRemoved) { // DOM element, className for remove.
			    var classes = parentEl.className.split(" ");

			    for (var i = 0; i < classes.length; i++) {
			        if (classes[i] == classToBeRemoved) {
			            // Remove class.
			            classes.splice(i, 1);
			        }
			        
			    }
			    parentEl.className = classes.join(" ");
}

/**
 * This function is used to show the image of the pokemon
 * @param {image} image is the image which has to be displayed on the pokedex
 * @returns Nothing. 
 */
showImage = function(image){
			var elem = document.getElementById('sprite');
           	elem.style.backgroundImage="url("+image+")";
}

/**
 * This function is used to show the description of the pokemon
 * @param {pokemonObj} pokemonObj is the pokemon object of which we need to update the description.
 * @returns Nothing. 
 */
updateDescription = function(pokemonObj){
           	console.log(pokemonObj);
            var description = "";
            description += get_formatted_string('Number',pokemonObj['num']);
            description += get_formatted_string('Name',pokemonObj['name']);
            description += get_formatted_string('Type',pokemonObj['type']);
            description += get_formatted_string('Height',pokemonObj['height']);
            description += get_formatted_string('Weight',pokemonObj['weight']);
            description += get_formatted_string('Candy',pokemonObj['candy']);
            description += get_formatted_string('Candy Count',pokemonObj['candy_count']);
            description += get_formatted_string('Egg',pokemonObj['egg']);
            description += get_formatted_string('Spawn Chance',pokemonObj['spawn_chance']);
            description += get_formatted_string('Avg Spawns',pokemonObj['avg_spawns']);
            description += get_formatted_string('Multipliers',pokemonObj['multipliers']);
            description += get_formatted_string('Weakness',pokemonObj['weaknesses']);
            description += get_formatted_string('Next Evolution',JSON.stringify(pokemonObj['next_evolution']));
            console.log(description);
            document.getElementById('description').innerHTML=description;

}
/**
 * This function is used to get the formatted string in ordere to show it in the description
 * @param {key,val} key is the key of the pokemon object and value is its value for that key.
 * @returns formatted string. 
 */
get_formatted_string = function(key, val){
            if(null != val && undefined != val){
                return key+" : "+val.toString()+ "<br/>";
            }
            return '';
            
        }
/**
 * This function is used to display the error when the searched pokemon does not exist.
 * @param {} None
 * @returns Nothing
 */
pokemonDoesNotExist = function(){
            var message = "pokemon not found";
            // document.getElementById('sprite').className+=' is-fullSize';
            showImage("images/error.gif");
            // errorMessage(message);
}
/**
 * This function is used to display the error message when the searched pokemon does not exist.
 * @param {} None
 * @returns Nothing
 */
errorMessage = function(message){  /*Displays the Error Message*/
            document.getElementById('description').innerHTML=message;
        }