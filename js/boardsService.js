//buscando boards do usuario
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
           boards = await response.json()
             console.log(boards)
           
      
      } 
      catch (error) {
        console.error("Error:", error);
      }
  
  }

  export {getBoards}