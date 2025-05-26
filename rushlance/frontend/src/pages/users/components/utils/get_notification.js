import { fetchData } from "../../../../utils/fetch.js";

export async function getNotifications()
{
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const result = fetchData("notificationID", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        {
            email: email
        }
    );

    if (result)
    {
        return result;
    }
    return false;
}