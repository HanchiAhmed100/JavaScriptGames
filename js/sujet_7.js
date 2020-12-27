var first = document.getElementById("first")
var second = document.getElementById("second")
var third = document.getElementById("third")   
var fourth = document.getElementById("fourth") 
var btn_valider = document.getElementById("valider") 

var correct_numbers = []
var numbers = []

var exist_in_place = 0
var exist_not_in_place = 0

var msg = ""
var attempt = 1

function random_numbers(){

    while (correct_numbers.length < 4) {
        let random_nbr = Math.floor(Math.random() * Math.floor(9))
        if(!correct_numbers.includes(random_nbr)){
            correct_numbers.push(random_nbr)
        }
    }
    console.log(correct_numbers)  

}

document.addEventListener("DOMContentLoaded", function() {
    first.focus()
    random_numbers()
});
function set_second(){
    second.focus() 
}
function set_third(){
    third.focus() 
}
function set_fourth(){
    fourth.focus()
}

function annuler(){
    first.value = second.value = third.value = fourth.value = ""
    first.focus()
}

function valider(){
    if(attempt == 10 ){
        game_over()
    }
    var first_value = first.value
    var second_value = second.value
    var third_value = third.value
    var fourth_value = fourth.value
    
    check_numbers(first_value , 0)
    check_numbers(second_value , 1)
    check_numbers(third_value , 2)
    check_numbers(fourth_value , 3)

    if(exist_in_place == 4 ){
        win()
    }

    msg = "<p>Essai numéro "+attempt+" , numéros : "+first_value+" "+second_value+" "+third_value+" "+fourth_value+" , resultat : "+exist_in_place+" chiffre au bon endroit , "+exist_not_in_place+" au mauvais endroit </p><hr/>"+msg
    attempt = attempt + 1 
    document.querySelector("#result").innerHTML = msg
    
    exist_not_in_place = exist_in_place = 0

    annuler()

}
function check_numbers(nbr_value,index){
    if(nbr_value == correct_numbers[index]){
        exist_in_place = exist_in_place + 1
    }else {
        correct_numbers.forEach(element => {
            if(element == nbr_value){
                exist_not_in_place = exist_not_in_place + 1
            }
        });
    }
}
function the_end(){
    first.disabled = true
    
    second.disabled = true

    third.disabled = true

    fourth.disabled = true

    document.querySelector("#controle").style.display = "none"
}
function game_over(){
    document.querySelector("#end_game").innerHTML = "GAME OVER <br> le code c'est <br> "+correct_numbers[0]+" "+correct_numbers[1]+" "+correct_numbers[2]+" "+correct_numbers[3]
    the_end()
    
}
function win(){
    document.querySelector("#end_game").innerHTML = "Félicitation vous avez gagner <br> le code c'est <br> "+correct_numbers[0]+" "+correct_numbers[1]+" "+correct_numbers[2]+" "+correct_numbers[3]
    the_end()
}