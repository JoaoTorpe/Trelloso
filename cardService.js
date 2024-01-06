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



export {createCard}