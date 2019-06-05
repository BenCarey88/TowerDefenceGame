//-----------------------------------------------------------------------------------------------------------------------------------------
//CONSTRUCTOR FUNCTIONS
//note: in all cases attributes start with lowercase, except for Left, Right, Top, Bottom, Width and Height - this is because 'top' is a reserved word (I think?)
//-----------------------------------------------------------------------------------------------------------------------------------------

function item(imgUp,imgDown,Left,Top,Width,Height,hoverImg){
	this.imgUp = imgUp;
	this.imgDown = imgDown;
	this.Left = Left;
	this.Top = Top;
	this.Right = Left + Width;
	this.Bottom = Top + Height;
	this.Width = Width;
	this.Height = Height;
	this.clicked = false;
	this.hover = false;
	this.hoverImg = hoverImg;
}
function trackPart(start,end){
	this.Left = Math.min(start[0],end[0]) - trackWidth/2;
	this.Top = Math.min(start[1],end[1]) - trackWidth/2;
	this.Right = Math.max(start[0],end[0]) + trackWidth/2;
	this.Bottom = Math.max(start[1],end[1]) + trackWidth/2;
	this.Width = Math.abs(start[0]-end[0]) + trackWidth;
	this.Height = Math.abs(start[1]-end[1]) + trackWidth;
}

function monsterType(speed,health,reward,power,img,Width,Height){
	this.speed = speed;
	this.health = health;
	this.reward = reward;
	this.power = power;
	this.img = img;
	this.Width = Width;
	this.Height = Height;
}
function monster(monsterType,x,y,number){
	this.monsterType = monsterType;
	this.x = x;
	this.y = y;
	this.number = number;						//the number is a randomizer to make the motion less formulaic;
	
	this.speed = monsterType.speed;
	this.health = monsterType.health;
	this.reward = monsterType.reward;
	this.power = monsterType.power;
	this.img = monsterType.img;
	this.Width = monsterType.Width;
	this.Height = monsterType.Height;
	
	this.shotsIncoming = [];			//this is a list of pairs (size 2 lists) of the form [a,b] where a is the time the shot was fired, b is its timeToHit
	this.lastHit = -1000;
	this.dying = false;
	this.escaped = false;
	this.track = 0;
}

function towerType(strength,cost,radius,reload,upgrades,img,Width,Height,descriptionBackground){
	this.strength = strength;
	this.cost = cost;
	this.radius = radius;
	this.reload = reload;
	this.upgrades = upgrades;
	this.img = img;
	this.Width = Width;
	this.Height = Height;
	this.descriptionBackground = descriptionBackground;
	
	this.timeToHit = 30;		//this is the time it takes for the shots to hit (only relevant for some towers) - gets passed on as a shot property later
}
function tower(towerType,x,y){
	this.towerType = towerType;
	this.x = x;
	this.y = y;
	
	this.strength = towerType.strength;
	this.cost = towerType.cost;
	this.radius = towerType.radius;
	this.reload = towerType.reload;
	this.upgrades = towerType.upgrades;
	this.img = towerType.img;
	this.descriptionBackground = towerType.descriptionBackground;
	this.timeToHit = towerType.timeToHit;
	
	this.Width = towerType.Width;
	this.Height = towerType.Height;
	this.Left = x - towerType.Width/2;
	this.Top = y - towerType.Height/2;
	this.Right = x + towerType.Width/2;
	this.Bottom = y + towerType.Height/2;
	
	this.angle = 0;
	this.shotsOutgoing = [];
	this.lastFired = -1000;
	this.floating = false;
	this.placedDown = false;
	this.clicked = false;
	this.selected = false;
}

function upgrade(number,cost,type,imgs,imgNewTower){
	this.number = number;						//number determines whether the button is first or second
	this.cost = cost;
	this.type = type;
	this.imgs = imgs;
	this.imgUp = imgs[0];
	this.imgDown = imgs[1];
	this.imgUnavailable = imgs[2];
	this.imgBought = imgs[3];
	this.imgNewTower = imgNewTower;
	
	this.Left = 740 + number*105;
	this.Top = 350;
	this.Right = 830 + number*105;
	this.Bottom = 490;
	this.Width = this.Right - this.Left;
	this.Height = this.Bottom - this.Top;
	
	this.img = imgs[0];
	this.clicked = false;
	this.bought = false;
}

function shot(x,y,dx,dy){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.startTime = counter;
	this.lockedOn = false;				//this is a toggle to show whether the shot is locked onto a certain monster or not
	this.timeToHit = 30;
}

function level(number, moneyIncrease, monsterNumbers){
	this.number = number;
	this.moneyIncrease = moneyIncrease;		//=amount of money awarded at end of level
	this.monsterNumbers = monsterNumbers;
	//monsterNumbers is list of form eg. [[Goblin,10],[Spider,30],[Goblin,20]...] - means 10 goblins, then 30 spiders, then 20 Goblins....
}

