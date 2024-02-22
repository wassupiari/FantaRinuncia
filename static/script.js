var squadra = [];


function userExists() {
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }),
    })
    .then(response => response.text())
    .then(data => {
        var alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = '';

        // Crea e aggiungi l'alert Bootstrap al container
        var alertDiv = document.createElement("div");
        alertDiv.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
        alertDiv.setAttribute("role", "alert");
        if (data) {
            alertDiv.classList.add("alert-danger");
            alertDiv.innerHTML = `
                ${data}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        } else {
            alertDiv.classList.add("alert-success");
            alertDiv.innerHTML = `
                ${data}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
        }

        alertContainer.appendChild(alertDiv);
    }
    )
    .catch(error => {
        console.error('Errore:', error);
    });
}
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
                var alertContainer = document.getElementById("alert-container");
                alertContainer.innerHTML = '';

                // Crea e aggiungi l'alert Bootstrap al container
                var alertDiv = document.createElement("div");
                alertDiv.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
                alertDiv.setAttribute("role", "alert");
                if (data) {
                    alertDiv.classList.add("alert-danger");
                    alertDiv.innerHTML = `
                        ${data}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `;
                } else {
                    alertDiv.classList.add("alert-success");
                    alertDiv.innerHTML = `
                        ${data}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `;
                }

        alertContainer.appendChild(alertDiv);
    })
        .catch(error => {
            console.error('Errore:', error);
        });
    }


    function cancellaSquadra() {
    fetch('/cancella-squadra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.text())
    .then(data => {
        var alertContainer = document.getElementById("alert-del");
        alertContainer.innerHTML = '';

        // Crea e aggiungi l'alert Bootstrap al container
        var alertDiv = document.createElement("div");
        alertDiv.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
        alertDiv.setAttribute("role", "alert");
        alertDiv.innerHTML = `
            ${data}
            <button type="button" onclick="window.location.reload();" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        `;

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
        var buttonHidden = document.getElementById("salva-squadra-button");
        squadraContainer.innerHTML = '';
        var totalPoints = 0; // Inizializza il conteggio totale dei punti della squadra
        var buttonVisible = false;
        squadra.forEach(function(person, index) {
            var cardElement = document.createElement("div");
            cardElement.classList.add("card","mb-3");
            cardElement.innerHTML = '<div class="card-body p-3" > ' +
                '<p class="card-text">' + person.name + '</p><p class="points-text">Punti: ' + person.points + '</p> ' +
                '<button class="btn btn-danger btn-sm delete-btn" data-index="' + index + '">Elimina</button>' +
                '</div>';
            squadraContainer.appendChild(cardElement);
            buttonVisible = true;
            totalPoints += person.points; // Aggiungi i punti della persona al conteggio totale
        });



        // Mostra il punteggio totale della squadra
        var pointsContainer = document.getElementById("team-points");
        pointsContainer.innerText = "Punteggio totale squadra: " + totalPoints;

        if (buttonVisible) {
            buttonHidden.classList.remove("invisible");
            pointsContainer.style.display = "block";
        } else {
            buttonHidden.classList.add("invisible");
            pointsContainer.style.display = "none";
        }

        // Aggiungi gestore di eventi per i pulsanti di eliminazione
        var deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                var indexToRemove = event.target.getAttribute('data-index');
                squadra.splice(indexToRemove, 1);
                updateSquadraGrid();

                // Trova il checkbox corrispondente e deselezionalo
                var checkboxId = "btn-check-" + indexToRemove;
                console.log("Checkbox ID:", checkboxId); // Controlla l'ID dell'elemento checkbox
                var checkbox = document.getElementById(checkboxId);
                if (checkbox) {
                    checkbox.checked = false;
                }
            });
        });


        if (totalPoints > 50) {
            pointsContainer.classList.add("text-danger");
        } else {
            pointsContainer.classList.remove("text-danger");
        }
    }

        var cardsContainer = document.getElementById("cards-container");
        if (cardsContainer) {
            cardsContainer.addEventListener("change", function (event) {
                var checkbox = event.target;
                var card = checkbox.closest(".card");
                var cardText = card.querySelector(".card-text").textContent;
                var pointsValue = parseInt(card.querySelector(".points-value").innerText);

                if (checkbox.checked) {
                    // Controlla se aggiungere questa persona alla squadra supera il limite massimo di 100 punti
                    var totalPoints = squadra.reduce((total, person) => total + person.points, 0) + pointsValue;
                    if (totalPoints <= 50 && squadra.length < 5) {
                        squadra.push({name: cardText, points: pointsValue});
                    } else {
                        checkbox.checked = false; // Annulla la selezione se supera il limite di 100 punti o il massimo di 5 persone
                        var alertContainer = document.getElementById("alert-container-2");
                        alertContainer.innerHTML = '<div class="alert alert-danger" role="alert">La tua squadra ha già raggiunto il massimo punteggio consentito di 50 punti o il numero massimo di 5 persone!</div>';
                    }
                } else {
                    // Rimuovi la persona dalla squadra
                    var index = squadra.findIndex(person => person.name === cardText);
                    if (index !== -1) {
                        squadra.splice(index, 1);
                    }
                }


                updateSquadraGrid();
            });
        }




        var salvaSquadraButton = document.getElementById("salva-squadra-button");
        if (salvaSquadraButton) {
            salvaSquadraButton.addEventListener("click", function() {
                salvaSquadra();
            });
        }

        var searchForm = document.getElementById("search-form");
        if (searchForm) {
            searchForm.addEventListener("submit", function(event) {
                event.preventDefault();
                searchCards();
            });
        }

// Funzione per filtrare le card in base alla query di ricerca
function searchCards() {
    var searchQuery = document.getElementById("search-input").value.trim().toLowerCase(); // Rimuove gli spazi bianchi all'inizio e alla fine della query
    var cardItems = document.querySelectorAll(".card-item");
    var searchMessage = document.getElementById("search-message");

    var found = false; // Flag per indicare se almeno una persona è stata trovata con la query di ricerca

    cardItems.forEach(function(cardItem) {
        var cardText = cardItem.querySelector(".card-text").textContent.toLowerCase();
        var cardPoints = cardItem.querySelector(".points-value").textContent.toLowerCase();
        if (cardText.includes(searchQuery) || cardPoints.includes(searchQuery)) {
            cardItem.style.display = "block";
            found = true; // Imposta il flag a true se almeno una persona è stata trovata
        } else {
            cardItem.style.display = "none";
        }
    });

    // Mostra o nasconde il messaggio in base al risultato della ricerca
    if (found) {
        searchMessage.style.display = "none";
    } else {
        searchMessage.style.display = "block";
    }
}

});



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


    // register form
function validateForm(inputField) {
    var inputId = inputField.id;
    var inputValue = inputField.value.trim();
    var alertElementId = inputId + 'Alert';
    var alertElement = document.getElementById(alertElementId);

    // Nasconde l'alert relativo al campo in cui si sta inserendo l'input
    alertElement.classList.add('d-none');

    // Controlla la lunghezza della password solo se l'input è nel campo password
    if (inputId === 'password' && inputValue.length < 5) {
        alertElement.innerHTML = "La password deve essere lunga almeno 5 caratteri.";
        alertElement.classList.remove('d-none');
        return false;
    }

    // Controlla se la password contiene almeno un numero solo se l'input è nel campo password
    if (inputId === 'password' && !/\d/.test(inputValue)) {
        alertElement.innerHTML = "La password deve contenere almeno un numero.";
        alertElement.classList.remove('d-none');
        return false;
    }

    if (inputId === 'username' && inputValue.length < 3) {
        alertElement.innerHTML = "L'username deve essere lungo almeno 3 caratteri.";
        alertElement.classList.remove('d-none');
        return false;
    }

    if (inputId === 'bio' && inputValue.length > 25) {
        alertElement.innerHTML = "La bio non può essere più lunga di 25 caratteri.";
        alertElement.classList.remove('d-none');
        return false;
    }

    return true;
}


    var passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validateForm(this);
        });
    }

    var usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            validateForm(this);
        });
    }

    var bioInput = document.getElementById('bio');
    if (bioInput) {
        bioInput.addEventListener('input', function() {
            validateForm(this);
        });
    }

    // Login DOMpurify
    var formLogin = document.getElementById('login-form');
    if (formLogin) {
        formLogin.addEventListener('DOMContentLoaded', function() {
            formLogin.addEventListener('submit', function(event) {
                // Evita il comportamento predefinito del modulo di login
                event.preventDefault();

                // Ottieni i valori dei campi del modulo di login
                var username = document.getElementById('usernameLogin').value;
                var password = document.getElementById('passwordLogin').value;

                // Sanifica i valori utilizzando DOMPurify
                var cleanUsername = DOMPurify.sanitize(username);
                var cleanPassword = DOMPurify.sanitize(password);

                // Crea un oggetto con i dati da inviare al server
                var formData = new FormData();
                formData.append('username', cleanUsername);
                formData.append('password', cleanPassword);

                // Invia i dati al server utilizzando Fetch
                fetch('/auth/login', {
                    method: 'POST',
                    body: formData
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Errore durante la richiesta:', response.statusText);
                    }
                    // Gestisci la risposta dal server
                     window.location.href = '/home';
                })
                .catch(function(error) {
                    console.error(error);
                });
            });
        });
    }

    // Register DOMpurify
    var formRegister = document.getElementById('register-form');
    if (formRegister) {
        formRegister.addEventListener('DOMContentLoaded', function() {
            formRegister.addEventListener('submit', function(event) {
                // Evita il comportamento predefinito del modulo di login
                event.preventDefault();

                // Ottieni i valori dei campi del modulo di login
                var username = document.getElementById('username').value;
                var password = document.getElementById('password').value;
                var bio = document.getElementById('bio').value;


                // Sanifica i valori utilizzando DOMPurify
                var cleanUsername = DOMPurify.sanitize(username);
                var cleanPassword = DOMPurify.sanitize(password);
                var cleanBio = DOMPurify.sanitize(bio);

                // Crea un oggetto con i dati da inviare al server
                var formData = new FormData();
                formData.append('username', cleanUsername);
                formData.append('password', cleanPassword);
                formData.append('bio', cleanBio);

                // Invia i dati al server utilizzando Fetch
                fetch('/auth/register', {
                    method: 'POST',
                    body: formData
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Errore durante la richiesta:', response.statusText);
                    }
                    console.log(response);
                })
                .catch(function(error) {
                    console.error(error);
                });
            });
        });
    }















