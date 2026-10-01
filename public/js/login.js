const loginForm = document.getElementById("loginForm"); 
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => { 
    event.preventDefault();
    
    console.log("1 - FORMULAIRE ENVOYÉ");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("2 - EMAIL :", email);

    try {
        console.log("3 - ENVOI DE LA REQUÊTE");

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
        })
    });

    console.log("4 - RÉPONSE REÇUE :", response.status);

    const data = await response.json();

    console.log("5 - DONNÉES :", data);

    if (!response.ok) {
        loginMessage.textContent = data.message;
        return;
    }

    console.log("6 - CONNEXION RÉUSSIE");

    localStorage.setItem("token", data.token);
    localStorage.setItem("email", email);

    console.log("7 - TOKEN ENREGISTRÉ :", localStorage.getItem("token"));

    window.location.href = "dashboard.html";

} catch (error) {
    console.error("8 - ERREUR :", error);
    loginMessage.textContent = "Erreur de connexion au serveur";
}
});