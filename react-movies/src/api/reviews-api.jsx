const API = "http://localhost:8080/api/reviews";

export const addReview = async (review) => {
  const res = await fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getMyReviews = async () => {
  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
