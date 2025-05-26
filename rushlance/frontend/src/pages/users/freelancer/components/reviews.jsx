import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaSpinner } from "react-icons/fa";
import { getReviews } from "../utils/review";

// Enhanced star rating component with hover effects
function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        i < rating ? (
          <FaStar 
            key={i} 
            className="text-yellow-400 text-lg transition-colors duration-200" 
          />
        ) : (
          <FaRegStar 
            key={i} 
            className="text-gray-300 text-lg transition-colors duration-200" 
          />
        )
      ))}
    </div>
  );
}

function FreelancerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getReviews();
        
        // Handle both string and object responses
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        
        if (!Array.isArray(parsedData)) {
          throw new Error('Received invalid reviews data format');
        }

        setReviews(parsedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message || 'Failed to load reviews. Please try again later.');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  console.log(reviews);
  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg text-center">
        <FaSpinner className="animate-spin text-blue-500 text-2xl mx-auto mb-3" />
        <p>Loading reviews...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-red-500 bg-red-50 p-3 rounded-lg">
          <h3 className="font-semibold">Error loading reviews</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h2>

      {/* Average rating summary */}
      <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-4xl font-bold text-gray-800 mr-4">{avgRating}</div>
        <div className="flex-1">
          <StarRating rating={Math.round(avgRating)} />
          <p className="text-sm text-gray-500 mt-1">
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li 
              key={review.id} 
              className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-medium text-gray-800">
                      {review.reviewer_name || `User #${review.reviewer_name}`}
                    </h4>
                    <div className="mt-1 sm:mt-0">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FreelancerReviews;