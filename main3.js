'use strict';

$(document).ready(init);

var pokemon;

function init() {
  console.log('ok!');
  $('#get').click(getClicked);

  $.ajax("http://pokeapi.co/api/v1/pokedex/1/", {
    success: function(data){
      pokemon = data.pokemon;
      console.log(data);
    }
  });
}

function getClicked(){
  var pokemonName = $('#pokemon').val().toLowerCase();
  var selectedPokemon = pokemon.filter(function(ob){
    return ob.name === pokemonName;
  })[0];


  ///////// PROMISES
  $.ajax("http://pokeapi.co/" + selectedPokemon.resource_uri)
  .done(function(data){
    getAvatar(data);
  })
  .fail(function(error){
    console.log("status:", error.status);
    console.log("error:", error.statusText);
  })
  .always(function(data){
    console.log('promise resolved!', data);
  })

}

function  getAvatar(pokemon){
  $.ajax("http://pokeapi.co/" + pokemon.resource_uri )
  .done(function(pokemon){
  	$.get("http://pokeapi.co/" + pokemon.sprites[0].resource_uri)
  		.done(function(data){
  			drawPokemon(pokemon, "http://pokeapi.co" + data.image);
  		});
  	});
  }

function drawPokemon(pokemon, imgUrl){
  var $card = $('<div>').addClass('card');
  var $name = $('<div>').text(pokemon.name);
  var $id = $('<div>').text('ID: ' + pokemon.national_id);
  var $attack = $('<div>').text('Attack: ' + pokemon.attack);
  var $defense = $('<div>').text('Defense: ' + pokemon.defense);
  var $avatar = $("<img>").attr("src", imgUrl).css("width","150px")
  $card.append($avatar, $name, $id, $attack, $defense );
  $('#holder').append($card);
}




