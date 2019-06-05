//-----------------------------------------------------------------------------------------------------------------------------------------
//MOVEMENT ETC. FUNCTIONS (excluding monster and tower functions)
//-----------------------------------------------------------------------------------------------------------------------------------------

function levelInit(i){
	activeMonsters = [];
	shotList = [];
	var placeInLine = 0;
	for (j=0; j<levelList[i-1].monsterNumbers.length; j++){
		for (k=0; k<levelList[i-1].monsterNumbers[j][1]; k++){
			placeInLine ++;
			var currentMonsterType = levelList[i-1].monsterNumbers[j][0];
			var currentMonster = new monster(currentMonsterType,50,-50*placeInLine,Math.floor(Math.random()*10));
			activeMonsters.push(currentMonster);
		}
	}
}

function shotMove(){
	for (i=0; i<shotList.length; i++){
		var currentShot = shotList[i];
		if (counter - currentShot.startTime >= currentShot.timeToHit){
			shotList.splice(i,1);
		}
		else if(counter - currentShot.startTime >= currentShot.timeToHit/2){
			currentShot.x += currentShot.dx;
			currentShot.y += currentShot.dy;
		}
		
		//this next bit is for the shots from things like bulletCircle, which aren't automatically locked onto a certain monster
		
		if(!currentShot.lockedOn){
			for (j=0; j<activeMonsters.length; j++){
				var m = activeMonsters[j];
				if(currentShot.x > m.x - m.Width/4 && currentShot.x < m.x + m.Width/4 && currentShot.y > m.y - m.Height/4 && currentShot.y < m.y + m.Height/4){
					if(m.shotsIncoming.length < m.health){
						m.shotsIncoming.push([counter - currentShot.timeToHit,currentShot.timeToHit]);
						currentShot.lockedOn = true;
					}
				}
			}
		}
	}
}

function checkLevelEnd(){
	if (activeMonsters.length == 0){
		money += levelList[currentLevel-1].moneyIncrease;
		buyPhase = true;
		counter = 0;
		for (i=0; i<activeTowers.length; i++){
			activeTowers[i].lastFired = -1000;
		}
		if(currentLevel + 1 <= finalLevel){
			currentLevel++;
			levelInit(currentLevel);
		}
		else{
			gameNotFinished = false;
		}
	}
}