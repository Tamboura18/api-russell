const token = localStorage.getItem("token");

if (!token) { 
    window.location.href = "index.html"; 
}

const table = document.getElementById("catwaysTable"); 
const form = document.getElementById("catwayForm"); 
const message = document.getElementById("catwayMessage");

async function loadCatways() {
const response = await fetch("/catways", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

if (response.status === 401) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
}

const catways = await response.json();

table.innerHTML = "";

catways.forEach((catway) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${catway.catwayNumber}</td>
        <td>${catway.catwayType}</td>
        <td>${catway.catwayState}</td>
        <td>
            <button onclick="updateCatway(${catway.catwayNumber})">
                Modifier
            </button>

            <button onclick="deleteCatway(${catway.catwayNumber})">
                Supprimer
            </button>
        </td>
    `;

    table.appendChild(row);
});
}
form.addEventListener("submit", async (event) => {
event.preventDefault();

const catwayNumber = Number(
    document.getElementById("catwayNumber").value
);

const catwayType = document.getElementById("catwayType").value;

const catwayState = document.getElementById("catwayState").value;

const response = await fetch("/catways", {
    method: "POST",

    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
    },

    body: JSON.stringify({
        catwayNumber,
        catwayType,
        catwayState
    })
});

const data = await response.json();

message.textContent = data.message || "Catway créé";

if (response.ok) {
    form.reset();
    loadCatways();
}
});
async function updateCatway(number) {
    const newState = prompt("Nouvel état du catway :");
    if (!newState) {
        return;
}

const response = await fetch(`/catways/${number}`, {
    method: "PUT",

    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },

    body: JSON.stringify({
        catwayState: newState
    })

});

if (response.ok) {
    loadCatways();
}
}
async function deleteCatway(number) {
    const confirmation = confirm(
        "Voulez-vous vraiment supprimer ce catway ?"
);

if (!confirmation) {
    return;
}

await fetch(`/catways/${number}`, {
    method: "DELETE",

    headers: {
        Authorization: `Bearer ${token}`
    }
});

loadCatways();
}
loadCatways();