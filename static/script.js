const squadra = [];
const squadraContainer = document.getElementById("fabContent");
const buttonHidden = document.getElementById("saveSquadBtn");
const alertContainer = document.getElementById("alertSquadFull");
const toastContainer = document.getElementById("toastContainer");

function salvaSquadra() {
  fetch("/crea-squadra", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ squadra: squadra }),
  })
    .then((response) => response.text())
    .then((data) => {

      if (data === true ) {
        toastContainer.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">Salvata!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                   ${data}
                </div>
            </div>
        `;
      } else {
        toastContainer.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-info text-white">
                    <strong class="me-auto">Avviso!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                   ${data}
                </div>
            </div>
        `;
      }
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}


function cancellaSquadra() {
    fetch("/cancella-squadra", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.text())
        .then((data) => {
            let alertDel = document.getElementById("alert-del");
            alertDel.innerHTML = "";

            // Crea e aggiungi l'alert Bootstrap al container
            let alertDiv = document.createElement("div");
            alertDiv.classList.add(
                "alert",
                "alert-success",
        "alert-dismissible",
        "fade",
        "show",
      );
      alertDiv.setAttribute("role", "alert");
      alertDiv.innerHTML = `
            ${data}
            <button type="button" onclick="window.location.reload();" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
            </button>
        `;

      alertDel.appendChild(alertDiv);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
}


function updateBadgeCount(isAdd) {
    let badge = document.querySelector('#fab .badge');
    let currentCount = parseInt(badge.textContent.split('/')[0]);
    const maxCount = 5; // Limite massimo di persone

    if (isAdd && currentCount < maxCount) {
        currentCount++;
    } else {
        currentCount--;
    }
    // Aggiorna il contenuto del badge
    badge.textContent = currentCount + '/' + maxCount;
}

// Seleziona tutte le caselle di controllo
const checkboxes = document.querySelectorAll('.btn-check');

// Aggiungi un gestore di eventi a ciascuna casella di controllo
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', function() {
        var isChecked = this.checked;
        var isAdd = isChecked ? true : false;
        updateBadgeCount(isAdd); // Aggiorna il conteggio nel badge
    });
});

document.addEventListener("DOMContentLoaded", function () {
  function updateSquadraGrid() {

    squadraContainer.innerHTML = " ";
    let totalPoints = 0; // Inizializza il conteggio totale dei punti della squadra


    // Itera attraverso gli elementi della squadra e crea i corrispondenti elementi HTML
    squadra.forEach(function(person, index) {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card", "mb-3");
        cardElement.innerHTML =
            '<div class="card-body p-3" > ' +
            '<p class="card-text">' +
            person.name +
            '</p><p class="points-text">Punti: ' +
            person.points +
            "</p> " +
            '<button class="btn btn-danger btn-sm delete-btn" data-index="' +
            index +
            '">Elimina</button>' +
            "</div>";
        squadraContainer.appendChild(cardElement);
        updateBadgeCount(true);
        totalPoints += person.points; // Aggiungi i punti della persona al conteggio totale
    });

    // Mostra il punteggio totale della squadra
    let pointsContainer = document.createElement("span");
    pointsContainer.id = "team-points";
    pointsContainer.classList.add("fw-bold", "text-dark");
    pointsContainer.innerText = "Punteggio totale squadra: " + totalPoints;
    squadraContainer.appendChild(pointsContainer);



    // Aggiungi gestore di eventi per i pulsanti di eliminazione
    const deleteButtons = squadraContainer.querySelectorAll(".delete-btn");
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            let indexToRemove = event.target.getAttribute("data-index");
            squadra.splice(indexToRemove, 1);
            squadraContainer.innerHTML = ""; // Svuota il contenitore prima di aggiornare la squadra
            updateSquadraGrid();

            // Trova il checkbox corrispondente e deselezionalo
            let checkboxId = "btn-check-" + indexToRemove;
            let checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.checked = false;
            }
            updateBadgeCount(false);
        });
    });

    // Aggiungi una classe "text-danger" al container dei punti se il punteggio totale è superiore a 50
    if (totalPoints > 50) {
        pointsContainer.classList.add("text-danger");
    } else {
        pointsContainer.classList.remove("text-danger");
    }
}


  const cardsContainer = document.getElementById("cards-container");
  if (cardsContainer) {
    cardsContainer.addEventListener("change", function (event) {
      const checkbox = event.target;
      const card = checkbox.closest(".card");
      const cardText = card.querySelector(".card-text").textContent;
      const pointsValue = parseInt(card.querySelector(".points-value").innerText);

      if (checkbox.checked) {
        // Controlla se aggiungere questa persona alla squadra supera il limite massimo di 100 punti
        let totalPoints =
          squadra.reduce((total, person) => total + person.points, 0) +
          pointsValue;
        if (totalPoints <= 50 && squadra.length < 5) {
          squadra.push({ name: cardText, points: pointsValue });
        } else {
          checkbox.checked = false; // Annulla la selezione se supera il limite di 100 punti o il massimo di 5 persone
            alertContainer.innerHTML = `
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-danger text-white">
                    <strong class="me-auto">Errore</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    La tua squadra ha già raggiunto il massimo punteggio consentito di 50 punti o il numero massimo di 5 persone!
                </div>
            </div>
        `;
        }
      } else {
        // Rimuovi la persona dalla squadra
        let index = squadra.findIndex((person) => person.name === cardText);
        if (index !== -1) {
          squadra.splice(index, 1);
        }
      }
      updateSquadraGrid();
    });
  }

  var salvaSquadraButton = document.getElementById("salva-squadra-button");
  if (salvaSquadraButton) {
    salvaSquadraButton.addEventListener("click", function () {
      salvaSquadra();
    });
  }

  var searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchCards();
    });
  }

  // Funzione per filtrare le card in base alla query di ricerca
  function searchCards() {
    var searchQuery = document
      .getElementById("search-input")
      .value.trim()
      .toLowerCase(); // Rimuove gli spazi bianchi all'inizio e alla fine della query
    var cardItems = document.querySelectorAll(".card-item");
    var searchMessage = document.getElementById("search-message");

    var found = false; // Flag per indicare se almeno una persona è stata trovata con la query di ricerca

    cardItems.forEach(function (cardItem) {
      var cardText = cardItem
        .querySelector(".card-text")
        .textContent.toLowerCase();
      var cardPoints = cardItem
        .querySelector(".points-value")
        .textContent.toLowerCase();
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

  // dark mode toggle

  var html = document.querySelectorAll("html")[0];
  var themeToggle = document.querySelectorAll("*[data-bs-toggle-theme]")[0];
  var darkModeIcon = document.getElementById("darkModeIcon");
  var lightModeIcon = document.getElementById("lightModeIcon");

  html.setAttribute("data-bs-theme", "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", function (event) {
      event.preventDefault();

      if (html.getAttribute("data-bs-theme") === "dark") {
        html.setAttribute("data-bs-theme", "light");
        darkModeIcon.classList.add("d-none");
        lightModeIcon.classList.remove("d-none");
      } else {
        html.setAttribute("data-bs-theme", "dark");
        lightModeIcon.classList.add("d-none");
        darkModeIcon.classList.remove("d-none");
      }
    });
  }
});

// register form
function validateForm(inputField) {
  var inputId = inputField.id;
  var inputValue = inputField.value.trim();
  var alertElementId = inputId + "Alert";
  var alertElement = document.getElementById(alertElementId);

  // Nasconde l'alert relativo al campo in cui si sta inserendo l'input
  alertElement.classList.add("d-none");

  // Controlla la lunghezza della password solo se l'input è nel campo password
  if (inputId === "password" && inputValue.length < 5) {
    alertElement.innerHTML =
      "La password deve essere lunga almeno 5 caratteri.";
    alertElement.classList.remove("d-none");
    return false;
  }

  // Controlla se la password contiene almeno un numero solo se l'input è nel campo password
  if (inputId === "password" && !/\d/.test(inputValue)) {
    alertElement.innerHTML = "La password deve contenere almeno un numero.";
    alertElement.classList.remove("d-none");
    return false;
  }

  if (inputId === "username" && inputValue.length < 3) {
    alertElement.innerHTML = "L'username deve essere lungo almeno 3 caratteri.";
    alertElement.classList.remove("d-none");
    return false;
  }

  if (inputId === "bio" && inputValue.length > 25) {
    alertElement.innerHTML = "La bio non può essere più lunga di 25 caratteri.";
    alertElement.classList.remove("d-none");
    return false;
  }

  return true;
}

const passwordInput = document.getElementById("password");
if (passwordInput) {
  passwordInput.addEventListener("input", function () {
    validateForm(this);
  });
}

const usernameInput = document.getElementById("username");
if (usernameInput) {
  usernameInput.addEventListener("input", function () {
    validateForm(this);
  });
}

const bioInput = document.getElementById("bio");
if (bioInput) {
  bioInput.addEventListener("input", function () {
    validateForm(this);
  });
}

// Login DOMpurify
const formLogin = document.getElementById("login-form");
if (formLogin) {
  formLogin.addEventListener("DOMContentLoaded", function () {
    formLogin.addEventListener("submit", function (event) {
      // Evita il comportamento predefinito del modulo di login
      event.preventDefault();

      // Ottieni i valori dei campi del modulo di login
      var username = document.getElementById("usernameLogin").value;
      var password = document.getElementById("passwordLogin").value;

      // Sanifica i valori utilizzando DOMPurify
      var cleanUsername = DOMPurify.sanitize(username);
      var cleanPassword = DOMPurify.sanitize(password);

      // Crea un oggetto con i dati da inviare al server
      var formData = new FormData();
      formData.append("username", cleanUsername);
      formData.append("password", cleanPassword);

      // Invia i dati al server utilizzando Fetch
      fetch("/auth/login", {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(
              "Errore durante la richiesta:",
              response.statusText,
            );
          }
          // Gestisci la risposta dal server
          window.location.href = "/home";
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });
}

// Register DOMpurify
const formRegister = document.getElementById("register-form");
if (formRegister) {
  formRegister.addEventListener("DOMContentLoaded", function () {
    formRegister.addEventListener("submit", function (event) {
      // Evita il comportamento predefinito del modulo di login
      event.preventDefault();

      // Ottieni i valori dei campi del modulo di login
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var bio = document.getElementById("bio").value;

      // Sanifica i valori utilizzando DOMPurify
      var cleanUsername = DOMPurify.sanitize(username);
      var cleanPassword = DOMPurify.sanitize(password);
      var cleanBio = DOMPurify.sanitize(bio);

      // Crea un oggetto con i dati da inviare al server
      var formData = new FormData();
      formData.append("username", cleanUsername);
      formData.append("password", cleanPassword);
      formData.append("bio", cleanBio);

      // Invia i dati al server utilizzando Fetch
      fetch("/auth/register", {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(
              "Errore durante la richiesta:",
              response.statusText,
            );
          }
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  });
}

const cartBtn = document.getElementById('fab');
    if(cartBtn){

        cartBtn.addEventListener('click', function(){

            const cartContent = document.getElementById('fabContent');

                cartBtn.classList.toggle("fabOpen");
                if (cartContent.classList.contains("d-block")){
                    buttonHidden.classList.add("invisible");
                      cartContent.classList.remove("d-block");
                    } else {
                        buttonHidden.classList.remove("invisible");
                      cartContent.classList.add("d-block");
                    }
        });
    }


