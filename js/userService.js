const helloElement = document.querySelector('#helloP')
const avatar = document.querySelector('#hello img')
//Registra usuario
async function registerUser(data) {
    try {
        const response = await fetch("http://localhost:8087/api/v1/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

       
      } 
      catch (error) {
        console.error("Error:", error);
      }
  
  }


  async function getCurrentUser() {
    try {
        const response = await fetch("http://localhost:8087/api/v1/users/me", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token'),
          },
          
        });
  
  
        const currentUserData = await response.json();
        localStorage.setItem("name",currentUserData.name)
        localStorage.setItem("avatarURL",currentUserData.avatar_url)
        helloElement.innerText = "Ola, "+localStorage.getItem('name')
        avatar.src = localStorage.getItem('avatarURL')
        
      } 
      catch (error) {
        console.error("Error:", error);
      }
  
  }




  export {registerUser , getCurrentUser}