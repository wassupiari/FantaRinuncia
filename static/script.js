let squadra = [];
console.clear();
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
                       if (data.error) {
            // Squadra già esistente: mostra un messaggio di avviso rosso
            alertDiv.classList.add("alert-danger");
            alertDiv.innerHTML = `
                ${data.error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        } else {
            // Squadra creata e salvata con successo: mostra un messaggio di successo verde
            alertDiv.classList.add("alert-success");
            alertDiv.innerHTML = `
                Squadra creata e salvata.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        }

        alertContainer.appendChild(alertDiv);
    })
        .catch(error => {
            console.error('Errore:', error);
        });
    }
document.addEventListener("DOMContentLoaded", function() {

    // Funzione per aggiornare la griglia delle persone selezionate
    function updateSquadraGrid() {
        var squadraContainer = document.getElementById("squadra-container");
        squadraContainer.innerHTML = '<div class="card-body"></div>';

        squadra.forEach(function(person, index) {
            var cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.innerHTML = '<div class="card-body"><p class="card-text">' + person + '</p><button class="btn btn-danger btn-sm delete-btn" data-index="' + index + '">Elimina</button></div>';
            squadraContainer.appendChild(cardElement);
        });

        // Aggiungi gestore di eventi per i pulsanti di eliminazione
        var deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                var indexToRemove = event.target.getAttribute('data-index');
                squadra.splice(indexToRemove, 1);
                updateSquadraGrid();
            });
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



    // Funzione per salvare la squadra su un file JSON

        // Funzione per gestire l'evento di clic sul pulsante "Salva Squadra"
    document.getElementById("salva-squadra-button").addEventListener("click", function() {
        salvaSquadra();
    });

    // Funzione per gestire l'evento di clic sul pulsante di ricerca
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita l'invio del modulo predefinito (che ricarica la pagina)
    searchCards();
});

// Funzione per filtrare le card in base alla query di ricerca
// Funzione per filtrare le card in base alla query di ricerca
function searchCards() {
    var searchQuery = document.getElementById("search-input").value.trim().toLowerCase(); // Rimuove gli spazi bianchi all'inizio e alla fine della query
    var cardItems = document.querySelectorAll(".card-item");
    var searchMessage = document.getElementById("search-message");

    var found = false; // Flag per indicare se almeno una persona è stata trovata con la query di ricerca

    cardItems.forEach(function(cardItem) {
        var cardText = cardItem.querySelector(".card-text").textContent.toLowerCase();
        if (cardText.includes(searchQuery)) {
            cardItem.style.display = "block";
            found = true; // Imposta il flag a true se almeno una persona è stata trovata
        } else {
            cardItem.style.display = "none";
        }
    });

    // Mostra o nasconde il messaggio in base al risultato della ricerca
    if (found) {
        searchMessage.style.display = "none"; // Nascondi il messaggio se almeno una persona è stata trovata
    } else {
        searchMessage.style.display = "block"; // Mostra il messaggio se nessuna persona è stata trovata
    }
}


});


// GO TO TOP BUTTON FUCTION
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


