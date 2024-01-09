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

        let tagsArray = currentCard.tags
        let commentsArray = currentCard.cardcomments

        commentsArray.forEach(e => {
            let li = document.createElement('li')
          li.innerHTML = `
          <li class="comment" id="${e.id}" >${e.comment}</li>
          `
            document.querySelector("#commentsContainer").appendChild(li)
        });
        
    
    } 
    catch (error) {
      console.error("Error:", error);
    }

}


export {createCard,getCard}