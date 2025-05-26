import { fetchData } from "../../../../utils/fetch.js";

export async function getReviews()
{
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const result = fetchData("reviewID", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        {
            id: JSON.parse(id)
        }
    );

    if (result)
    {
        console.log(result);
        return result;
    }
    return false;
}