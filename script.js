// Event Binding
// when event will be triggered than the function binded with event will be called...
window.addEventListener("load", initEvents);
let userchoice;
var firstturn=true;
let cpuchoice;
let btns;
let counter = 0;
var win=false;
let winningCombinations = [[0,1,2],[3,4,5],[6,7,8],
                           [0,3,6],[1,4,7],[2,5,8],
                           [0,4,8],[2,4,6]];

function initEvents() {
    var x=document.getElementById("X");
    var y=document.getElementById("0");
    y.addEventListener("click",assignchoice0);
    x.addEventListener("click",assignchoiceX);
    btns = document.querySelectorAll(".btn");// will create array of buttons btns
    for(let i = 0; i < btns.length; i++) {
        btns[i].setAttribute("title",i);
        btns[i].setAttribute("disabled",true);
        btns[i].addEventListener("click", userMove);
    }
}
function assignchoiceX(){
        userchoice="X";
        cpuchoice="0";

    const ele= document.getElementById("choice");
    ele.remove();
    let bt = document.querySelectorAll(".btn");
    for(let i = 0; i < bt.length; i++) {
        bt[i].removeAttribute("disabled");
    }

}

function assignchoice0(){
    userchoice="0";
    cpuchoice="X";

const ele= document.getElementById("choice");
ele.remove();
let bt = document.querySelectorAll(".btn");
for(let i = 0; i < bt.length; i++) {
    bt[i].removeAttribute("disabled");
}

}


function userMove() {
    // this - will hold current object(HTML Tag) reference
    // console.log(this);
    this.innerHTML = userchoice;
    this.setAttribute("disabled",true);
    setpos(this.title,userchoice);
    checkWinner(userchoice);
    if(win){
        let btnss = document.querySelectorAll(".btn");// will create array of buttons btns
        for(let i = 0; i < btnss.length; i++) {
            btnss[i].setAttribute("disabled",true);
        }
        return;
    }
    counter++;
    if(counter < 9) {
        // setTimeout(function() {
        //     cpuMove();
        // },500);
        cpuMove();
        counter++;
    }
    else{
        var x=document.createElement("P");
        x.innerHTML="Draw !";
        document.body.appendChild(x);
        console.log("Draw");
        var playagain=document.createElement("Button");
        playagain.innerHTML="Play Again!";
        playagain.setAttribute("class","playagain");
        playagain.addEventListener("click",PlayAgain);
        document.body.appendChild(playagain);           
    }
}


function cpuMove() {
    for(let i = 0; i < winningCombinations.length; i++) {
        if((winningCombinations[i][0] == winningCombinations[i][1]) && (winningCombinations[i][2]!="X" && winningCombinations[i][2]!="00")){
            console.log("c-1");
            btns[winningCombinations[i][2]].innerHTML = cpuchoice;
            btns[winningCombinations[i][2]].setAttribute("disabled",true);
            setpos(winningCombinations[i][2],cpuchoice);
            checkWinner("Y");
            if(win){
                let btnss = document.querySelectorAll(".btn");// will create array of buttons btns
                for(let i = 0; i < btnss.length; i++) {
                    btnss[i].setAttribute("disabled",true);
                }
                return;
            }
            return;
        }
        else if((winningCombinations[i][0] == winningCombinations[i][2]) && (winningCombinations[i][1]!="X" && winningCombinations[i][1]!="00")){
            console.log("c-2");
            btns[winningCombinations[i][1]].innerHTML = cpuchoice;
            btns[winningCombinations[i][1]].setAttribute("disabled",true);
            setpos(winningCombinations[i][1],cpuchoice);
            checkWinner("Y");
            if(win){
                let btnss = document.querySelectorAll(".btn");// will create array of buttons btns
                for(let i = 0; i < btnss.length; i++) {
                    btnss[i].setAttribute("disabled",true);
                }
                return;
            }
            return;
        }

        else if((winningCombinations[i][1] == winningCombinations[i][2]) && (winningCombinations[i][0]!="X" && winningCombinations[i][0]!="00")){
            console.log("c-3");
            btns[winningCombinations[i][0]].innerHTML = cpuchoice;
            btns[winningCombinations[i][0]].setAttribute("disabled",true);
            setpos(winningCombinations[i][0],cpuchoice);
            //winningCombinations[i][0]="Y";
            checkWinner("Y");
            if(win){
                let btnss = document.querySelectorAll(".btn");// will create array of buttons btns
                for(let i = 0; i < btnss.length; i++) {
                    btnss[i].setAttribute("disabled",true);
                }
                return;
            }
            return;
        }
    }

        for(let i = 0; i < winningCombinations.length; i++){
            console.log("loop 2");
            for(let j=0;j<3;j++){
            if(winningCombinations[i][j]!="X" && winningCombinations[i][j]!="00"){
                console.log(i+""+j);
                btns[winningCombinations[i][j]].innerHTML=cpuchoice;
                btns[winningCombinations[i][j]].setAttribute("disabled",true);
                setpos(winningCombinations[i][j],cpuchoice);
                //winningCombinations[i][j]="Y";
                return;
            }
        }
        }
}

function setpos(pos,choice){
    for(let i = 0; i < winningCombinations.length; i++) {
        for(let j = 0; j < 3; j++) {
            if(winningCombinations[i][j]==pos) {
                if(choice=="0"){
                    winningCombinations[i][j]="00"
                }
                else{
                winningCombinations[i][j] = choice;
                }
                break;
            }
        }
    }
}

function checkWinner(choice) {
    for(let i = 0; i < winningCombinations.length; i++) {
        if(winningCombinations[i][0] == choice && winningCombinations[i][1]== choice &&  winningCombinations[i][2] == choice) {
            var x=document.createElement("P");
            if(choice==userchoice){
            x.innerHTML="Congratulations You Won !"
            document.body.appendChild(x);
            console.log(choice + " wins...");
            }
            else{
                x.innerHTML="You Lost Better Luck Next Time !"
            document.body.appendChild(x);
            console.log(choice + " wins...");
            }
            win=true;
            var playagain=document.createElement("Button");
            playagain.innerHTML="Play Again!";
            playagain.setAttribute("class","playagain");
            playagain.addEventListener("click",PlayAgain);
            document.body.appendChild(playagain);
            break;
        }
    }
}

function PlayAgain(){
    if(confirm("Do You Want to Play Again")==true){
        window.location.href="index.html"
    }
}