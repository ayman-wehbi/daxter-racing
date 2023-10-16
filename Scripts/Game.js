
const time=document.querySelector('.score');
const startscreen=document.querySelector('.StartScreen');
const gamearea=document.querySelector('.GameArea');
const orb = document.querySelector('.Orb');
let player={ speed:5, orb:0};
let [milliseconds,seconds,minutes,hours] = [0,0,0,0]; //tried to get tme but failed

//enable start screen
startscreen.addEventListener('click',start);

let keys={ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);

function keyDown(ev){
    ev.preventDefault();
    keys[ev.key]=true;
}
        
function keyUp(ev){
    ev.preventDefault();
    keys[ev.key]=false;          
    }

//set controls
function controls(){

    let car=document.querySelector('.car');
    let road=gamearea.getBoundingClientRect();

    if(player.start){
        roadAnimation();
        moveCar(car);
        if((keys.w || keys.W) && player.y>(road.top+70)){
            player.y-=player.speed;
        }
        if((keys.s || keys.S) && player.y<(road.bottom-70)){
                    player.y+=player.speed;
        }
        if((keys.a || keys.A) && player.x>0){
            player.x-=player.speed;
        }
        if((keys.d || keys.D) && player.x<(road.width-50)){
            player.x+=player.speed;
        }

        car.style.top=player.y + 'px';
        car.style.left=player.x + 'px';

        window.requestAnimationFrame(controls);
       
        time.innerHTML="<img src=Media/orb.png width=\"25px\" height=\"25px\"> "+player.orb;

    }         
}

function roadAnimation(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=700){
            item.y-=750;
        }
            item.y+=player.speed;
            item.style.top=item.y+'px';

    })
}

//collision detector
function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
    }

function collect(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
    }

//move the car and decide what happen for every collision        
function moveCar(car){
    let other=document.querySelectorAll('.other');
    let otherc=document.querySelectorAll('.otherc');
    
    other.forEach(function(item){
        if(isCollide(car,item)){
            endGame();

        }

        if(item.y>=750){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350) + 'px';
        }
            
            item.y+=player.speed;
            item.style.top=item.y+'px';
    })

     otherc.forEach(function(item){
        if(collect(car,item)){
            orbCollect();

        }

        if(item.y>=750){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350) + 'px';
        }
            
            item.y+=player.speed;
            item.style.top=item.y+'px';
    })
}

function endGame(){
    player.start=false;
    startscreen.classList.remove('hide');
}
//incremate orbs when collected
function orbCollect(){
    player.orb++;
} 

function start(){

    startscreen.classList.add('hide');
    gamearea.innerHTML="";

    player.start=true;
    player.orb=0;
    player.time=0;
    window.requestAnimationFrame(controls);

    for(x=0;x<5;x++){
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=(x*150);
        roadline.style.top=roadline.y+'px';
        gamearea.appendChild(roadline);
    }
    
    let car=document.createElement('div');
    car.setAttribute('class','car');
    gamearea.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    for(x=0;x<3;x++){
        let othercar=document.createElement('div');
        othercar.setAttribute('class','other');
        othercar.y=((x+1)*350)* -1;
                othercar.style.top=othercar.y+'px';
        othercar.style.left=Math.floor(Math.random()*350) + 'px';
        gamearea.appendChild(othercar);    }

    for(x=0;x<1;x++){
    let thirdcar=document.createElement('div');
        thirdcar.setAttribute('class','otherc');
        thirdcar.y=((x+1)*510)* -3;
                thirdcar.style.top=thirdcar.y+'px';
        thirdcar.style.left=Math.floor(Math.random()*510) + 'px';
        gamearea.appendChild(thirdcar);}

}