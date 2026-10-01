const token = localStorage.getItem("token");

if (!token) { 
    window.location.href = "index.html"; 
}

const table = document.getElementById("usersTable"); 
const form = document.getElementById("userForm"); 
const message = document.getElementById("userMessage");

async function loadUsers() { 
    const response = await fetch("/user",{
             headers: 
             {
                 Authorization: `Bearer ${token}`

             } 
        });
         if (response.status === 401) {
            localStorage.clear();
            window.location.href = "index.html";
            return;
}


const users = await response.json();

table.innerHTML = "";

users.forEach((user) => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
            <button onclick="updateUser('${user.email}')">
                Modifier
            </button>

            <button onclick="deleteUser('${user.email}')">
                Supprimer
            </button>
        </td>
    `;

    table.appendChild(row);
});
}

form.addEventListener("submit", async (event) => { 
    event.preventDefault();
    const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
};

const response = await fetch("/user", {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(data)
});

const result = await response.json();

message.textContent =
    result.message || "Utilisateur créé";

if (response.ok) {
    form.reset();
    loadUsers();
}
});
async function updateUser(email) {
const username = prompt("Nouveau nom d'utilisateur :");

if (!username) {
    return;
}

const response = await fetch(
    `/users/${encodeURIComponent(email)}`,
    {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            username
        })
    }
);

if (response.ok) {
    loadUsers();
}
}
async function deleteUser(email) {
const confirmation = confirm(
    "Voulez-vous vraiment supprimer cet utilisateur ?"
);

if (!confirmation) {
    return;
}

const response = await fetch(
   `/user/${encodeURIComponent(email)}`,
    {
        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

if (response.ok) {
    loadUsers();
} else {
    const result = await response.json();
    alert(result.message || "Erreur lors de la suppression");
}
}
loadUsers();