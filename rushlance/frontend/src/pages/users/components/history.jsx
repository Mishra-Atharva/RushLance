import Card from "./Card.jsx";
import { bookingData } from "../client/utils/bookings.js";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "./utils/review.js";

export default function History() {
  const [bookings, setBookings] = useState([]);
  const [reviewingBooking, setReviewingBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await bookingData();
        if (data) {
          const parsedData = typeof data === "string" ? JSON.parse(data) : data;
          setBookings(parsedData);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  const handleReviewSubmit = async (bookingId) => {
    setIsSubmitting(true);

    const result = await createReview(rating, reviewText, bookingId);

    if (result) {
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, reviewed: true, rating, review: reviewText }
            : booking
        )
      );
    }

    setReviewingBooking(null);
    setRating(0);
    setReviewText("");
    setIsSubmitting(false);
  };

  return (
    <section className="p-5 w-full h-full shadow rounded-2xl bg-white flex flex-col">
      <h1 className="font-bold text-2xl mb-6">Booking History</h1>

      <div className="flex-1 overflow-hidden">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-2 pb-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="relative h-fit">
              <Card item={booking} />

              {booking.status === "completed" && !booking.reviewed && (
                <button
                  onClick={() => setReviewingBooking(booking.id)}
                  className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition shadow-md"
                >
                  Leave Review
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {reviewingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Share your experience with this service..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setReviewingBooking(null);
                  setRating(0);
                  setReviewText("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleReviewSubmit(reviewingBooking)}
                disabled={isSubmitting || rating === 0 || !reviewText.trim()}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  isSubmitting || rating === 0 || !reviewText.trim()
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
