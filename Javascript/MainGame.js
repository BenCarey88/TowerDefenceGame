//-----------------------------------------------------------------------------------------------------------------------------------------
//MAIN GAME
//-----------------------------------------------------------------------------------------------------------------------------------------

function movement(){
	if (!buyPhase) {
		for (i=0; i<activeTowers.length; i++){
			var t = activeTowers[i];
			if(!t.floating){
				towerFire(t);
			}
		}
		shotMove();
		monsterDamage();
		for (i=0; i<activeMonsters.length; i++){
			monsterMove(activeMonsters[i]);
			if (activeMonsters[i].escaped){
				activeMonsters.splice(i,1);
				lives--;
			}
		}
		counter++;
		checkLevelEnd();
	}
}

function draw(){
	drawBackground();
	drawTrack();
	drawText();
	drawButtons();
	if (!buyPhase){
		for (i=0; i<activeMonsters.length; i++){
			drawMonster(activeMonsters[i]);
		}
		drawShots();
	}
	drawTowerSelected();
	drawTowerDescriptions();
	drawTowers();
}

function game(){	
	movement();
	if(fastForward){
		movement();
	}
	draw();
	requestAnimationFrame(game);
}


levelInit(1);
game();