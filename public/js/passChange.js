let changeMessage = window.changeMessage || " "
console.log(changeMessage)
let sendButton = document.getElementById('passChangeButton')
let mainUserPass = document.getElementById('userPassChangeMain')
let secondUserPass = document.getElementById('userPassChangeSecond')
let userInfoFilledInput = document.getElementById('validateInput')
let userInfoChangeStatus = document.getElementById('messageChange')

secondUserPass.addEventListener("change", (e) => inputPassChangeValidation())

function inputPassChangeValidation () {
    userInfoChangeStatus.innerHTML = `<p>${changeMessage}</p>`
    console.log(mainUserPass.value, secondUserPass.value)
    if(mainUserPass.value !== secondUserPass.value) {
        userInfoFilledInput.innerHTML=`<p>La contraseña en el campo principal y en el de confirmación deben coincidir</p>`
    }else sendButton.enabled
}

