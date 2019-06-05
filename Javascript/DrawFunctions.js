//-----------------------------------------------------------------------------------------------------------------------------------------
//DRAW FUNCTIONS
//-----------------------------------------------------------------------------------------------------------------------------------------

function drawBackground(){
	ctx.fillStyle = "#15B544";
	ctx.fillRect(0,0,960,640);
	
	ctx.fillStyle = "#E3E0CF";
	ctx.strokeStyle = "Black";
	ctx.lineWidth = 3;
	ctx.beginPath()
	ctx.rect(panel.Left,panel.Top,panel.Width,panel.Height);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	
	ctx.fillStyle = "#B9B5A1";
	ctx.beginPath();
	ctx.rect(infoPanel.Left,infoPanel.Top,infoPanel.Width,infoPanel.Height);
	ctx.rect(numberPanel.Left,numberPanel.Top,numberPanel.Width,numberPanel.Height);
	ctx.rect(start.Left,start.Top,start.Width,start.Height);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function drawTrack(){
	for (i=0; i<trackParts.length; i++){
		var t = trackParts[i];
		ctx.fillStyle = "#FFEEB6";
		ctx.fillRect(t.Left,t.Top,t.Width,t.Height);
	}
}
function drawText(){
	ctx.font = "bold 20px Arial";
	ctx.fillStyle = "Black";
	ctx.fillText("Level: " + currentLevel,760,60);
	ctx.fillText("Lives: " + lives,760,100);
	ctx.fillText("Money: " + money,760,140);
}

function drawButtons(){
	for(i=0; i<buttonList.length; i++){
		var b = buttonList[i];
		if(b.clicked){
			var img = b.imgDown;
		}
		else{
			var img = b.imgUp;
		}
		ctx.drawImage(img,b.Left,b.Top,b.Width,b.Height);
	}
}

function drawHealthBar(m){
	ctx.fillStyle = "#55FF88";
	ctx.fillRect(10,15,m.Width/2,5);
	ctx.fillStyle = "#A9190B";
	var proportionHealthLeft = 1 - m.health/m.monsterType.health;
	if (counter - m.lastHit < 50 && counter%10 >= 5){
		ctx.fillRect(10,15,(proportionHealthLeft-1)*m.Width/2,5);
	}
	else{
		ctx.fillRect(10,15,(proportionHealthLeft)*m.Width/2,5);
	}
}


function drawMonster(m){
	var i = 0;
	if ((counter+m.number)%16>=8){
		if (counter - m.lastHit < 50){
			i=2;
		}
		else {
			i=1;
		}
	}
	var j = m.track;
	ctx.save();
	ctx.translate(m.x, m.y);
	drawHealthBar(m);
	switch (trackDirections[j]){
		case "down":
			break;
		case "right":
			ctx.rotate(-Math.PI/2);
			break;
		case "up":
			ctx.rotate(Math.PI);
			break;
		case "left":
			ctx.rotate(Math.PI/2);
			break;
	}
	ctx.drawImage(m.img[i], -m.Width/2, -m.Height/2, m.Width, m.Height);

	ctx.restore();
}

function drawShots(){
	for (i=0; i<shotList.length; i++){
		var currentShot = shotList[i];
		ctx.beginPath();
		ctx.arc(currentShot.x, currentShot.y, 5, 0, Math.PI*2);
		ctx.fillStyle = "Red";
		ctx.fill();
		ctx.closePath();
	}
}

function drawTowers(){
	for (i=0; i<activeTowers.length; i++){
		var t = activeTowers[i];
		ctx.drawImage(t.img, t.x-t.Width/2, t.y-t.Height/2, t.Width, t.Height);
		switch (t.towerType){
			case turret: 
				ctx.fillStyle = "Grey";
				ctx.save();
				ctx.translate(t.x,t.y)
				ctx.rotate(t.angle);
				ctx.fillRect(-10, -45, 20, 45);
				ctx.restore();
				break;
			default:
				break;
		}
	}
}

function drawTowerSelected(){
	for (i=0; i<activeTowers.length; i++){
		var t = activeTowers[i];
		if (t.selected){			
			ctx.drawImage(activeTowers[i].descriptionBackground,infoPanel.Left,infoPanel.Top,infoPanel.Width,infoPanel.Height);
			
			for(j=0; j<2; j++){
				var u = t.upgrades[j];
				if(u.bought){
					u.img = u.imgBought;
				}
				else if(money < u.cost){
					u.img = u.imgUnavailable;
				}
				else if(u.clicked){
					u.img = u.imgDown;
				}
				else{
					u.img = u.imgUp;
				}
				ctx.drawImage(u.img,u.Left,u.Top,u.Width,u.Height);
			}
			
			ctx.beginPath();
			ctx.arc(t.x, t.y, t.radius, 0, Math.PI*2);
			ctx.fillStyle = selectedColour;
			ctx.fill();
			ctx.closePath();
		}
	}
}
function drawTowerDescriptions(){
	for(i=0; i<buttonList.length-1; i++){
		if(buttonList[i].hover){
			ctx.drawImage(buttonList[i].hoverImg,infoPanel.Left,infoPanel.Top,infoPanel.Width,infoPanel.Height);
		}
	}
}