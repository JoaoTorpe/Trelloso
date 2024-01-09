//Criando uma lista
import { clearListDisplay } from "./main.js";
import { createCard, getCard } from "../cardService.js";

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

        let lists = []
         clearListDisplay()   
        lists = await response.json();
        generateLists(lists)
      } 
      catch (error) {
        console.error("Error:", error);
      }
}

    function generateLists(list){


        let container = document.querySelector('#listsContainer')
        list.forEach(l=>{
            let div = document.createElement('div')

          div.innerHTML =  `<ul class="listByItself" id="${l.id}">
      <h3>${l.name}</h3>
      ${l.cards.map(card => `<li id="${card.id}" class="card">${card.name}</li>`).join('')}

      <input  autocomplete="off"  class="newCardInput" placeholder="Adicionar novo card"  id="${l.id}" type="text">
    </ul>`;
            container.appendChild(div)
        })

    
        let cards = document.querySelectorAll('.card')

        cards.forEach(c=>{
          
          c.addEventListener('click',async e=>{
           await getCard(e.target.id)
           document.querySelector("#cardDisplay").classList.remove('displayNone')

          })

        })




       let inputs = document.querySelectorAll('.newCardInput')

       inputs.forEach(i=>{
        i.addEventListener('change', async (e)=>{
            
        let cardData = 
        {
        "name": e.target.value,
        "date":new Date().toISOString(),
        "list_id": e.target.id,
        "position": 0
        }
        
          await createCard(cardData)
          await getLists()
        })
       })
    }


export {createList,getLists}