//-----------------------------------------------------------------------------------------------------------------------------------------
//INITIAL VARIABLES
//-----------------------------------------------------------------------------------------------------------------------------------------

function getImg(id){
	return document.getElementById(String(id));
}

var canvas = getImg("myCanvas");		
var ctx = canvas.getContext("2d");

var currentLevel = 1;
var lives = 50;
var money = 100;
var counter = 0;

var buyPhase = true;
var floatingTower = null;
var gameNotFinished = true;
var fastForward = false;

var trackWidth = 50;
var selectedColour = "rgba(86,0,0,0.4)";
var finalLevel = 2;