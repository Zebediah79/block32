const API = import.meta.env.VITE_API;

/** Fetches reservations of logged-in user */
export async function getReservations(token) {
  if (!token) throw Error("You are not logged in.");

  try {
    const response = await fetch(API + "/reservations", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Sends a request to create a new reservation for a book by ID */
export async function createReservation(token, bookId) {
  if (!token) throw Error("You are not logged in.");

  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/** Sends a request to delete a reservation by ID */
export async function deleteReservation(token, id) {
  if (!token) throw Error("You are not logged in.");

  const response = await fetch(API + "/reservations/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
