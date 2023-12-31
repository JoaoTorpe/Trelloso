import { getCurrentUser } from "./userService.js";

//autentica usuario e armazena token
export  default async function login(data){
 
    try {
        const response = await fetch("http://localhost:8087/api/v1/auth/token", {
          method: "POST",
          body:data,
        });
  
  
        const token = await response.json();
        if(token.access_token){
            localStorage.setItem('token', token.access_token)
            getCurrentUser(token.access_token)
        }
  
      } 
      catch (error) {
        console.error("Error:", error);
      }
  }