var reveil = new AlarmSound("./assets/sounds/reveil.ogg")	

document.addEventListener("DOMContentLoaded",() => {
    var elems = document.querySelectorAll('.timepicker');
    
    var instances = M.Timepicker.init(elems,{twelveHour : false });

    for (let i = 0; i < 60; i++) {
        document.querySelector("#minutes_select").innerHTML += '<option value="'+i+'">'+i+'</option>'    
        document.querySelector("#seconde_select").innerHTML += '<option value="'+i+'">'+i+'</option>' 
    }
    var minteur = document.querySelectorAll('select');
    var minteur_instances = M.FormSelect.init(minteur);
})

function activate_Miniteur (){
    let s = parseInt(document.querySelector("#seconde_select").value)
    let m = parseInt(document.querySelector("#minutes_select").value)
    timer(s,m)

} 
function timer(second,minute) {
    var total_Time = (second * 1000) + (minute * 1000 * 60) 
    var MyTimerInterval = setInterval(() => {
        if(second == 0){
            second = 60
            minute = minute - 1
        }
        second = second - 1
        document.querySelector("#timer_msg").innerHTML = '<h5 class="uk-text-lead uk-text-center"> '+minute+' : '+second+'</h5>'
        timer_msg
    }, 1000);

    setTimeout(()=>{
        endTimer()
        clearInterval(MyTimerInterval)
    },total_Time)

}
function endTimer(){     
    document.querySelector("#timer_msg").innerHTML = '<h5 class="uk-text-lead uk-text-center"> C\' l\'heure </h5>'   
    reveil.play()
}


function activate_alarm(){
    var al =  document.querySelector("#alarm_time").value
    var h = al.substring(0,2)
    var m = al.substring(3,5)
    alarm(parseInt(h),parseInt(m))
}

function alarm(hours,minute){

    var to_minutes = 0
    var to_hours = 0

    var date = new Date()

    let now_minute = date.getMinutes()
    let now_houres =  date.getHours()

    if( (hours == now_houres) && (now_minute < minute) ){
        to_minutes = minute - now_minute
    }else if(hours > now_houres){
        to_hours = hours - (now_houres+1)
        to_minutes = (60 - now_minute) + minute 
        if(to_minutes >= 60 ){
            to_minutes = to_minutes - 60 
            to_hours = to_hours + 1
        }
    }else{

        let to_mid_night_hours = 24 - ( now_houres+1 )
        let to_mid_night_minutes = 60 - now_minute
        to_minutes = to_mid_night_minutes + minute
        to_hours = to_mid_night_hours + hours
        if(to_minutes >= 60 ){
            to_minutes = to_minutes - 60 
            to_hours = to_hours + 1
        }
    }
    let interval = ( to_minutes * 1000 * 60 )+ (to_hours * 1000 * 60 * 60)


    document.querySelector("#heure_alarme").innerHTML = "L'alarme sera declancher apres "+to_hours+" heurs et "+to_minutes+" minutes "

    setTimeout(()=>{
        reveil.play()
        document.querySelector("#heure_alarme").innerHTML = "C'est l'heure "
    },interval)
}

function searchTime(){
    const data = null;
    var pays = document.querySelector("#pays").value
    var endpoint = "https://api.ipgeolocation.io/timezone?apiKey=6b6f8bf5adef45afa7ade12a19ecafb6&location="+pays
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
                var x = JSON.parse(this.responseText)        
                document.querySelector("#Affiche_Pays").innerHTML = "<p>Pays : "+x.geo.country+" , gouvernorat : "+x.geo.state +" , fuseau horaire  : "+x.timezone +" , date : "+x.date +" , Heure : "+x.time_24

        }
    });
    xhr.open("GET", endpoint);
    xhr.send(data);
}

function AlarmSound(src) {
    this.AlarmSound = document.createElement("audio");
    this.AlarmSound.src = src;
    this.AlarmSound.setAttribute("preload", "auto");
    this.AlarmSound.style.display = "none";
    document.body.appendChild(this.AlarmSound);
    this.play = function(){
        this.AlarmSound.play();
    }
    this.pause = function(){
        this.AlarmSound.pause();
    }    
}