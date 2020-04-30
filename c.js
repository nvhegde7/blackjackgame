let blackjackgame = {
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','k','j','q','a'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'k':10,'j':10,'q':10,'a':[1,11]},
};
const you=blackjackgame['you']
const dealer=blackjackgame['dealer']
const hitsound=new Audio('swish.m4a');
const winsound=new Audio('cash.mp3');
const losssound=new Audio('aww.mp3');



document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);
function blackjackhit(){
    let card=randomCard();
    showcard(card,you);
    updatescore(card,you);
    showscore(you);
}
function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomIndex];
}
function showcard(card,activePlayer){
    if(activePlayer['score'] <=21){
         let cardImage=document.createElement('img');
         cardImage.src=card+'.png';
         document.querySelector(activePlayer['div']).appendChild(cardImage);
         hitsound.play();
    }

}
function blackjackdeal(){
    let winner=showresult(computewinner());
    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
    for(i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }
    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }
    you['score']=0;
    dealer['score']=0;
    document.querySelector('#your-blackjack-result').textContent=0;
    document.querySelector('#dealer-blackjack-result').textContent=0;


    
}
function updatescore(card,activePlayer){
    if(card ==='a')
    {

          if(activePlayer['score']+blackjackgame['cardsmap'][card][1]<=21)
          {
              activePlayer['score'] += blackjackgame['cardsmap'][card][1];
           }
           else{
                activePlayer['score'] +=blackjackgame['cardsmap'][card][0];
               }
    } else{
    activePlayer['score'] += blackjackgame['cardsmap'][card];
    }

}
function showscore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scorespan']).textContent='BUST!';

    }else{
    document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];}
}
function dealerlogic(){
    let card=randomCard();
    showcard(card,dealer);
    updatescore(card,dealer);
    showscore(dealer);
    
    
}
function computewinner(){
    let winner;
    if(you['score']<=21){
        if((you['score'] > dealer['score']) || (dealer['score']>21)){
            winner=you;
        }else if(you['score']<dealer['score']){
            winner=dealer;
        }else if(you['score']===dealer['score']){

        }else if(you['score']>21 && dealer['score']<=21){
            winner=dealer;
        }else if(you['score']>21 && dealer['score']>21){

        }

    }
    return winner;
}
function showresult(winner)
{
       let message,messagecolor;
      if(winner === you)
      {
         message='you win';
          messagecolor='green';
          winsound.play();
      }else if(winner === dealer)
      {
         message='you lost';
          messagecolor='red';
         losssound.play();
       }else
       {
        message='you drew';
         messagecolor='pink';
       }


document.querySelector('#blackjack-result').textContent=message;
document.querySelector('#blackjack-result').style.color=messagecolor;

}