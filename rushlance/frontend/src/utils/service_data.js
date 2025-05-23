// Importing 
import { fetchData } from "./fetch.js";

// Getting data for the homepage from the API
export async function service_data()
{
    const token = localStorage.getItem("token");

    if (token)
    {
        const token = localStorage.getItem("token");

        const result = await fetchData("services", "GET", 
            {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`  
            });
    
        if (result)
        {
            return JSON.parse(result);
        }
        else 
        {
            console.log("[!] Error getting data!");
        }
    }
    else 
    {
        return null;
    }

}