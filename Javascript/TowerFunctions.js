//-----------------------------------------------------------------------------------------------------------------------------------------
//TOWER FUNCTIONS
//-----------------------------------------------------------------------------------------------------------------------------------------

function distanceBetween(x1,y1,x2,y2){
	return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}
function inRadius(m,t){
	if(distanceBetween(m.x,m.y,t.x,t.y) < t.radius){
		return true;
	}
	else{
		return false;
	}
}

function turretFire(t){
	for(j=0; j<activeMonsters.length; j++){
		
		var currentMonster = activeMonsters[j];
		var monsterInRadius = inRadius(currentMonster,t);
		var monsterAlive = (currentMonster.shotsIncoming.length < currentMonster.health);
		var towerReloaded = (counter - t.lastFired > t.reload);
		
		if(monsterInRadius && monsterAlive && towerReloaded){
			var time = counter;
			currentMonster.shotsIncoming.push([time,t.timeToHit]);
			t.lastFired = counter;
			
			var duplicate = new monster(currentMonster.monsterType, currentMonster.x, currentMonster.y, currentMonster.number);
			duplicate.track = currentMonster.track;
			for (k=0; k<25; k++){
				monsterMove(duplicate);
			}
			var deltaX = duplicate.x - t.x;
			var deltaY = duplicate.y - t.y;
			if(deltaY == 0){
				if(deltaX > 0){
					var theta = Math.PI/2; 
				}	
				else{
					var theta = -Math.PI/2;
				}
			}
			else if(deltaY < 0){
				var theta = Math.atan(-deltaX/deltaY);
			}
			else{
				var theta = Math.PI + Math.atan(-deltaX/deltaY);
			}
			if(t.angle > theta){
				while(t.angle - theta > Math.PI){
					theta += 2*Math.PI;
				}
			}
			if(t.angle < theta){
				while(theta - t.angle > Math.PI){
					theta -= 2*Math.PI;
				}
			}
			
			t.shotsOutgoing.push([time,(theta-t.angle)/12]);
			var newShot = new shot(t.x, t.y, (deltaX)/13, (deltaY)/13);
			newShot.lockedOn = true;
			shotList.push(newShot);
			break;
		}
	}
}
function turretSwivel(t){
	for(j=0; j<t.shotsOutgoing.length; j++){
		var currentShot = t.shotsOutgoing[0];
		if(counter - currentShot[0] < 12){
			t.angle += currentShot[1];
		}
		else t.shotsOutgoing.splice(j,1);
	}
}

function bulletCircleFire(t){
	for(j=0; j<activeMonsters.length; j++){
		var currentMonster = activeMonsters[j];
		var monsterInRadius = inRadius(currentMonster,t);
		var monsterAlive = (currentMonster.shotsIncoming.length < currentMonster.health);
		var towerReloaded = (counter - t.lastFired > t.reload);
		if(monsterInRadius && monsterAlive && towerReloaded){
			t.lastFired = counter;
			for(k=0; k<=8; k++){
				var speed = 2*t.radius/t.timeToHit;	//note the *2 here because stupidly I made timeToHit be half the time it takes to hit (see movement functions)
				shotList.push(new shot(t.x, t.y, speed*Math.cos(k*Math.PI/4), -speed*Math.sin(k*Math.PI/4)));
			}
			break;
		}
	}
}

function towerFire(t){
	switch (t.towerType){
		case turret:
			turretFire(t);
			turretSwivel(t);
			break;
		case bulletCircle:
			bulletCircleFire(t);
			break;
	}
}