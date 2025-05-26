import { fetchData } from "../../../../utils/fetch.js";

export async function createTransaction(c_name, f_name)
{
    const token = localStorage.getItem("token");

    const result = fetchData("transactions", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        {
            c_name: c_name,
            f_name: f_name
        }
    );

    return result;
}