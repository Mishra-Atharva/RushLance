import { fetchData } from "../../../../utils/fetch.js";

export async function getDashboard()
{
    const token = localStorage.getItem("token");

    const result = fetchData("dashboard-admin", "GET", {"Content-Type": "application/json",  "Authorization": `Bearer ${token}`}, null);

    if (result)
    {
        return result;
    }
    return null;
}