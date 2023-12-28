const registerForm = document.querySelector("#registerForm")




registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newUser = {
        name: document.getElementById("registerName").value ,
        username: document.getElementById("registerUserName").value ,
        avatar_url: document.getElementById("registerAvatar").value,
        password: document.getElementById("registerPassword").value
         
    }
    registerUser(newUser)


})


async function registerUser(data) {








    try {
        const response = await fetch("http://192.168.89.186:8087/api/v1/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });


        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }




}





