import login from "./auth.js"
import { registerUser } from "./userService.js"
const registerForm = document.querySelector("#registerForm")
const loginForm = document.querySelector('#loginForm')
const view = document.querySelector("#view")
const loginOp = document.querySelector('#loginBtn')
const registerOp = document.querySelector('#registerBtn')
const registerFormContainer = document.querySelector('#registerContainer')
const loginFormContainer = document.querySelector('#loginContainer')

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

loginOp.addEventListener('click',()=>{
registerFormContainer.classList.remove('displayFlex')
registerFormContainer.classList.add('displayNone')

loginFormContainer.classList.remove('displayNone')
loginFormContainer.classList.add('displayFlex')


loginOp.classList.add('displayNone')
registerOp.classList.remove('displayNone')
})

loginOp.addEventListener('click',()=>{
  registerFormContainer.classList.remove('displayFlex')
  registerFormContainer.classList.add('displayNone')
  
  loginFormContainer.classList.remove('displayNone')
  loginFormContainer.classList.add('displayFlex')
  
  
  loginOp.classList.add('displayNone')
  registerOp.classList.remove('displayNone')
  })

  registerOp.addEventListener('click',()=>{
    loginFormContainer.classList.remove('displayFlex')
    loginFormContainer.classList.add('displayNone')
    
    registerFormContainer.classList.remove('displayNone')
    registerFormContainer.classList.add('displayFlex')
    
    
    registerOp.classList.add('displayNone')
    loginOp.classList.remove('displayNone')
    })







