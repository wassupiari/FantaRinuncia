document.addEventListener("DOMContentLoaded", function() {
    // Array per memorizzare le persone selezionate
    var squadra = [];

    // Funzione per aggiornare la griglia delle persone selezionate
    function updateSquadraGrid() {
        var squadraContainer = document.getElementById("squadra-container");
        squadraContainer.innerHTML = '<div class="card-body"></div>';

        squadra.forEach(function(person) {
            var cardElement = document.createElement("div");
            cardElement.innerHTML = '<div class="card-body" ><p class="card-text">' + person  + '</p>';
            squadraContainer.appendChild(cardElement);
        });
    }

    // Selezionatore per le card e gestione degli eventi
    var cardsContainer = document.getElementById("cards-container");
    cardsContainer.addEventListener("change", function(event) {
        var checkbox = event.target;
        var card = checkbox.closest(".card");
        var cardText = card.querySelector(".card-text").textContent;

        if (checkbox.checked) {
            squadra.push(cardText);
        } else {
            var index = squadra.indexOf(cardText);
            if (index !== -1) {
                squadra.splice(index, 1);
            }
        }

        updateSquadraGrid();
    });

    // Funzione per gestire l'evento di clic sul pulsante "Salva Squadra"
    document.getElementById("salva-squadra-button").addEventListener("click", function() {
        salvaSquadra();
    });

    // Funzione per salvare la squadra su un file JSON
    function salvaSquadra() {
        fetch('/crea-squadra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ squadra: squadra }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
                var alertContainer = document.getElementById("alert-container");
                alertContainer.innerHTML = '';

                // Crea e aggiungi l'alert Bootstrap al container
                var alertDiv = document.createElement("div");
                alertDiv.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
                alertDiv.setAttribute("role", "alert");
                alertDiv.innerHTML = `
                    Squadra creata e salvata.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                alertContainer.appendChild(alertDiv);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    }

    // Funzione per gestire l'evento di clic sul pulsante di ricerca
    document.getElementById("search-button").addEventListener("click", function() {
        searchCards();
    });

    // Funzione per gestire l'evento di pressione del tasto "Invio" nella casella di ricerca
    document.getElementById("search-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchCards();
        }
    });

    // Funzione per filtrare le card in base alla query di ricerca
    function searchCards() {
        var searchQuery = document.getElementById("search-input").value.toLowerCase();
        var cardItems = document.querySelectorAll(".card-item");

        cardItems.forEach(function(cardItem) {
            var cardText = cardItem.querySelector(".card-text").textContent.toLowerCase();
            if (cardText.includes(searchQuery)) {
                cardItem.style.display = "block";
            } else {
                cardItem.style.display = "none";
            }
        });
    }
});
