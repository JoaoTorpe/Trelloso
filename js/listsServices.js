//Criando uma lista

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
        console.log("Success:", result);
      
      } 
      catch (error) {
        console.error("Error:", error);
      }

}

export {createList}