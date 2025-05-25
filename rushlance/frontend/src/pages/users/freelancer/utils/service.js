import { fetchData } from "../../../../utils/fetch.js";

export async function serviceData()
{
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const result = await fetchData("dashboard-freelancer-service", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
        }, {email: email});

    // Success or Fail
    if (result)
    {
        console.log(JSON.parse(result))
        return result;
    }
    else 
    {
        console.log("[!] Can't get profile data");
        return false;
    }
}