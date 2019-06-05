levelInit(1);

function game(){	
	movement();

	draw();
	requestAnimationFrame(game);
}

game();