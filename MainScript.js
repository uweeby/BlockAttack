//Menu objects
var BlackFILL : GameObject;
BlackFILL.renderer.material.color = Color.black;


//FSM control
var gamestate = 1; //1: menu, 2: game, 3: pause, 4: gameover, 5: how to play


//Track location of the paddles
var paddle : GameObject;
var paddlex = 0;
var paddley = 0;


//Scoring
var Score = 0;
var sixcombo = 270;
var fivecombo = 90;
var fourcombo = 30;
var threecombo = 10;

//Difficulty
var difficulty = 1; //Debug: 0, Easy: 1, Medium: 2, Hard: 3, Xtreme: 4
var totaltime = 0.0;
var reservetime = 14.0; //default setting for easy
var diffmultiplier = 0;
var diffSELECETED = 0; //if no difficulty is manually selected on load the game will freak out

//Break Bars
var BreakBARS : GameObject;
var breakSTATE = 0;
var breaktime = 0.0;

//Array holds the total number of possible colors for blocks
var colors = new Array (
Color.black, 
Color.red, 
Color.blue, 
Color.green, 
Color.yellow, 
Color.magenta, 
Color.white);

//array holds the interger value of colors for every block. 
//Set to 0 to start the game (black) so the field is empty
var cubecolor = new Array (
0,
0,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,0,
0,0,0,0,0,0);

var cubearr = new Array ();
cubearr[0] = null; //placeholder

//Row00
cube01 = GameObject.Find("Cube0" + 1);
cubearr[1] = cube01;
cube02 = GameObject.Find("Cube02");
cubearr[2] = cube02;
cube03 = GameObject.Find("Cube03");
cubearr[3] = cube03;
cube04 = GameObject.Find("Cube04");
cubearr[4] = cube04;
cube05 = GameObject.Find("Cube05");
cubearr[5] = cube05;
cube06 = GameObject.Find("Cube06");
cubearr[6] = cube06;

//Row01
cube11 = GameObject.Find("Cube11");
cubearr[7] = cube11;
cube12 = GameObject.Find("Cube12");
cubearr[8] = cube12;
cube13 = GameObject.Find("Cube13");
cubearr[9] = cube13;
cube14 = GameObject.Find("Cube14");
cubearr[10] = cube14;
cube15 = GameObject.Find("Cube15");
cubearr[11] = cube15;
cube16 = GameObject.Find("Cube16");
cubearr[12] = cube16;

//Row02
cube21 = GameObject.Find("Cube21");
cubearr[13] = cube21;
cube22 = GameObject.Find("Cube22");
cubearr[14] = cube22;
cube23 = GameObject.Find("Cube23");
cubearr[15] = cube23;
cube24 = GameObject.Find("Cube24");
cubearr[16] = cube24;
cube25 = GameObject.Find("Cube25");
cubearr[17] = cube25;
cube26 = GameObject.Find("Cube26");
cubearr[18] = cube26;

//Row03
cube31 = GameObject.Find("Cube31");
cubearr[19] = cube31;
cube32 = GameObject.Find("Cube32");
cubearr[20] = cube32;
cube33 = GameObject.Find("Cube33");
cubearr[21] = cube33;
cube34 = GameObject.Find("Cube34");
cubearr[22] = cube34;
cube35 = GameObject.Find("Cube35");
cubearr[23] = cube35;
cube36 = GameObject.Find("Cube36");
cubearr[24] = cube36;

//Row04
cube41 = GameObject.Find("Cube41");
cubearr[25] = cube41;
cube42 = GameObject.Find("Cube42");
cubearr[26] = cube42;
cube43 = GameObject.Find("Cube43");
cubearr[27] = cube43;
cube44 = GameObject.Find("Cube44");
cubearr[28] = cube44;
cube45 = GameObject.Find("Cube45");
cubearr[29] = cube45;
cube46 = GameObject.Find("Cube46");
cubearr[30] = cube46;

//Row05
cube51 = GameObject.Find("Cube51");
cubearr[31] = cube51;
cube52 = GameObject.Find("Cube52");
cubearr[32] = cube52;
cube53 = GameObject.Find("Cube53");
cubearr[33] = cube53;
cube54 = GameObject.Find("Cube54");
cubearr[34] = cube54;
cube55 = GameObject.Find("Cube55");
cubearr[35] = cube55;
cube56 = GameObject.Find("Cube56");
cubearr[36] = cube56;

//Row06
cube61 = GameObject.Find("Cube61");
cubearr[37] = cube61;
cube62 = GameObject.Find("Cube62");
cubearr[38] = cube62;
cube63 = GameObject.Find("Cube63");
cubearr[39] = cube63;
cube64 = GameObject.Find("Cube64");
cubearr[40] = cube64;
cube65 = GameObject.Find("Cube65");
cubearr[41] = cube65;
cube66 = GameObject.Find("Cube66");
cubearr[42] = cube66;

//Row07
cube71 = GameObject.Find("Cube71");
cubearr[43] = cube71;
cube72 = GameObject.Find("Cube72");
cubearr[44] = cube72;
cube73 = GameObject.Find("Cube73");
cubearr[45] = cube73;
cube74 = GameObject.Find("Cube74");
cubearr[46] = cube74;
cube75 = GameObject.Find("Cube75");
cubearr[47] = cube75;
cube76 = GameObject.Find("Cube76");
cubearr[48] = cube76;

//Controls game flow
function Update () {
//check for gamestate
	if (gamestate == 2) { // gameplay
		Controls();
		totaltime += Time.deltaTime; //sets up timer

		//Draw call. Only used once
		for (i = 1; i < 49	; i ++) { //offset for the placeholder
			cubearr[i].renderer.material.color = colors[cubecolor[i]];
		}
		if (cubecolor[43] + cubecolor[44] + cubecolor[45] + cubecolor[46] + cubecolor[47] + cubecolor[48] == 0) {
			breakSTATE = 0;
		}

		if (cubecolor[43] + cubecolor[44] + cubecolor[45] + cubecolor[46] + cubecolor[47] + cubecolor[48] > 0) {
			breakSTATE = 1;
		}
		
		DifficultyMode();
		ScoreCheck();
		Gravity();
		Break();
	}


	if (gamestate == 4) { // gameover
			//save score. clean up game. offer retry.

	}	
}

function NewGame() {
	//Array that linnks the blocks to game objects to be used by this script.
	//Sorted into rows for easy reading
	//var cubearr = new Array ();
	//Row00
	//var cube01 : GameObject;
	var cube02 : GameObject;
	var cube03 : GameObject;
	var cube04 : GameObject;
	var cube05 : GameObject;
	var cube06 : GameObject;
	
	//Row01
	var cube11 : GameObject;
	var cube12 : GameObject;
	var cube13 : GameObject;
	var cube14 : GameObject;
	var cube15 : GameObject;
	var cube16 : GameObject;
	
	//Row02
	var cube21 : GameObject;
	var cube22 : GameObject;
	var cube23 : GameObject;
	var cube24 : GameObject;
	var cube25 : GameObject;
	var cube26 : GameObject;
	
	//Row03
	var cube31 : GameObject;
	var cube32 : GameObject;
	var cube33 : GameObject;
	var cube34 : GameObject;
	var cube35 : GameObject;
	var cube36 : GameObject;
	
	//Row04
	var cube41 : GameObject;
	var cube42 : GameObject;
	var cube43 : GameObject;
	var cube44 : GameObject;
	var cube45 : GameObject;
	var cube46 : GameObject;
	
	//Row05
	var cube51 : GameObject;
	var cube52 : GameObject;
	var cube53 : GameObject;
	var cube54 : GameObject;
	var cube55 : GameObject;
	var cube56 : GameObject;
	
	//Row06
	var cube61 : GameObject;
	var cube62 : GameObject;
	var cube63 : GameObject;
	var cube64 : GameObject;
	var cube65 : GameObject;
	var cube66 : GameObject;
	
	//Row07
	var cube71 : GameObject;
	var cube72 : GameObject;
	var cube73 : GameObject;
	var cube74 : GameObject;
	var cube75 : GameObject;
	var cube76 : GameObject;



	gamestate = 2;
	BlackFILL.renderer.enabled = false;
	CreateReserve();
	CreateReserve();
				
	paddle.transform.Translate(3,0,0); //set paddle to center
	paddlex = 3;
	paddley = 1;
}

function QuitGame() { //cleanup after game has ended
	cubecolor = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	Score = 0;
	paddle.transform.position = Vector3(0, 0, 0); //set paddle to cente
	paddlex = 3;
	paddley = 1;
	
	totaltime = 0.0;
	reservetime = 14.0;
	breakSTATE = 0;
	breaktime = 0.0;
	BreakBARS.transform.position = Vector3(0, 0, 0);
	
	gamestate = 1;
}



function OnGUI () { //GUI for menu elements

	
	if (gamestate == 1) { //while in menu draw menu GUI
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"");
		
		
		if (GUI.Button (Rect (10,10,200,40), "New Game")) {
			if (diffSELECETED == 1) { //if no difficulty is manually selected on load the game will freak out
				NewGame();
			}
		}
		
		if (GUI.Button (Rect (10,60,60,20), "Easy")) {
			difficulty = 1;
			reservetime = 14;
			diffSELECETED = 1;
		}
		
		if (GUI.Button (Rect (80,60,60,20), "Medium")) {
			difficulty = 2;
			reservetime = 12;
			diffSELECETED = 1;
		}
		
		if (GUI.Button (Rect (150,60,60,20), "Hard")) {
			difficulty = 3;
			reservetime = 10;
			diffSELECETED = 1;
		}
		
		
		if (GUI.Button (Rect (10,120,200,40), "How To Play")) {
			gamestate = 5;
				
		}
		
		if (GUI.Button (Rect (10,200,100,40), "Exit")) {
			Application.Quit();	
		}
	}
	
	if (gamestate == 2) { //Game Play
		GUI.Label (Rect (10, 20, 300, 30), "Score: " + Score);
	}
	
	
	if (gamestate == 3) { //Pause
		BlackFILL.renderer.enabled = true;
		
		if (GUI.Button (Rect (10,10,100,40), "Resume")) {
			BlackFILL.renderer.enabled = false;
			gamestate = 2;
		}
		
		if (GUI.Button (Rect (10,200,100,40), "Quit to Menu")) { //clean up before leaving to menu
			QuitGame();	
		}
	}
	
	if (gamestate == 4) { //Game Over
		BlackFILL.renderer.enabled = true;
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"Game Over");
		
		GUI.Label (Rect (10, 20, 300, 30), "Score: " + Score);
		
		if (GUI.Button (Rect (10,200,100,40), "Quit to Menu")) {
			QuitGame();
		}
	}
	
	if (gamestate == 5) { //while in menu draw menu GUI
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"How To Play");
		
		GUI.Label (Rect (10, 20, 300, 30), "GOAL: Keep the blocks from filling the screen!");
		GUI.Label (Rect (10, 50, 300, 30), "Match 3, 4 or 5 similarly colored boxes to get points");
		GUI.Label (Rect (10, 70, 300, 30), "Use the paddle to swap two blocks horizontally");
		GUI.Label (Rect (10, 90, 300, 30), "Blocks can fall when nothing is left to support it");
		GUI.Label (Rect (10, 120, 300, 30), "Controls: W/A/S/D/Arrows - Move Paddle");
		GUI.Label (Rect (10, 140, 300, 30), "              Space - Swap selected Blocks");
		GUI.Label (Rect (10, 160, 300, 30), "              Enter - Generate new blocks");
		
		if (GUI.Button (Rect (10,200,100,40), "Back")) {
			gamestate = 1;	
		}
	}	

}


//Game code
function DifficultyMode () { //sets up the game speed and scoring based on difficulty selected

	if (difficulty == 1) { //easy
		diffmultiplier = 1;
		if (totaltime > reservetime) {
			if (reservetime < 5) { //limit how fast blocks can spawn
				reservetime = reservetime - .25; //spawn decay
			}
			totaltime = 0; //reset the counter
			CreateReserve(); //spawn new blocks
		}
	}

	if (difficulty == 2) { //medium
		diffmultiplier = 1.5;
		if (totaltime > reservetime) {
			if (reservetime < 4) { //limit how fast blocks can spawn
				reservetime = reservetime - .25; //spawn decay
			}
			totaltime = 0; //reset the counter
			CreateReserve(); //spawn new blocks
		}
	}

	if (difficulty == 3) { //hard
		diffmultiplier = 2;
		if (totaltime > reservetime) {
			reservetime = reservetime - .25; //spawn decay
			if (reservetime < 3) { //limit how fast blocks can spawn
				reservetime = 3;
			}
			totaltime = 0; //reset the counter
			CreateReserve(); //spawn new blocks
		}
	}
}


//Game code
function Gravity () {
//Check the block below each block to see if its empty. If it is then the block falls

		for (i = 48; i > 12; i --) {
			if (cubecolor[i - 6] == 0) {
				cubecolor[i - 6] = cubecolor[i];
				cubecolor[i] = 0;
			}
		}

}


function Break() { 
//Called when the top row has a block in it and no new blocks can be made
//Once the time limit expires and blocks are still in the top row you lose the game
//getting a combo during this time will reduce count



	if(breakSTATE == 1) {
		breaktime += Time.deltaTime;
		if (breaktime > 10) { //give the player 10 seconds to clear the top row
			gamestate = 4;
		}
		BreakBARS.transform.position = Vector3(0, breaktime * 1.26, 0);
	}
}

//Game code
function CreateReserve () { 
//this function randomly generates new colors for the bottom row of blocks. 
//After a time delay it will push them up/
//A check needs to be done to make sure that no more than 2 blocks of this new row are the same color. (free points)

//update cubecolor array with the new values for the blocks


//Check to see if the top row is full.
	if (cubecolor[43] + cubecolor[44] + cubecolor[45] + cubecolor[46] + cubecolor[47] + cubecolor[48] == 0) {
		for (i = 42; i > 0; i --) {
			cubecolor[i + 6] = cubecolor[i];
		}
		totaltime = 0.0;

		ranone = Random.Range(1,7);
		rantwo = Random.Range(1,7);
		ranthree = Random.Range(1,7);
		ranfour = Random.Range(1,7);
		ranfive = Random.Range(1,7);
		ransix = Random.Range(1,7);
		
		//make sure no two blocks in a row are the same color (or three blocks for a free point)
		//this code will not 100% eliminate similar blocks but it reduces the chance greatly
		if (ranone == rantwo) {
			rantwo = Random.Range(1,7);
		}
		
		if (rantwo == ranthree) {
			ranthree = Random.Range(1,7); 
		}
		
		if (ranthree == ranfour) {
			ranfour = Random.Range(1,7);
		}
		
		if (ranfour == ranfive) {
			ranfive = Random.Range(1,7);
		}
		
		if (ransix == ranfive) {
			ransix = Random.Range(1,7);
		}
	
		cubecolor[1] = ranone;
		cubecolor[2] = rantwo;
		cubecolor[3] = ranthree;
		cubecolor[4] = ranfour;
		cubecolor[5] = ranfive;
		cubecolor[6] = ransix;
		
		//reservetime = reservetime - 0.25;
	
		if (difficulty == 1 && reservetime > 5) {
			reservetime = reservetime - 0.25;
		}
	
		if (difficulty == 2 && reservetime > 4) {
			reservetime = reservetime - 0.5;
		}
		
		if (difficulty == 3 && reservetime > 3) {
			reservetime = reservetime - 0.75;
		}
		
		//move the paddle up when reserve happens so you dont freak out
		if (paddley > 6) { //move paddle but not out of bounds.
				paddle.transform.Translate(0,1.5,0);
				paddley = paddley + 1;
		}		
	}
	ScoreCheck();	
}


//Game code
function Controls() {
var flipright = 0;
var flipleft = 0;
var currentcube = 0;



//Controls
	if (Input.GetKeyDown ("w") || Input.GetKeyDown ("up")) //up
		{
		if (paddley != 7) { //move paddle but not out of bounds.
			paddle.transform.Translate(0,1.5,0);
			paddley = paddley + 1;
			}
		}
	
	if (Input.GetKeyDown ("s") || Input.GetKeyDown ("down")) //down
		{
		if (paddley != 1) { //move paddle but not out of bounds.
			paddle.transform.Translate(0,-1.5,0);
			paddley = paddley - 1;
			}
		}
	
	if (Input.GetKeyDown ("a") || Input.GetKeyDown ("left")) //left
		{
		if (paddlex != 1) { //move paddle but not out of bounds.
			paddle.transform.Translate(-1.5,0,0);
			paddlex = paddlex - 1;
			}
		}
	if (Input.GetKeyDown ("d") || Input.GetKeyDown ("right")) //right
		{
		if (paddlex != 5) { //move paddle but not out of bounds.
			paddle.transform.Translate(1.5,0,0);
			paddlex = paddlex + 1;
			}
		}
	
	

	//Determines the two selected blocks
	flipleft = paddlex + 6 * paddley;
	flipright = flipleft + 1;


	if (Input.GetKeyDown ("space")) { //flips the two selected blocks
		currentcube = cubecolor[flipleft];
		cubecolor[flipleft] = cubecolor[flipright];
		cubecolor[flipright] = currentcube;
	}

	if (Input.GetKeyDown ("return")) { //creates a new row
		CreateReserve();
	}
		
	if (Input.GetKeyDown ("escape")) { //pause
		gamestate = 3;
	}
}


//Game code
function ScoreCheck () {
//Check Horizontally and Vertically to see if 3-6 blocks are all colored the same.
var y = 0;
//Horizontal Check

//6 Block Check
	for (i = 1; i < 7	; i ++) {
		y = i * 6;
		if (cubecolor[y +1] > 0 && cubecolor[y + 1] == cubecolor[y + 2] && cubecolor[y + 1] == cubecolor[y + 3] && cubecolor[y + 1] == cubecolor[y + 4] && cubecolor[y + 1] == cubecolor[y + 5] && cubecolor[y + 1] == cubecolor[y + 6]) {
			Score = Score + sixcombo * diffmultiplier;
			if (breaktime > 0) {
				braektime = breaktime = 3;
				if (breaktime < 0) {
					breatime = 0;
				}
			}
			cubecolor[y + 1] = 0;
			cubecolor[y + 2] = 0;
			cubecolor[y + 3] = 0;
			cubecolor[y + 4] = 0;
			cubecolor[y + 5] = 0;
			cubecolor[y + 6] = 0;	
		}
	}
	
//5 Block Check
		for (x = 0; x < 2; x ++) {
			for (i = 1; i < 7; i ++) {
					y = i * 6;
					if (cubecolor[y +1 + x] > 0 && cubecolor[y + 1 + x] == cubecolor[y + 2 + x] && cubecolor[y + 1 + x] == cubecolor[y + 3 + x] && cubecolor[y + 1 + x] == cubecolor[y + 4 + x] && cubecolor[y + 1 + x] == cubecolor[y + 5 + x]) {
						Score = Score + fivecombo * diffmultiplier;
						if (breaktime > 0) {
							braektime = breaktime = 2;
							if (breaktime < 0) {
								breatime = 0;
							}
						}
						cubecolor[y + 1 + x] = 0;
						cubecolor[y + 2 + x] = 0;
						cubecolor[y + 3 + x] = 0;
						cubecolor[y + 4 + x] = 0;
						cubecolor[y + 5 + x] = 0;
					}
			}
		}
	
//4 Block Check
		for (x = 0; x < 3; x ++) {
			for (i = 1; i < 7; i ++) {
					y = i * 6;
					if (cubecolor[y +1 + x] > 0 && cubecolor[y + 1 + x] == cubecolor[y + 2 + x] && cubecolor[y + 1 + x] == cubecolor[y + 3 + x] && cubecolor[y + 1 + x] == cubecolor[y + 4 + x]) {
						Score = Score + fourcombo * diffmultiplier;
						if (breaktime > 0) {
							braektime = breaktime = 1.5;
							if (breaktime < 0) {
								breatime = 0;
							}
						}
						cubecolor[y + 1 + x] = 0;
						cubecolor[y + 2 + x] = 0;
						cubecolor[y + 3 + x] = 0;
						cubecolor[y + 4 + x] = 0;
					}
			}
		}

//3 Block Check
		for (x = 0; x < 4; x ++) {
			for (i = 1; i < 7; i ++) {
					y = i * 6;
					if (cubecolor[y +1 + x] > 0 && cubecolor[y + 1 + x] == cubecolor[y + 2 + x] && cubecolor[y + 1 + x] == cubecolor[y + 3 + x]) {
						Score = Score + threecombo * diffmultiplier;
						if (breakSTATE == 0) {
							braektime = breaktime = 1;
							if (breaktime < 0) {
								breatime = 0;
							}
						}
						cubecolor[y + 1 + x] = 0;
						cubecolor[y + 2 + x] = 0;
						cubecolor[y + 3 + x] = 0;
					}
			}
		}


//Vertical Check

//6 Block Check
	//not a possible combo

//5 Block Check
		for (yaxis = 1; yaxis < 7; yaxis++) {
			for (xaxis = 1; xaxis < 4; xaxis ++) {
				offset = 5 * xaxis;
				if (cubecolor[yaxis + xaxis + offset] > 0 &&
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 6] && 
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 12] && 
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 18] && 
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 24]) {
						Score = Score + fivecombo * diffmultiplier;
						if (breaktime > 0) {
							braektime = breaktime = 2;
							if (breaktime < 0) {
								breatime = 0;
							}
						}
						cubecolor[yaxis + xaxis + offset] = 0;
						cubecolor[yaxis + xaxis + offset + 6] = 0;
						cubecolor[yaxis + xaxis + offset + 12] = 0;
						cubecolor[yaxis + xaxis + offset + 18] = 0;
						cubecolor[yaxis + xaxis + offset + 24] = 0;
				}
			}
		}
		
		
	
//4 Block Check
		for (yaxis = 1; yaxis < 7; yaxis++) {
			for (xaxis = 1; xaxis < 5; xaxis ++) {
				offset = 5 * xaxis;
				if (cubecolor[yaxis + xaxis + offset] > 0 &&
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 6] && 
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 12] && 
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 18]) {
						Score = Score + fourcombo * diffmultiplier;
						if (breaktime > 0) {
							braektime = breaktime = 1.5;
							if (breaktime < 0) {
								breatime = 0;
							}
						}
						cubecolor[yaxis + xaxis + offset] = 0;
						cubecolor[yaxis + xaxis + offset + 6] = 0;
						cubecolor[yaxis + xaxis + offset + 12] = 0;
						cubecolor[yaxis + xaxis + offset + 18] = 0;
				}
			}
		}
		
		
//3 Block Check
		for (yaxis = 1; yaxis < 7; yaxis++) {
			for (xaxis = 1; xaxis < 6; xaxis ++) {
				offset = 5 * xaxis;
				if (cubecolor[yaxis + xaxis + offset] > 0 &&
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 6] && 
					cubecolor[yaxis + xaxis + offset] == cubecolor[yaxis + xaxis + offset + 12]) {
						Score = Score + threecombo * diffmultiplier;
						if (breaktime > 0) {
							braektime = breaktime = 1;
							if (breaktime < 0) {
								breatime = 0;
							}
						}
						cubecolor[yaxis + xaxis + offset] = 0;
						cubecolor[yaxis + xaxis + offset + 6] = 0;
						cubecolor[yaxis + xaxis + offset + 12] = 0;
				}
			}
		}
}					