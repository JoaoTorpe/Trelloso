import login from "./auth.js"
import { registerUser } from "./userService.js"
import { getBoards} from "./boardsService.js"
import { getCurrentUser } from "./userService.js"
const registerForm = document.querySelector("#registerForm")
const loginForm = document.querySelector('#loginForm')
const view = document.querySelector("#view")
const loginOp = document.querySelector('#loginBtn')
const registerOp = document.querySelector('#registerBtn')
const registerFormContainer = document.querySelector('#registerContainer')
const loginFormContainer = document.querySelector('#loginContainer')
const main = document.querySelector('main')
const exitBtn = document.querySelector('#exitBtn') 
const helloContainer = document.querySelector('#hello')
const boardsList = document.querySelector('#boardsContainer')

//Verifica se tem algum token
if(localStorage.getItem('token')){
  revealMain();
  getBoards()
  getCurrentUser()
}


//Envio do form de registro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newUser = {
        name: document.getElementById("registerName").value ,
        username: document.getElementById("registerUserName").value ,
        avatar_url: document.getElementById("registerAvatar").value,
        password: document.getElementById("registerPassword").value  
    }

    if(document.querySelector('#passwordValidator').value === newUser.password){
    registerUser(newUser)
     document.getElementById("registerName").value = ''
     document.getElementById("registerUserName").value = ''
     document.getElementById("registerAvatar").value = ''
     document.getElementById("registerPassword").value  = ''
     document.querySelector('#passwordValidator').value = ''

    alert("Usuario cadastrado!")

      revealLogin()
  }
    else{
      alert("Senhas diferentes")
    }
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


//Eventos
loginOp.addEventListener('click',()=>revealLogin())
registerOp.addEventListener('click',()=> revealRegister())
exitBtn.addEventListener('click',()=>hideMain())


//Alternar entre os forms
  function revealLogin(){
    registerFormContainer.classList.remove('displayFlex')
    registerFormContainer.classList.add('displayNone')
    
    loginFormContainer.classList.remove('displayNone')
    loginFormContainer.classList.add('displayFlex')
    
    
    loginOp.classList.add('displayNone')
    registerOp.classList.remove('displayNone')
  }
  function revealRegister(){
    loginFormContainer.classList.remove('displayFlex')
    loginFormContainer.classList.add('displayNone')
    
    registerFormContainer.classList.remove('displayNone')
    registerFormContainer.classList.add('displayFlex')
    
    
    registerOp.classList.add('displayNone')
    loginOp.classList.remove('displayNone')
    }

   
    //Mostrar pagina do usuario logado
   export function revealMain(){
    main.classList.remove('displayNone')
    loginFormContainer.classList.remove('displayFlex')
    loginFormContainer.classList.add('displayNone')
    registerFormContainer.classList.remove('displayFlex')
    registerFormContainer.classList.add('displayNone')
    loginOp.classList.add('displayNone')
    registerOp.classList.add('displayNone')
    exitBtn.classList.remove('displayNone')
    helloContainer.classList.remove('displayNone')
    helloContainer.classList.add('displayFlex')

    }
    
    function hideMain(){
      main.classList.add('displayNone')
    loginFormContainer.classList.remove('displayNone')
    loginFormContainer.classList.add('displayFlex')
    registerOp.classList.remove('displayNone')
    helloContainer.classList.remove('displayFlex')
    helloContainer.classList.add('displayNone')
    exitBtn.classList.add('displayNone')
    document.querySelector('#loginUserName').value = ''
    document.querySelector('#loginPassword').value = ''
    
    localStorage.clear()
    empityBoardsList()
    }


    function empityBoardsList(){
      while(boardsList.firstChild){
        boardsList.removeChild(boardsList.firstChild)
      }
    }




