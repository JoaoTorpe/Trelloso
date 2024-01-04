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
             generateBoards()
      
      } 
      catch (error) {
        console.error("Error:", error);
      }
  }

  function generateBoards(){
    boards.forEach((b)=>{

        let li = document.createElement('li')
        li.innerHTML =`
        <div style="background-color: ${b.color};" class="board" name="${b.id} favorito="${b.favorito}">
            <h3>${b.name}</h3>
            <span>⭐</span>
            </div>`
            document.querySelector('#boardsContainer').appendChild(li)
    })
    
    while (boards.length > 0) {
        boards.pop();
    }
  }

  function createBoard(){
    
  }

 

  export {getBoards,generateBoards}