//buscando boards do usuario
let boards = []

async function getBoards(token) {
    try {
        const response = await fetch("http://localhost:8087/api/v1/users/me/boards", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
          },
          
        });
           boards = await response.json()
             
           
      
      } 
      catch (error) {
        console.error("Error:", error);
      }
  
  }

  export {getBoards}