// Importing
import { fetchData } from "../../../utils/fetch.js";
import { userType } from "./usertype.js";

// Handles user login
export async function login(email, password)
{
    // Connecting to the API
    const result = await fetchData("login", "POST", { "Content-Type": "application/json" }, { email: email, password_hash: password });
    
    if (result)
    {
        localStorage.setItem("email", email);
        localStorage.setItem("token", result);

        // Wait for userType to finish
        const type = await userType(email, result);
        if (type) {
            // Double set for safety
            localStorage.setItem("userType", type);
            return true;
        } else {
            console.log("[!] Could not determine user type after login.");
            return false;
        }
    }
    else 
    {
        console.log("[!] Login unsuccessful!");
        return false;
    }
}

