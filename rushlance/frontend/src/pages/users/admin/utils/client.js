import { fetchData } from "../../../../utils/fetch.js";

export async function getClients()
{
    const token = localStorage.getItem("token");

    const result = fetchData("users", "GET", {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}, null);

    if (result)
    {
        return result;
    }
    return null;
}