//-----------------------------------------------------------------------------------------------------------------------------------------
//MOUSE EVENT HANDLERS
//-----------------------------------------------------------------------------------------------------------------------------------------

function over(item,x,y) {
	var relativeX = x - canvas.offsetLeft;	
	var relativeY = y - canvas.offsetTop;
	if(relativeX > item.Left && relativeX < item.Right && relativeY > item.Top && relativeY < item.Bottom){
		return true;
	}
	else {
		return false;
	}
}
function towerOver(tower,item,x,y){
	var relativeX = x - canvas.offsetLeft;	
	var relativeY = y - canvas.offsetTop;
	tower.Left = relativeX - tower.Width/2;
	tower.Top = relativeY - tower.Height/2;
	tower.Right = relativeX + tower.Width/2;
	tower.Bottom = relativeY + tower.Height/2;
	if(tower.Left < item.Left){
		var leftObject = tower;
		var rightObject = item;
	}
	else{
		var leftObject = item;
		var rightObject = tower;
	}
	if(tower.Top < item.Top){
		var topObject = tower;
		var bottomObject = item;
	}
	else{
		var topObject = item;
		var bottomObject = tower;
	}
	if((leftObject.Right > rightObject.Left)&&(topObject.Bottom > bottomObject.Top)){
		return true;
	}
	else{
		return false;
	}
}

function overTrack(x,y){
	var result = false;
	for(i=0; i<trackParts.length; i++){
		if(over(trackParts[i],x,y)){
			result = true;
			break;
		}
	}
	return result;
}
function overOtherTower(tower,x,y){
	var result = false;
	for(i=0; i<activeTowers.length - 1; i++){
		if(towerOver(tower,activeTowers[i],x,y)){
			result = true;
			break;
		}
	}
	return result;
}
function placeable(tower,x,y){
	return (!overTrack(x,y) && !towerOver(tower,panelArea,x,y) && !overOtherTower(tower,x,y));
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function mouseDownHandler(e) {
	if(!floatingTower){
		for(i=0; i<activeTowers.length; i++){
			var t=activeTowers[i];
//SELECTING TOWERS
			if (over(t,e.clientX,e.clientY)){
				t.clicked = true;
			}
//BUYING UPGRADES	
			for(j=0; j<2; j++){
				if (t.selected && over(t.upgrades[j],e.clientX,e.clientY) && !t.upgrades[j].bought && money>=t.upgrades[j].cost){
					t.upgrades[j].clicked = true;
				}
			}
		}
//BUYING TOWERS & CLICKING START
		for(i=0; i<buttonList.length; i++){
			if (over(buttonList[i],e.clientX,e.clientY)){
				buttonList[i].clicked = true;
			}
		}
//CHECKING IF OVER INFOPANEL
		if(over(infoPanel,e.clientX,e.clientY)){
			infoPanel.clicked = true;
		}
	}
//PLACING TOWERS
	if(floatingTower && placeable(floatingTower,e.clientX,e.clientY)){
		floatingTower.placedDown = true;
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function mouseUpHandler(e) {
	for(i=0; i<activeTowers.length; i++){
		var t = activeTowers[i];
//SELECTING TOWERS
		if(t.clicked && over(t,e.clientX,e.clientY)){
			t.selected = true;
		}
//DESELECTING TOWERS
		if(!t.clicked && !over(t,e.clientX,e.clientY) && !infoPanel.clicked && !start.clicked && !floatingTower){
			t.selected = false;
		}
		t.clicked = false;
//BUYING UPGRADES
		for(j=0; j<2; j++){
			if (t.selected){
				t.upgrades[j].img = t.upgrades[j].imgUp;
				if(t.upgrades[j].clicked && over(t.upgrades[j],e.clientX,e.clientY)){
					t.upgrades[j].bought = true;
					money -= t.upgrades[j].cost;
					switch (t.upgrades[j].type){
						case "range":
							t.radius *= 1.5; 
							break;
						case "speed":
							t.reload *= 0.75;
							break;
					}
				}
				t.upgrades[j].clicked = false;	
			}
		}
	}
//CLICKING START	
	if (start.clicked){
		if (over(start,e.clientX,e.clientY) && gameNotFinished){ 
			buyPhase = false;
		}
		start.clicked = false;
	}
//CHECKING IF OVER INFOPANEL
	infoPanel.clicked = false;
//BUYING TOWERS
	for(i=0; i<buttonList.length-1; i++){
		var b = buttonList[i];
		var t = towerList[i];
		if(b.clicked){
			if(over(b,e.clientX,e.clientY) && money >= t.cost){
				floatingTower = new tower(t,e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop);
				floatingTower.selected = true;
				floatingTower.floating = true;
				activeTowers.push(floatingTower);
			}
			b.clicked = false;
		}
	}
//PLACING TOWERS
	if(floatingTower){
		if(placeable(floatingTower,e.clientX,e.clientY) && floatingTower.placedDown){
			activeTowers.pop();
			var newTower = new tower(floatingTower.towerType, floatingTower.x, floatingTower.y);
			newTower.selected = true;
		//this next bit is here to ensure that towers of the same type don't all share the same upgrades
			var u0 = newTower.upgrades[0];
			var u1 = newTower.upgrades[1];
			var upgrade1 = new upgrade(0, u0.cost, u0.type, u0.imgs, u0.imgNewTower);
			var upgrade2 = new upgrade(1, u1.cost, u1.type, u1.imgs, u1.imgNewTower);
			newTower.upgrades = [upgrade1,upgrade2];
			activeTowers.push(newTower);
			floatingTower = null;
			money -= newTower.cost;
		}
		else{
			floatingTower.placedDown = false;
		}
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function mouseMoveHandler(e) {
//CHECK IF FLOATING TOWER IS PLACEABLE
	if(floatingTower){
		floatingTower.x = e.clientX-canvas.offsetLeft;
		floatingTower.y = e.clientY-canvas.offsetTop;
		if(placeable(floatingTower, e.clientX, e.clientY)){
			selectedColour = "rgba(86,221,255,0.4)";
		}
		else{
			selectedColour = "rgba(86,0,0,0.4)";
		}
	}
//HOVERING OVER BUTTONS
	if(!floatingTower){
		for(i=0; i<buttonList.length - 1; i++){
			if(over(buttonList[i],e.clientX,e.clientY)){
				buttonList[i].hover = true;
			}
			else{
				buttonList[i].hover = false;
			}
		}
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function keyDownHandler(e){
//CANCEL FLOATING TOWER WITH ESC
	if(floatingTower && e.keyCode == 27){
		activeTowers.pop();
		floatingTower = null;
	}
//FAST-FORWARD
	if(e.keyCode == 39){
		fastForward = true;
	}
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function keyUpHandler(e){
	if(e.keyCode == 39){
		fastForward = false
	}
}