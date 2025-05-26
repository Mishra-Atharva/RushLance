// Importing
import { fetchData } from "../../../utils/fetch.js";

// Handles user login
export async function userType(email, token)
{

    // Connecting to the API
    const result = await fetchData("user-email", "POST", {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, { email: email});
    
    // Success or Fail
    if (result)
    {
        localStorage.setItem("type", JSON.parse(result)[0]);
        localStorage.setItem("user_name", JSON.parse(result)[1]);
        localStorage.setItem("id", JSON.parse(result)[2]);

        return true;
    }
    else 
    {
        console.log("[!] couldn't get user type!");
        return false;
    }
}