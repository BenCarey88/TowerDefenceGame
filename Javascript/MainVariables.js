//-------------------------------------------------------------------------------------------------------------------------------------------
//MAIN VARIABLES
//-------------------------------------------------------------------------------------------------------------------------------------------

//track
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var trackStart = [50,0];
var trackDirections = ["down","right","up","right","down","left","down","right","up","left","up","right","down","left","down","done"]
var trackEnds = [[50,550],[200,550],[200,250],[400,250],[400,350],[300,350],[300,450],[500,450],[500,150],[200,150],[200,50],[600,50],[600,550],[350,550],[350,700]];
var trackParts = [new trackPart(trackStart,trackEnds[0])];
for (i=1; i<trackEnds.length; i++){
	trackParts.push(new trackPart(trackEnds[i-1],trackEnds[i]));
}

//monsterImages
//---------------------------------------------------------------------------------------------------------------------------------------
//----------------imgWalk1----------imgWalk2----------imgHurt----------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var spiderImgs = [getImg("spider1"),getImg("spider2"),getImg("spiderHurt")];
var goblinImgs = [getImg("goblin1"),getImg("goblin2"),getImg("goblinHurt")];

//monsterTypes
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------speed--health--reward--power---img---------W---H------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var spider = new monsterType(1.1,   3,      2,      null, 	spiderImgs, 50, 50);  //with non-integer speeds like 1.1, the action doesn't fall into rhythms
var goblin = new monsterType(2,     4,		3,		null,	goblinImgs,	100,60);

//upgradeImages
//---------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------up---------------------down-------------------unavailable----------------bought----------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var upgradeTurretRangeImgs 		 = [getImg("rangeUpgrade"),getImg("rangePressed"),getImg("rangeUnavailable"),getImg("rangeBought")];
var upgradeTurretSpeedImgs 		 = [getImg("speedUpgrade"),getImg("speedPressed"),getImg("speedUnavailable"),getImg("speedBought")];
var upgradeBulletCircleRangeImgs = [getImg("rangeUpgrade"),getImg("rangePressed"),getImg("rangeUnavailable"),getImg("rangeBought")];
var upgradeBulletCircleSpeedImgs = [getImg("speedUpgrade"),getImg("speedPressed"),getImg("speedUnavailable"),getImg("speedBought")];

//upgrades
//---------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------number--cost--type------imgs-------------------------imgNewTower-------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var turretRange 	  =	new upgrade(0,		20,	  "range",	upgradeTurretRangeImgs, 	  null	    );
var turretSpeed 	  =	new upgrade(1,		20,	  "speed",	upgradeTurretSpeedImgs, 	  null	    );
var bulletCircleRange = new upgrade(0,		20,	  "range",	upgradeBulletCircleRangeImgs, null	    );
var bulletCircleSpeed = new upgrade(1,		20,	  "speed",	upgradeBulletCircleSpeedImgs, null	    );

var turretUpgrades 		 = [turretRange,turretSpeed];
var bulletCircleUpgrades = [bulletCircleRange,bulletCircleSpeed];

//towerImages
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var turretImg 		= getImg("turret");
var bulletCircleImg = getImg("bulletCircle");

//towerTypes
//---------------------------------------------------------------------------------------------------------------------------------------
//-------------------------strength--cost--radius--reload--upgrades--------------img--------------W--H--descriptionBackground------------
//---------------------------------------------------------------------------------------------------------------------------------------
var turret 		 = new towerType(1,	 20,   100,	   100,	   turretUpgrades, 		 turretImg, 	  50,50,getImg("descriptionBackground"));
var bulletCircle = new towerType(1,  30,   100,    100,    bulletCircleUpgrades, bulletCircleImg, 60,60,getImg("descriptionBackground"));

//levels
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------number--moneyIncrease--monsterNumbers-----------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var level1 = new level(1,	   50,			  [[goblin,1],[spider,10]]);
var level2 = new level(2,	   60,		      [[spider,30]]			  );

//panelItems
//---------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------imgUp------------------imgDown-----------------------L---T---W---H---hoverImg--------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var turretButton 	   = new item(getImg("turretButton"),getImg("turretButtonClicked"),747,188,53, 62, getImg("turretDescription"));
var bulletCircleButton = new item(bulletCircleImg,		 getImg("bulletCircleClicked"),815,190,60, 60, getImg("bulletCircleDescription"));

var start 			   = new item(getImg("startButton"),getImg("startButtonClicked"),  736,530,200,75, null 						 );
var panelArea 		   = new item(null,				 	null,						   700,0,  260,640,null 						 );
var panel 			   = new item(null,				 	null,						   724,12, 225,609,null						 );
var infoPanel 		   = new item(null,				 	null,						   729,338,216,161,null						 );
var numberPanel 	   = new item(null,				 	null,						   740,30, 195,135,null						 );


//Lists
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
var monsterList = [spider,goblin];  				    //stores the different TYPES of monsters - not currently necessary
var towerList 	= [turret,bulletCircle];				//stores the different TYPES of tower
var levelList 	= [level1, level2];
var buttonList 	= [turretButton,bulletCircleButton,start];

var activeMonsters 	= [];
var activeTowers 	= [];
var shotList 		= [];

