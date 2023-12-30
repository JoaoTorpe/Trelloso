import login from "./auth.js"
import { registerUser } from "./userService.js"
const registerForm = document.querySelector("#registerForm")
const loginForm = document.querySelector('#loginForm')
const view = document.querySelector("#view")


//Envio do form de registro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Evento de envio do formulário disparado!");
    let newUser = {
        name: document.getElementById("registerName").value ,
        username: document.getElementById("registerUserName").value ,
        avatar_url: document.getElementById("registerAvatar").value,
        password: document.getElementById("registerPassword").value  
    }
    registerUser(newUser)
})


//Envio do form de login
loginForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  let LoginFormData = new FormData(loginForm)  
    login(LoginFormData)
})


//Visualizar a senha
view.addEventListener("click",()=>{ 
  const passwordInput = document.getElementById("loginPassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }

})









