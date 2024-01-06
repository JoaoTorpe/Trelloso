//Criando uma lista
import { clearListDisplay } from "./main.js";
import { createCard } from "../cardService.js";
let lists = []
async function createList(data){

    try {
        const response = await fetch("http://localhost:8087/api/v1/lists/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem('token'),
          },
          body:JSON.stringify(data),
        });
        
        const result = await response.json();
            getLists()
      
      } 
      catch (error) {
        console.error("Error:", error);
      }

}

async function getLists(){

    try {
        const response = await fetch("http://localhost:8087/api/v1/boards/"+localStorage.getItem("currentBoardId")+"/lists", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token'),
          },
          
        });

        while(lists.length > 0){
            lists.pop()
        }
         clearListDisplay()   
        lists = await response.json();
        generateLists()
      } 
      catch (error) {
        console.error("Error:", error);
      }
}

    function generateLists(){


        let container = document.querySelector('#listsContainer')
        lists.forEach(l=>{
            let div = document.createElement('div')

          div.innerHTML =  `<ul class="listByItself" id="${l.id}">
      <h3>${l.name}</h3>
      ${l.cards.map(card => `<li class="card">${card.name}</li>`).join('')}

      <input  autocomplete="off"  class="newCardInput" placeholder="Adicionar novo card"  id="${l.id}" type="text">
    </ul>`;
            container.appendChild(div)
        })

    

       let inputs = document.querySelectorAll('.newCardInput')

       inputs.forEach(i=>{
        i.addEventListener('change',(e)=>{
            
        let cardData = 
        {
        "name": e.target.value,
        "date":new Date().toISOString(),
        "list_id": e.target.id,
        "position": 0
        }
        
           createCard(cardData)
           getLists()
        })
       })
    }


export {createList,getLists}