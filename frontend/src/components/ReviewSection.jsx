import React, { useState } from "react";
import { useSelector } from "react-redux";

const ReviewSection = ({ reviews, movieId, getReviews, userReviewed }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/movies/${movieId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      },
    );
    const data = await response.json();
    if (response.ok) {
      await getReviews();
      setRating(0);
      setComment("");
    } else {
      console.log(data.message);
    }
  }

  return (
    <div className="review-container">
      <div className="header">
        <h3 className="title">Reviews</h3>
      </div>
      {!userReviewed && (
        <form className="review-form" onSubmit={handleSubmit}>
          <label>Your Rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <label>Your Review</label>

          <textarea
            rows={5}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-header">
              <img
                src={
                  review.user?.profilePicture ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    review.user?.name || "User",
                  )}`
                }
                alt={review.user?.name}
                className="review-avatar"
              />

              <div className="review-info">
                <h4 className="review-name">{review.user?.name}</h4>

                <small className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>

              <span className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(10 - review.rating)}
              </span>
            </div>

            <p className="review-comment">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
