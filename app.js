var scores, roundScore, activePlayer, gamePlaying, target, dice1Source, dice2Source;

init();

//Dice roll button
dice1Source = document.getElementById('dice-1');
dice2Source = document.getElementById('dice-2')

document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if(!target){  //default target
		target = 100;
	}
	if(gamePlaying){

		//Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		var num = 0;
    	var interval = setInterval(function(){
      	num +=5;
        var num1 = Math.floor(Math.random() * 6) +1;
        var num2 = Math.floor(Math.random() * 6) +1;
        if(num == 60){
        	//Display Result
        	dice1Source.style.display = 'block';
			dice2Source.style.display = 'block';
			dice1Source.src = 'dice-' + dice1 +'.png';
			dice2Source.src = 'dice-' + dice2 +'.png';
            //Update the round score if the rolled number was not a 1 in either dice.
			if(dice1 !== 1 && dice2 !== 1){
				//add score
				roundScore += dice1 + dice2;
				document.querySelector('#current-'+ activePlayer).textContent = roundScore;
			}else{
				//next player
				nextPlayer();
			}
            clearInterval(interval);
        }else{
        	dice1Source.style.display = 'block';
			dice2Source.style.display = 'block';
        	dice1Source.src = "dice-" + num1 + ".png";
        	dice2Source.src = "dice-" + num2 + ".png";
        }
        }, 100);
	}
});

//variable for modal
var modalBg = document.querySelector('.modal-bg');
var modalBgInvalidTarget = document.getElementById('modal-bg-invalid-target-score');
var modalBgRule = document.getElementById('modal-bg-rule');

//Hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
	
		//Add current score to global score
		scores[activePlayer] += roundScore;

		//update the score on display
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if active player won the game??
		if(scores[activePlayer] >= target){
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.getElementById('dice-1').style.display = 'none';
		    document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');	
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
			
			// Modal pop up when either of player won the game
			var winnerPlayer = activePlayer === 0 ? 'Player 1' : 'Player 2';
			document.getElementById('won-player').innerHTML = winnerPlayer + ' won the game!';
			modalBg.classList.add('bg-active');
		}else{
			//next player
		   	nextPlayer();	
		}	
	}
});

//Next Player Function
function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	//document.getElementById('dice-1').style.display = 'none';
    //document.getElementById('dice-2').style.display = 'none';
}

//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	
	document.querySelector('#target-score-input').value = '';
	document.getElementById('target-score-header').textContent = 'Target Score: 100';
}

//Submit button for input target score
document.querySelector('.btn-submit').addEventListener('click', function(){
	target = document.querySelector('#target-score-input').value;
	
	if(!target){  //default target
		target = 100;
	}else if(target<=0 || !!(target%1)){   //second condition is to valid only integer value
		modalBgInvalidTarget.classList.add('bg-active');
	}else{
		document.getElementById('target-score-header').textContent = 'Target Score: ' + target;	
	}
});

//Rule button
document.querySelector('.btn-rule').addEventListener('click', function(){ 
	modalBgRule.classList.add('bg-active');	
});

//Close for modal winner
document.querySelector('.modal-close').addEventListener('click', function(){ 
	modalBg.classList.remove('bg-active');	
	init();
});

//Close for modal invalid target
document.getElementById('modal-close-invalid-target-score').addEventListener('click', function(){ 
	modalBgInvalidTarget.classList.remove('bg-active');	
	init();
}); 

////Close for modal rule
document.getElementById('modal-close-rule').addEventListener('click', function(){ 
	modalBgRule.classList.remove('bg-active');		
});





