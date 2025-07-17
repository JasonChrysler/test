



document.getElementById('soumettre').onclick = function () {
    const inputs = document.querySelectorAll('input[type="text"][data-reponse]');
    let total = 0;
    let score = 0;
    let toutRempli = true;

    // Supprimer les anciens messages d'erreur et de réponse
    document.querySelectorAll('.message-erreur, .reponse-correcte').forEach(function (el) {
        el.remove();
    });

    // Vérifie que tous les champs sont remplis         
    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            input.style.borderColor = "blue";
            toutRempli = false;

            // Créer un message d’erreur
            let message = document.createElement('div');
            message.textContent = "Ce champ est obligatoire.";
            message.className = "message-erreur";
            message.style.color = "blue";
            message.style.fontSize = "0.9em";
            message.style.marginTop = "5px";
            input.parentNode.appendChild(message);
        } else {
            input.style.borderColor = "";
        }
    });

    // Afficher l'alerte si des champs sont vides
    if (!toutRempli) {
        alert("Veuillez remplir tous les champs avant de soumettre.");
        return; 
    }

    // Correction si tous les champs sont remplis
    inputs.forEach(function (input, i) {
        let bonneReponse = input.getAttribute('data-reponse').trim().toLowerCase();
        let reponseUser = input.value.trim().toLowerCase();
        let points = parseFloat(input.closest('.question, .questiond').getAttribute('data-points')) || 0;
        total += points;

        if (reponseUser === bonneReponse) {
            input.style.borderColor = "green";
            score += points;
        } else {
            input.style.borderColor = "red";
        }

        let rep = document.createElement('div');
        rep.className = "reponse-correcte";
        rep.style.color = "#555";
        rep.style.fontSize = "0.85em";
        rep.style.marginTop = "5px";
        rep.innerHTML = "<i>Réponse attendue : </i><b>" + input.getAttribute('data-reponse') + "</b>";

        input.parentNode.appendChild(rep);
    });

    // Affiche la note dans la popup
    let note = total > 0 ? (score / total) * 20 : 0;
    document.getElementById('popup-message').innerHTML = "Votre note : <b>" + note.toFixed(2) + " / 20</b>";
    document.getElementById('popup-note').style.display = 'flex';
};



