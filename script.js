import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js"

const firebaseConfig = { 
        databaseURL: "https://leads-tracker-app-ec0a5-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputElement = document.getElementById("input-el")
const buttonElement = document.querySelector("#save-el")
const deleteElement = document.getElementById("delete-el")
const containerElement = document.querySelector("#container-el")



function render(leads){
    let leadValue = ""
    for(let i = 0; i<leads.length; i++){
        leadValue += 
        `<li>
            <a href="${leads[i]}" target = "_blank">${leads[i]}</a>
        </li>`
        console.log(leadValue)
    }
    containerElement.innerHTML = `<ul>${leadValue}</ul>`
}

onValue(referenceInDB, function(snapshot){
    if(snapshot.exists()){
        const myLeads = Object.values(snapshot.val())
        render(myLeads)
    }
})

buttonElement.addEventListener('click', function(){
    push(referenceInDB, inputElement.value)
    inputElement.value = ""
})

deleteElement.addEventListener('dblclick', function(){
    remove(referenceInDB)
    containerElement.innerHTML = ""
    inputElement.value = ""
})

