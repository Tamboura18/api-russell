const token = localStorage.getItem("token"); 
const email = localStorage.getItem("email");

if (!token || !email) { 
    window.location.href = "index.html"; 
}

const usernameElement = document.getElementById("username"); 
const emailElement = document.getElementById("email"); 
const todayElement = document.getElementById("today"); 
const reservationsTable = document.getElementById("reservationsTable");

emailElement.textContent = email;

const today = new Date();

todayElement.textContent = today.toLocaleDateString("fr-FR");

async function loadUser() {
try {
    const response = await fetch(
        `/user/${encodeURIComponent(email)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const user = await response.json();

    if (!response.ok) {
        localStorage.clear();
        window.location.href = "index.html";
        return;
    }

    usernameElement.textContent = user.username;

} catch (error) {
    console.error(error);
}
}
async function loadReservations() {
try {

    const response = await fetch("/catways/1/reservations", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        return;
    }

    const reservations = await response.json();

    reservationsTable.innerHTML = "";

    reservations.forEach((reservation) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${reservation.catwayNumber}</td>
            <td>${reservation.clientName}</td>
            <td>${reservation.boatName}</td>
            <td>${new Date(reservation.startDate).toLocaleDateString("fr-FR")}</td>
            <td>${new Date(reservation.endDate).toLocaleDateString("fr-FR")}</td>
        `;

        reservationsTable.appendChild(row);
    });

} catch (error) {
    console.error(error);
}
}
document.getElementById("logoutButton").addEventListener("click", async () => {
try {
    await fetch("/logout");
} catch (error) {
    console.error(error);
}

localStorage.removeItem("token");
localStorage.removeItem("email");

window.location.href = "index.html";
});
loadUser(); loadReservations();