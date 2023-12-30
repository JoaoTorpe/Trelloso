
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

  export {registerUser}