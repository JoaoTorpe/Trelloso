import { getCurrentUser } from "./userService.js";
import { revealMain } from "./main.js";
import { generateBoards, getBoards } from "./boardsService.js";
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
            getCurrentUser()
            getBoards()
            revealMain()
        }
  
      } 
      catch (error) {
        console.error("Error:", error);
      }
  }