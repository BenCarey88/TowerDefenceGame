//-----------------------------------------------------------------------------------------------------------------------------------------
//MONSTER FUNCTIONS
//-----------------------------------------------------------------------------------------------------------------------------------------

function monsterMove(m){
	var j = m.track;
	switch (trackDirections[j]){
		case "down":
			m.y += m.speed;
			if (m.y > trackEnds[j][1]){
				m.track ++;
			}
			break;
		case "right":
			m.x += m.speed;
			if (m.x > trackEnds[j][0]){
				m.track ++;
			}
			break;
		case "up":
			m.y -= m.speed;
			if (m.y < trackEnds[j][1]){
				m.track ++;
			}
			break;
		case "left":
			m.x -= m.speed;
			if (m.x < trackEnds[j][0]){
				m.track ++;
			}
			break;
		case "done":
			m.escaped = true;
			break;
	}
}

function monsterDamage(){
	for (i=0; i<activeMonsters.length; i++){
		var currentMonster = activeMonsters[i];
		for(j=0; j<currentMonster.shotsIncoming.length; j++){
			var shotReachedMonster = (counter - currentMonster.shotsIncoming[j][0] >= currentMonster.shotsIncoming[j][1]);
			if (shotReachedMonster){
				currentMonster.lastHit = counter;
				currentMonster.health --;
				currentMonster.shotsIncoming.splice(j,1);
			}
		}
		var monsterDoneFlashing = (counter - currentMonster.lastHit >=50);
		if (currentMonster.health == 0 && monsterDoneFlashing){
			activeMonsters.splice(i,1);
			money += currentMonster.reward;
		}
	}
}
