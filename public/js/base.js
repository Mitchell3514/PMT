const inputs = document.querySelectorAll("input");
const warnP = document.querySelector("#warning-message");

// autofill
const usernameFills = document.querySelectorAll(".username-fill");

// form fields
const usernameInp = filterAll(inputs, (input => input.getAttribute("id") === "username"))[0];
const passwordInp = filterAll(inputs, (input => input.getAttribute("id") === "password"))[0];
const oldPasswordInp = filterAll(inputs, (input => input.getAttribute("id") === "old-password"))[0];
const newPasswordInp = filterAll(inputs, (input => input.getAttribute("id") === "new-password"))[0];



/* -------------------------------------------------------------------------- */
/*                              FIELD VALIDATION                              */
/* -------------------------------------------------------------------------- */

function validate(isNew) {
    const usr = usernameInp?.value;
    const pwd = passwordInp?.value;
    const oldPwd = oldPasswordInp?.value;
    const newPwd = newPasswordInp?.value;

    warnP.innerHTML = "";

    if (passwordInp || oldPasswordInp) {
        // Check if usr exists
        if (!getLogin(usr)) {
            warnP.innerHTML = "Gebruikersnaam/e-mail is niet bekend bij ons.";
            return false;
        }

        // Check whether oldpwd is correct.
        if (!existsLoginWithPassword(usr, pwd ?? oldPwd)) {
            warnP.innerHTML = "Wachtwoord komt niet overeen met gebruikersnaam/e-mail.";
            return false;
        }
    }

    if (newPasswordInp && !isNew) {
        // Don't allow the same pwd to be set.
        if (oldPwd === newPwd) {
            warnP.innerHTML = "Nieuw wachtwoord kan niet gelijk zijn aan het oude.";
            return false;
        }
    }

    if (isNew) {
        if (usr.length < 3) {
            warnP.innerHTML = "Gebruikersnaam/e-mail moet minimaal 3 characters zijn.";
            return false;
        }

        if (getLogin(usr)) {
            warnP.innerHTML = "Gebruikersnaam/e-mail is al in gebruik.";
            return false;
        }
    } else {
        if (!getLogin(usr)) {
            warnP.innerHTML = "Gebruikersnaam/e-mail niet gevonden.";
            return false;
        }
    }

    if (isActive(newPasswordInp)) {
        if (newPwd.length < 8) {
            warnP.innerHTML = "Wachtwoord moet minimaal 8 characters zijn.";
            return false;
        }
    }

    return true;
}

/* -------------------------------------------------------------------------- */
/*                                LOGIN MANAGER                               */
/* -------------------------------------------------------------------------- */

function addLogin(username, password) {
    if (getLogin(username)) {
        throw new Error("Username already exists");
    }
    
    window.localStorage.setItem(username, password);
    refreshCard();
}

function getLogin(username) {
    const login = { username, password: window.localStorage.getItem(username) }
    return login.password ? login : null;
}

function existsLoginWithPassword(username, password) {
    const pwd = window.localStorage.getItem(username);
    return pwd !== null && pwd === password;
}

function editLogin(username, password) {
    if (!getLogin(username)) {
        throw new Error("Username not found");
    }

    window.localStorage.setItem(username, password);
    refreshCard();
}

function login(username) {
    if (!getLogin(username)) throw new Error("Username not found in logins");
    window.localStorage.setItem("c", username);
    refreshCard();
}

function getLoggedIn() {
    return window.localStorage.getItem("c");
}

/* -------------------------------------------------------------------------- */
/*                                  INFO CARD                                 */
/* -------------------------------------------------------------------------- */

// card
let cardContainer;
let cardInfoDiv;
let cardUsrDiv;
let cardPwdDiv;
let cardHideDetails;
let cardShowDetails;
let cardLogins;
let cardContent;
let cardFooter;

// Refresh functionality
function refreshCard() {
    if (!cardInfoDiv || !cardUsrDiv || !cardPwdDiv) return;

    refreshButton();

    for (const div of [cardUsrDiv, cardPwdDiv])
        while (div.firstChild) 
            div.removeChild(div.lastChild);
    cardInfoDiv.innerHTML = "";
    cardLogins.classList.remove("is-hidden");

    const hidden = !(window.localStorage.getItem("h"));
    const loggedIn = window.localStorage.getItem("c");

    if (hidden) {
        cardContent.classList.add("is-hidden");
        cardFooter.classList.add("is-hidden");
        cardContainer.classList.remove("is-hidden");
        return;
    } else {
        cardContent.classList.remove("is-hidden");
        cardFooter.classList.remove("is-hidden");
    }

    cardInfoDiv.innerHTML = loggedIn ? `Aangemeld als: ${loggedIn}` : `Niet aangemeld`;

    for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key.length >= 3) {
            const val = window.localStorage.getItem(key);

            const usrChild = document.createElement("p");
            usrChild.innerHTML = key;
            const pwdChild = document.createElement("p");
            pwdChild.innerHTML = val;

            cardUsrDiv.appendChild(usrChild);
            cardPwdDiv.appendChild(pwdChild);
        }
    }

    let count = cardUsrDiv.children.length;
    cardInfoDiv.innerHTML += " <br/> "
    cardInfoDiv.innerHTML += `${count} account${count === 1 ? "" : "s"}`;
    if (!count) {
        cardLogins.classList.add("is-hidden");
    }

    cardContainer.classList.remove("is-hidden");
}

function refreshButton() {
    const hidden = !(window.localStorage.getItem("h"));
    if (hidden) {
        cardShowDetails.classList.remove("is-hidden");
        cardHideDetails.classList.add("is-hidden");
    } else {
        cardShowDetails.classList.add("is-hidden");
        cardHideDetails.classList.remove("is-hidden");
    }
}

/**
 * Card buttons
 */
const cardInterval = setInterval(() => {
    cardContainer = document.querySelector("div#info-card");
    cardInfoDiv = document.querySelector("div#card-loggedin");
    cardUsrDiv = document.querySelector("div#card-usernames");
    cardPwdDiv = document.querySelector("div#card-passwords");
    cardHideDetails = document.querySelector("button#card-hide-details");
    cardShowDetails = document.querySelector("button#card-show-details");
    cardLogins = document.querySelector("div#card-logins");
    cardContent = document.querySelector("div.card-content");
    cardFooter = document.querySelector("footer.card-footer");

    if (!cardInfoDiv || !cardShowDetails || !cardUsrDiv || !cardPwdDiv || !cardHideDetails) return;
    clearInterval(cardInterval);

    document.querySelector("a#card-logout").addEventListener("click", () => {
        window.localStorage.removeItem("c");
        refreshCard();
    });
    
    document.querySelector("a#card-accounts").addEventListener("click", () => {
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key.length >= 3)
                window.localStorage.removeItem(key);
        }
        refreshCard();
    });

    document.querySelector("a#card-clear").addEventListener("click", () => {
        window.localStorage.clear();
        refreshCard();
    });
    
    cardShowDetails.addEventListener("click", () => {
        window.localStorage.setItem("h", "hidden");
        refreshCard();
    });
    
    cardHideDetails.addEventListener("click", () => {
        window.localStorage.removeItem("h");
        refreshCard();
    });

    refreshCard();
}, 250);


/* -------------------------------------------------------------------------- */
/*                            VISIBILITY SWITCHERS                            */
/* -------------------------------------------------------------------------- */

/**
 * Enable password visibility in fields
 */
document.addEventListener("DOMContentLoaded", () => {
    const visIcons = document.querySelectorAll(".password-visibility");

    for(const visIcon of visIcons) {
        visIcon.addEventListener("click", ev => {
            const t = ev.target.tagName === "I" ? ev.target.parentNode : ev.target;
            const c = t.parentNode.children;
        
            const passInput = filterAll(c, ch => ch.tagName === "INPUT")[0];
            passInput.focus();
            passInput.setAttribute("type", ["text", "password"][+(passInput.getAttribute("type") === "text")]);
    
            t.classList.add("is-hidden");
            filterAll(c, ch => ch.tagName === "SPAN" && ch.classList.contains("is-left") && ch !== t)[0]
                .classList.remove("is-hidden");
        });
    }
});
 
/* -------------------------------------------------------------------------- */
/*                              FILLER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

// Username fill
for (let i = 0; i < usernameFills.length; i++) {
    usernameFills[i].innerHTML = getLoggedIn();
}

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

// Filter function to help filter querySelectorAll results
function filterAll(inp, fun) {
    const res = [];
    for (const i of inp) {
        if (fun(i)) res.push(i);
    }
    return res;
}

function isActive(el) {
    (el !== null && el !== undefined) && !el.classList.contains("is-hidden");
}