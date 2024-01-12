import { getLists } from "./js/listsServices.js";
import { clearCommentsList } from "./js/main.js";

async function createCard(data){

    try {
        const response = await fetch("http://localhost:8087/api/v1/cards/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem('token'),
          },
          body:JSON.stringify(data),
        });
        
        const result = await response.json();
          
      
      } 
      catch (error) {
        console.error("Error:", error);
      }

}

async function getCard(id){
  localStorage.setItem('currentCardId',id)
  try {
      const response = await fetch("http://localhost:8087/api/v1/cards/"+id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
      });
      let currentCard
      
       currentCard = await response.json();
       
        let cardName = document.querySelector('#cardDisplayName')
        cardName.value = currentCard.name

       
        let commentsArray = currentCard.cardcomments
        clearCommentsList()
        commentsArray.forEach(c => {
            let li = document.createElement('li')
          li.innerHTML = `
            <div class="commentWrapper" >
          <li class="comment" comId="${c.id}" >${c.comment}</li>
          <span class="deleteComment">🗑️</span>
          </div>
          `
            document.querySelector("#commentsContainer").appendChild(li)
        });

        //Adicinar eventos ao spans

        let deletes = document.querySelectorAll('.deleteComment')

        deletes.forEach(d=>{
          d.addEventListener('click', e=>{
            let  commentId = e.target.parentNode.querySelector('.comment').getAttribute('comId')
                 deleteComment(commentId)
          })
        })
        
    
    } 
    catch (error) {
      console.error("Error:", error);
    }
}

//Criando comentario
async function createComment(comment){

  try {
      const response = await fetch("http://localhost:8087/api/v1/card_comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem('token'),
        },
        body:JSON.stringify(comment),
      });
      
     
        getCard(localStorage.getItem('currentCardId'))
    
    } 
    catch (error) {
      console.error("Error:", error);
    }

}

//Lidando com tags

async function addTag(tag){

  try {
    const response = await fetch("http://localhost:8087/api/v1/card_tags/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },
      body:JSON.stringify(tag),
    });
     
  getLists()
  } 
  catch (error) {
    console.error("Error:", error);
  }

}

async function removeTag(tag){

  try {
    const response = await fetch("http://localhost:8087/api/v1/card_tags/"+tag.card_id+"/"+tag.tag_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },
     
    });
    
    getLists()
     
  
  } 
  catch (error) {
    console.error("Error:", error);
  }

}


function updateTagsInputs(e){


let target = e.target
  let tagsArray = target.querySelectorAll('.tag')

        for(let i=0;i<4;i++){

          if(tagsArray[i]){
            
            document.getElementById(tagsArray[i].getAttribute('tagId')).checked = true
          }
        }

}

async function deleteCard(){


  try {
    const response = await fetch("http://localhost:8087/api/v1/cards/"+localStorage.getItem("currentCardId"), {
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

async function deleteComment(id){


  try {
    const response = await fetch("http://localhost:8087/api/v1/card_comments/"+id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },   
    });

   getCard(localStorage.getItem('currentCardId'))

  } 
  catch (error) {
    console.error("Error:", error);
  }
}


async function updateCardListId(cardId,listId){

  try {
    const response = await fetch("http://localhost:8087/api/v1/cards/"+cardId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem('token'),
      },
      body:JSON.stringify(listId),
    });

    getLists()

  } 
  catch (error) {
    console.error("Error:", error);
  }

}








export {createCard,getCard,createComment,addTag,removeTag,updateTagsInputs,deleteCard,updateCardListId}