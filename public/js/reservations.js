const token = localStorage.getItem("token");

if (!token) { 
    window.location.href = "index.html"; 
}

const table = document.getElementById("reservationsTable"); 
const form = document.getElementById("reservationForm"); 
const message = document.getElementById("reservationMessage");

async function loadReservations() { 
    table.innerHTML = "";

// Récupérer les catways
const catwaysResponse = await fetch("/catways", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

if (!catwaysResponse.ok) {
    return;
}

const catways = await catwaysResponse.json();

// Récupérer les réservations de chaque catway
for (const catway of catways) {

    const response = await fetch(
       `/catways/${catway.catwayNumber}/reservations`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        continue;
    }

    const reservations = await response.json();

    reservations.forEach((reservation) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${reservation.catwayNumber}</td>
            <td>${reservation.clientName}</td>
            <td>${reservation.boatName}</td>
            <td>${new Date(reservation.startDate).toLocaleDateString("fr-FR")}</td>
            <td>${new Date(reservation.endDate).toLocaleDateString("fr-FR")}</td>
            <td>
                <button
                    type="button"
                    class="delete-btn"
                    data-id="${reservation._id}"
                    data-catway="${reservation.catwayNumber}">
                    Supprimer
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}
}
form.addEventListener("submit", async (event) => { 
    event.preventDefault();
    
    const catwayNumber =
    document.getElementById("catwayNumber").value;
    const data = {
        clientName: document.getElementById("clientName").value,
        boatName: document.getElementById("boatName").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value
};

const response = await fetch (
    `/catways/${catwayNumber}/reservations`,
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(data)
    }
);

const result = await response.json();

message.textContent =
    result.message || "Réservation créée";

if (response.ok) {
    form.reset();
    loadReservations();
}
});
async function deleteReservation(id, catwayNumber) {
    const confirmation = confirm(
        "Voulez-vous supprimer cette réservation ?"
);

if (!confirmation) {
    return;
}

const response = await fetch (
    `/catways/${catwayNumber}/reservations/${id}`,
    {
        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

const result = await response.json();

alert(result.message);

if (response.ok) {
    loadReservations();
}
}
document.addEventListener("click", (event) => {
    
if (!event.target.classList.contains("delete-btn")) {
    return;
}

const id = event.target.dataset.id;
const catwayNumber = event.target.dataset.catway;

deleteReservation(id, catwayNumber);
});
loadReservations();