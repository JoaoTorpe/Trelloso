//buscando boards do usuario
import { empityBoardsList } from "./main.js";
import { handleBoardSelection } from "./main.js";
let boards = []

async function getBoards() {
    try {
        const response = await fetch("http://localhost:8087/api/v1/users/me/boards", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token'),
          },
          
        });
        while (boards.length > 0) {
          boards.pop();
      }

           boards = await response.json()
             
             generateBoards()
      
      } 
      catch (error) {
        console.error("Error:", error);
      }
  }

  function generateBoards(){
    empityBoardsList()
    boards.forEach((b)=>{

        let li = document.createElement('li')
        li.innerHTML =`
        <div class="board" style="background-color: ${b.color}; color:white;" class="board" name="${b.id}" favorito="${b.favorito}">
            <h3>${b.name}</h3>
            ${b.favorito ? '<span>⭐</span>' : ''}
            </div>`
            document.querySelector('#boardsContainer').appendChild(li)
    })
    
    

    document.querySelectorAll('.board').forEach(b=>{
      b.addEventListener('click',(e)=>{
        handleBoardSelection(e)
        
      })
    })
  }

  async function updateBoardName(newName){

    try {
      const response = await fetch("http://localhost:8087/api/v1/boards/"+localStorage.getItem("currentBoardId"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
        body:JSON.stringify(newName),
      });

    } 
    catch (error) {
      console.error("Error:", error);
    }

  }

  async function updateBoardFavorito(newFavorito){

    try {
      const response = await fetch("http://localhost:8087/api/v1/boards/"+localStorage.getItem("currentBoardId"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
        body:JSON.stringify(newFavorito),
      });

    } 
    catch (error) {
      console.error("Error:", error);
    }

  }



  

  
  async function createBoard(data){
   
    try {
      const response = await fetch("http://localhost:8087/api/v1/boards/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
        body: JSON.stringify(data)
      });

     
      getBoards()
         
    
    } 
    catch (error) {
      console.error("Error:", error);
    }
  }


  async function deleteCurrentBoard(){


    try {
      const response = await fetch("http://localhost:8087/api/v1/boards/"+localStorage.getItem("currentBoardId"), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
        
      });

    } 
    catch (error) {
      console.error("Error:", error);
    }
  }


 

  export {getBoards,generateBoards,createBoard,updateBoardName,updateBoardFavorito,deleteCurrentBoard}