import login from "./auth.js"
import { registerUser } from "./userService.js"
import { deleteCurrentBoard, getBoards, getFavoritesBoards, updateBoardFavorito, updateBoardName} from "./boardsService.js"
import { getCurrentUser } from "./userService.js"
import { createBoard } from "./boardsService.js"
import { createList } from "./listsServices.js"
import { getLists } from "./listsServices.js"
import { addTag, createComment, deleteCard, removeTag, updateTagsInputs } from "./cardService.js"



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
const openAddBoardForm = document.querySelector('#addBoard')
const closeAddBoardForm = document.querySelector('#closeAddForm')
const addBoardForm = document.querySelector('#addBoardForm')
const addListForm = document.querySelector('#listForm')
const cardDisplayClose = document.querySelector("#cardDisplayClose")
const cardDisplay = document.querySelector("#cardDisplay")
const commentsList = document.querySelector('#commentsContainer')
const commentForm = document.querySelector('#addCommentForm')
const tagsOp = document.querySelectorAll('#tagsMenu input')
const tagsMenu = document.querySelector("#tagsMenu")
let tagsInputs = document.querySelectorAll('#tagsMenu input')
const cardDelete = document.querySelector('#cardDisplayDelete')
const favorites = document.querySelector('#showFavorites')

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
openAddBoardForm.addEventListener('click',()=>{
  addBoardForm.classList.remove('displayNone')
  addBoardForm.classList.add('displayFlex')
})
closeAddBoardForm.addEventListener('click',()=>{
  addBoardForm.classList.add('displayNone')
  addBoardForm.classList.remove('displayFlex')
  document.querySelector('#newBoardName').value = ''
})

addBoardForm.addEventListener('submit',(e)=>{
e.preventDefault()

let newBoardData = new FormData(addBoardForm)
let objetoDeDados = {};

for (let [chave, valor] of newBoardData.entries()) {
  objetoDeDados[chave] = valor;
}
if( objetoDeDados['favorito']){
  objetoDeDados['favorito'] = true
}else{
  objetoDeDados['favorito'] = false
}
createBoard(objetoDeDados)

document.querySelector('#newBoardName').value = ''
addBoardForm.classList.add('displayNone')
addBoardForm.classList.remove('displayFlex')

})

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

    export function empityBoardsList(){
      while(boardsList.firstChild){
        boardsList.removeChild(boardsList.firstChild)
      }
    }

//Lidando com a seleção de um board
    const displayContainer = document.querySelector('#boardDisplay')

   const displayName = document.querySelector('#displayName')
   const displayStar = document.querySelector('#displayFav')

   const displayTrash = document.querySelector('#displayDelete')
   const displayClose = document.querySelector('#displayClose')


   //Deletar board

   displayTrash.addEventListener("click",async ()=>{
      if(window.confirm("seu board sera excluido: ")){
    await  deleteCurrentBoard()
     await closeBoard()
      }

   })


displayStar.addEventListener('click',(e)=>{

   let currentFavBoo =  e.target.innerText === "⭐"

  if(currentFavBoo){
    displayStar.innerText = "✩"
  }
  else{
    displayStar.innerText = "⭐"
  }

let newFav ={
  "favorito": !currentFavBoo
}

   updateBoardFavorito(newFav)
   getBoards()
})


    export function handleBoardSelection(e){
        
        localStorage.setItem('currentBoardId',e.target.getAttribute('name'))
        displayName.value = e.target.querySelector('h3').innerText
        
     
        if(e.target.getAttribute("favorito") === "true"){
          displayStar.innerText = "⭐"
        }
        else{
          displayStar.innerText = "✩"
        }
        
        getLists()
        displayContainer.classList.remove('displayNone')
        
    }

    displayClose.addEventListener('click',()=>{
      closeBoard()
    })

    displayName.addEventListener("change",()=>{

        let newName ={
          "name":displayName.value
        }
        updateBoardName(newName)
    })


    async function closeBoard(){
      localStorage.removeItem('currentBoardId')
      displayContainer.classList.add('displayNone')
      displayName.value = ''
      document.querySelector('#listName').value =''
      await getBoards()
      closeCardDisplay()
    }

    //Fechar a tela do card
    cardDisplayClose.addEventListener('click',()=>{
      closeCardDisplay()
})

  function closeCardDisplay(){
    localStorage.removeItem('currentCardId')
    cardDisplay.classList.remove('displayGrid')
    cardDisplay.classList.add('displayNone')
    clearCommentsList()
    clearTagsCheckBoxes()
   
  }

    //criando uma lista
    
    addListForm.addEventListener('submit',(e)=>{
      e.preventDefault()
      let data = 
        {
          "name": document.querySelector('#listName').value,
          "board_id": localStorage.getItem('currentBoardId'),
          "position": 0
        }
        document.querySelector('#listName').value = ''
        createList(data)
    })



tagsOp.forEach(t=>{
  t.addEventListener('change',e=>handleTagOp(e.target))
})






    function handleTagOp(op){
      let tagId = op.id
      let cardId = localStorage.getItem('currentCardId')
      let isChecked = op.checked
      let tagData = {
        "card_id": cardId,
        "tag_id": tagId
      }
      
      if(isChecked){
        addTag(tagData)
      }
      else{
        removeTag(tagData)
      }

}





    //Adicionando comentarios

    commentForm.addEventListener('submit',async (e)=>{
      e.preventDefault()
     let comment = {
        "comment": document.querySelector('#inputComment').value,
        "card_id": localStorage.getItem('currentCardId')
      }
      if( comment.comment != ''  ){
       await createComment(comment)
      }
      document.querySelector('#inputComment').value =''
    })

//Limpa a lista de listas
    export function clearListDisplay(){
    let cont=  document.querySelector('#listsContainer')

      while(cont.firstChild){
        cont.removeChild(cont.firstChild)
      }

    }

//Delete card
cardDelete.addEventListener('click',()=>{
    let confirmation = window.confirm("Deseja excluir esse card ?")

    if(confirmation){
      deleteCard()
      closeCardDisplay()
    }

})



//limpa os checkboxes dos tagsinputs

function clearTagsCheckBoxes(){
  tagsInputs.forEach(i=>{
    i.checked = false
  })
}


//monstrando favoritos

favorites.addEventListener('click',e=>{
  let btn = e.target 
if(displayContainer.classList.contains('displayNone')){
  if(btn.innerText === 'Favoritos'){
 
    btn.innerText = 'Todos'
    btn.style.color = 'black'
    btn.style.backgroundColor = 'white'

    getFavoritesBoards()
}
else{
  btn.innerText = 'Favoritos'
  btn.style.color = 'white'
  btn.style.backgroundColor = '#22272B'
  getBoards()
}
}



})


    //Limpando lista de comentarios

   export function clearCommentsList(){
        while(commentsList.firstChild){
          commentsList.removeChild(commentsList.firstChild)
        }
    }


    




