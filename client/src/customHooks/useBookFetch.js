import axios from "axios";
import { useEffect } from "react";

export default function useBookFetch(id, callback) {
    useEffect(() => {
        async function fetchBookDetails() {
            try {
                const response = await axios.get(`http://localhost:3000/api/book/${id}`);
                const data = response.data;

                const newBook = {
                    title: data.title,
                    author: data.authors?.[0]?.name || "No Author found",
                    cover: data.cover || null,
                    publisher: data.publishers?.[0]?.name || "No Publisher found",
                    description: typeof data.description === "string"
                        ? data.description
                        : data.description?.value || "No description found"
                };

                callback(newBook);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        }

        fetchBookDetails();
    }, [id]);
}
