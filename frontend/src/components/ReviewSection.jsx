import React from "react";

const ReviewSection = ({ reviews }) => {
  return (
    reviews.length > 0 && (
      <div className="review-container">
        <div className="header">
          <h3 className="title">Reviews</h3>
        </div>

        {reviews.map((review) => (
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
              <div>
                <h4 className="review-name">{review.user?.name}</h4>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <span className="review-date">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    )
  );
};

export default ReviewSection;
