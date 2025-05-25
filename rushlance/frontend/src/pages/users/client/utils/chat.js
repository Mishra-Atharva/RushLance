import { fetchData } from "../../../../utils/fetch.js";

export async function chatData()
{
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    
    const result = await fetchData("chat", "POST", {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, {email: email});

    console.log(JSON.parse(result));
    if (result)
    {
        return result;
    }
    return null;
}

export async function sendChat(r_name, email, msg)
{
    console.log(r_name, email, msg);
    const token = localStorage.getItem("token");
    
    const result = await fetchData("messages", "POST", {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, 
        {
            r_name: r_name,
            email: email,
            message: msg
        }
    );

    if (result)
    {
        return result;
    }
    return null;

}