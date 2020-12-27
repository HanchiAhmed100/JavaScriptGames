
var modal = document.getElementById("myModal");

document.querySelector("#close").onclick = () =>{
    modal.style.display = "none";
}
document.querySelector("#open_modal").onclick = () =>{
    modal.style.display = "block"
}
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function Carte(id , question , reponse) {
    this.id = id
    this.question = question;
    this.reponse = reponse;
}
var cartes = []
var current = 0
var data = false

addCarte = () =>{
    var id = 1
    
    if(localStorage.getItem("elements")){
        cartes = JSON.parse(localStorage.getItem("elements"))
        id = cartes[cartes.length-1].id+1
    }

    var question = document.querySelector("#question").value
    var reponse = document.querySelector("#reponse").value
    var carte = new Carte(id, question , reponse)

    cartes.push(carte)
    localStorage.removeItem("elements")

    localStorage.setItem("elements",JSON.stringify(cartes))

    document.querySelector("#question").value = ""
    document.querySelector("#reponse").value = ""

    loadElements()
}

loadElements = () => {
    if(localStorage.getItem("elements")){
        data = true
        cartes = JSON.parse(localStorage.getItem("elements"))
        document.querySelector("#card_question").innerHTML =  cartes[0].question
        document.querySelector("#card_response").innerHTML =  "Reponse : "+cartes[0].reponse
        document.querySelector("#question_number").innerHTML =  cartes[0].id+"/"+cartes.length
        current = cartes[0].id

    }else{
        document.querySelector("#card_question").innerHTML = "Pas de question disponible"
        document.querySelector("#question_number").innerHTML = "0/0"
    }

}
previous = () =>{
    if(data){
        hide_reponse()
        if( current == 0){
            current = cartes.length
        }
        document.querySelector("#card_question").innerHTML =  cartes[current-1].question
        document.querySelector("#card_response").innerHTML = "Reponse : "+ cartes[current-1].reponse
        document.querySelector("#question_number").innerHTML =  cartes[current-1].id+"/"+cartes.length
        current = current -1
    }
}
next = () =>{
    if(data){
        hide_reponse()
        if( current == cartes.length){
            current = 0
        }
        current = current + 1
        document.querySelector("#card_question").innerHTML =  cartes[current-1].question
        document.querySelector("#card_response").innerHTML = "Reponse : "+ cartes[current-1].reponse
        document.querySelector("#question_number").innerHTML =  cartes[current-1].id+"/"+cartes.length        
    }
}

flip_Card = () => {
    if(document.querySelector("#card_response").style.display == "none"){
        show_reponse()
    }else{
        hide_reponse()
    }
}
hide_reponse = () =>{
    document.querySelector("#card_response").style.display = "none"
    document.querySelector("#card_question").style.display = "block"
}
show_reponse = () =>{
    document.querySelector("#card_response").style.display = "block"
    document.querySelector("#card_question").style.display = "none"
}
loadElements()
