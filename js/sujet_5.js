	
document.querySelector("#ShowToPlay").style.display = "none"
document.querySelector("#ShowScore").style.display = "none"

var WordsFacile = ["javascript" , "java" , "python" ,"programme" , "programmation","react" , "angular" , "vue js" ,"spring boot" , "node" ,"express" , "web socket" , "bootstrap" , "code" , "design" ,"docker" , "framework","flask" ,"flutter","android"]
var WordsMoyen = ["programme en java","l'équipe travailla","en novembre" ,"n'est pas un acronyme" ,"l'apparition de la version 1.2" ,"langage marque","utilisation web" ,"interfaces complexes" , "oracle annonce" ,"licence open-source" ,"acquisition par oracle"," programmer dans un style" ]
var WordDifficile = ["chacun des aspects successifs " , "dans une activité" , "Enroulement ou circuit d'une machine" ,"donne le mode de variation" , "Lune et certaines planètes","Scrum est un framework" , "la plus grande valeur possible" , "Il est défini par ses créateurs" ,"langage de programmation de scripts" , "dans les pages web interactives" ,"Le langage Java est issu d’un projet de Sun Microsystems" , "une source d’erreur pour les développeurs"]

var words = []

var level = ""
var word = ""
var nbr = 0
var wrong = 0
var score = 0
var bestScore = 0


var Clock = new GameSound("./assets/sounds/clock.ogg")
var rightSound = new GameSound("./assets/sounds/right.wav")
var wrongSound = new GameSound("./assets/sounds/wrong.wav")	
var victory = new GameSound("./assets/sounds/victory.mp3")	


function GameSound(src) {
    this.GameSound = document.createElement("audio");
    this.GameSound.src = src;
    this.GameSound.setAttribute("preload", "auto");
    this.GameSound.style.display = "none";
    document.body.appendChild(this.GameSound);
    this.play = function(){
        this.GameSound.play();
    }
    this.stop = function(){
        this.GameSound.pause();
    }    
}

setLevel = (level) => {
    if(level == "Facile"){
        if(localStorage.getItem('Facile')){
            bestScore = localStorage.getItem('Facile')
        }
        words = [...WordsFacile];
    }else if (level == "Moyen"){
        if(localStorage.getItem('Moyen')){
            bestScore = localStorage.getItem('Moyen')
        }
        words = [...WordsMoyen];
    }else{
        if(localStorage.getItem('Difficile')){
            bestScore = localStorage.getItem('Difficile')
        }
        words = [...WordDifficile];
    }
    document.querySelector("#best").innerHTML = bestScore
}
loadWords = () => {
    var randomFromTable = Math.floor(Math.random() * Math.floor(words.length))
    document.querySelector('#result').innerHTML = words[randomFromTable]
}

setTimer = () => {
    setInterval(()=>{ 
        var time = parseInt(document.querySelector('#timer').innerHTML)
        if(time > 0 ){
            document.querySelector('#timer').innerHTML =  time - 1	
            Clock.play()			
        }
    }, 1000);

    setTimeout(() => {
        document.querySelector("#ShowToPlay").style.display = "none"
        Clock.stop()
        if(score > bestScore){
            localStorage.removeItem(level);
            localStorage.setItem(level, score);
            bestScore = score
            victory.play()
            document.querySelector("#best").innerHTML = bestScore
            document.querySelector("#bestScoree").innerHTML +=  " <br> <p>Félicitation nouveau record</p>"

        }
    }, 40000);
}

StartGame = () =>{
    document.querySelector("#ShowToPlay").style.display = "block"
    document.querySelector("#ShowScore").style.display = "block"
    document.querySelector("#menu").style.display = "none"
    level = document.querySelector('input[name="level"]:checked').value;
    setLevel(level)
    loadWords()		
}

document.addEventListener('keydown', (e) => { 
    const key = e.key; 
    var x = document.querySelector("#result").innerHTML
    if (key === "Backspace" || key === "Delete") { 
        word = word.slice(0, nbr-1)
        nbr = nbr - 1
    } 
    else if(key === "Enter"){
        if(word == x){				
            score = score + 1
            document.querySelector("#score").innerHTML = score
            rightSound.play()
        }else{
            wrong = wrong + 1
            wrongSound.play() 
        }
        nbr = 0
        word = ""
        document.querySelector("#word").value = ""
        loadWords()
    }else if( key === "CapsLock" || key == "Tab"){

    }else{
        word = word + key 
        nbr = nbr + 1
    }
})
