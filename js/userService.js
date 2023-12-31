
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
  
  
        const result = await response.json();
        console.log("Success:", result);
      } 
      catch (error) {
        console.error("Error:", error);
      }
  
  }


  async function getCurrentUser(token) {
    try {
        const response = await fetch("http://localhost:8087/api/v1/users/me", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
          },
          
        });
  
  
        const currentUserData = await response.json();
        localStorage.setItem("name",currentUserData.name)
        localStorage.setItem("avatarURL",currentUserData.avatar_url)
      } 
      catch (error) {
        console.error("Error:", error);
      }
  
  }




  export {registerUser , getCurrentUser}