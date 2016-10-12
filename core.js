/*****************
..................
Sample data
..................
******************/

var path        	= require('path');
var FOODS_PATH      = './data/maridaje.json';
var fs          	= require('fs');
var data 			= JSON.parse(fs.readFileSync(FOODS_PATH,'utf-8'));

function replaceAcuteAccents(raw){
    var output = "";
    output = raw.replace(/(á|Á)/gi,"a");
    output = output.replace(/(é|É)/gi,"e");
    output = output.replace(/í/gi,"i");
    output = output.replace(/ó/gi,"o");
    output = output.replace(/ú/gi,"u");
    output = output.replace(/ñ/gi,"n");
    output = output.replace(/\s/g, "");
    return output.toLowerCase();
}

//var sample_text = "honke";
var sample_text = "mole";
//var	criteria	= "beer";
var	criteria	= "food";
var result		= [];
var re1			= new RegExp(replaceAcuteAccents(sample_text));

if(data){

	for(var position = 0; position < data.length; position++){
		switch(criteria){
			case 'beer':
				var temp = {};
				//if(data[position].beer_name===sample_text){result=data[position].beer_name;}
				if(re1.test(data[position].beer_name_cleaned)){
					temp.beer_name = data[position].beer_name;
					temp.position = position;
					result.push(temp);
				}
			break;
			case 'food':
				var foods = data[position].foods;
				for(var pos = 0; pos < foods.length; pos++){
					if(re1.test(foods[pos].name_cleaned)){
						var temp = {};
						temp.food_name = foods[pos].name;
						temp.food_position = pos;
						result.push(temp);
					}
				}
			break;
		}
	}
}

if(result){
	console.log('result::::'+JSON.stringify(result));
}else{
	console.log('we cannot find a right beer for you :-(');
}
