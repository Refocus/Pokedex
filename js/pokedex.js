$(function(){

    /*This function is used to get a (key,value) pair formatted structure from the given JSON data so as to display it in the description of a pokemon*/
    function get_formatted_string(key, val){
            if(null != val && undefined != val){
                return key+" : "+val.toString()+ "<br/>";
            }
            return '';
            
        };
    var pokemon = {
        /*This function is called when there is no pokemon with the search the search value and displays a error message*/
        pokemonDoesNotExist : function(error){
            var self    = pokemon;
            var message = "pokemon not found";
            $('#sprite').addClass('is-fullSize');
            self.showImage("images/error.gif");
            self.errorMessage(message);

        },

        errorMessage : function(message){  /*Displays the Error Message*/
            $('#description').html(message);
        },

        /*This function used to display the image in the div of display screen*/
        showImage : function(image){
           $('#sprite').css('background-image',"url("+image+")");
        },
        /*This function is initiated on entering a pokemon name and pressing Enter*/
        formSubmit : function(){
            var self = this;
            $('#search').on('submit',function(e){
                e.preventDefault();
                var pokemonName = $('#search').find('input').val();
                var pokeObj = self.getPokemonObject(pokemonName);
                if(null == pokeObj){
                    self.pokemonDoesNotExist();
                }else{
                    self.updateImage(pokeObj);  
                    self.updateDescription(pokeObj);
                }
                
            });
        },
        /*This function returns the Total Data related to the searched pokemon from the given JSON file*/
        getPokemonObject : function(pokemonName){
                var all_pokemons = pokedata.pokemon;
                var len = all_pokemons.length;
                console.log(pokemonName);
                for(var i=0 ; i < len; i++){
                    if(all_pokemons[i]['name'].toUpperCase() === pokemonName.toUpperCase()){
                        return all_pokemons[i];
                    }
                }
                return null;
        },
        /*This function is used to update the image in the left side of the pokedex display div*/
        updateImage : function(pokemonObj){
                var self = pokemon;
                var img_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/XXX.png';
                img_url = img_url.replace('XXX',pokemonObj['num']);
                $('#sprite').removeClass('is-fullSize');
                self.showImage(img_url);
        },
        /* This function is used to update the description related to a pokemon the right side of the pokedex*/
        updateDescription : function(pokemonObj){
            var self = pokemon;
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
            $('#description').html(description);


        },
        init : function(){
            var self = this;
            self.formSubmit();
        }
    };

    pokemon.init();


});