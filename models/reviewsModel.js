const reviews = [];
let nextReviewId = 1;

function getAllReviews() {
  return reviews;
}

function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

function createReview(data) {
  const review = {
    id: String(nextReviewId++),
    eventId: data.eventId || '',
    userId: data.userId || '',
    rating: Number(data.rating) || 0,
    comment: data.comment || '',
    createdAt: new Date().toISOString(),
  };

  reviews.push(review);
  return review;
}

function updateReview(id, data) {
  const review = getReviewById(id);
  if (!review) return null;

  review.rating = data.rating !== undefined ? Number(data.rating) : review.rating;
  review.comment = data.comment ?? review.comment;
  review.eventId = data.eventId ?? review.eventId;
  review.userId = data.userId ?? review.userId;

  return review;
}

function deleteReview(id) {
  const index = reviews.findIndex((review) => review.id === id);
  if (index === -1) return null;
  return reviews.splice(index, 1)[0];
}

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
