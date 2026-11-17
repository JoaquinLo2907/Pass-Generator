const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let contraseña = false
let firstPassEl = document.querySelector("#firstPass")
let secondPassEl = document.querySelector("#secondPass")
let inputEl = document.querySelector("#char-count")

function randomPasswords () {
    firstPassEl.textContent = ""
    secondPassEl.textContent = ""
    let cantidad = inputEl.value 
    for ( let i = 0; i < cantidad; i++) {
        let firstPass = Math.floor(Math.random() * characters.length)
        let secondPass = Math.floor(Math.random() * characters.length)
        firstPassEl.textContent += characters[firstPass]
        secondPassEl.textContent += characters[secondPass]
    }


}

function givePasswords () {
    randomPasswords()
}



