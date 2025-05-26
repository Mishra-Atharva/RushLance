import { fetchData } from "../../../../utils/fetch";

export async function createReview(rating, comment, booking_id)
{
    const token = localStorage.getItem("token");

    const result = fetchData("reviews", "POST", 
        {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`
        },
        {
            rating: parseInt(rating),
            comment: comment,
            booking_id: parseInt(booking_id)
        }
    )
}