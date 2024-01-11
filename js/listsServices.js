//Criando uma lista
import { clearListDisplay } from "./main.js";
import { createCard, getCard, updateTagsInputs } from "../cardService.js";

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

          div.innerHTML =  `<ul class="listByItself" uLid="${l.id}">
          <span class="deleteList" >🗑️</span>
      <h3>${l.name}</h3>
      ${l.cards.map(card => `<li liId="${card.id}" class="card">${card.name} <span class="cardTags">${card.tags.map(tag => `<span class="tag" tagId="${tag.id}" style="background-color: ${tag.color};" ></span>`).join('')}</span> </li>`).join('')}

      <input  autocomplete="off"  class="newCardInput" placeholder="Adicionar novo card"  inId="${l.id}" type="text">
    </ul>`;
            container.appendChild(div)
        })

       let listsDelete = document.querySelectorAll('.deleteList')

       listsDelete.forEach(l=>{
        l.addEventListener('click',(e)=>{
          let id =e.target.parentNode.getAttribute('ulId')
          let confirmation = window.confirm("Deseja deletar essa lista ?")
          if(confirmation){
          deleteList(id)
          }
        })
       })

        
    
        let cards = document.querySelectorAll('.card')

        cards.forEach(c=>{
          
          c.addEventListener('click',async e=>{
           await getCard(e.target.getAttribute('lIid'))
           document.querySelector("#cardDisplay").classList.remove('displayNone')
           document.querySelector("#cardDisplay").classList.add('displayGrid')
           updateTagsInputs(e)
          })

        })




       let inputs = document.querySelectorAll('.newCardInput')

       inputs.forEach(i=>{
        i.addEventListener('change', async (e)=>{
            
        let cardData = 
        {
        "name": e.target.value,
        "date":new Date().toISOString(),
        "list_id": e.target.getAttribute('inId'),
        "position": 0
        }
  
          await createCard(cardData)
          await getLists()
        })
       })
    }



    async function deleteList(id){


      try {
        const response = await fetch("http://localhost:8087/api/v1/lists/"+id, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token'),
          },   
        });
    
        getLists()
    
      } 
      catch (error) {
        console.error("Error:", error);
      }
    }



export {createList,getLists}