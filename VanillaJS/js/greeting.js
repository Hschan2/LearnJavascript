const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSMATE = "hidden";
const USERNAME_KEY = "username";

function onLoginBtnClick(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSMATE);
    const username = loginInput.value;
    
    localStorage.setItem(USERNAME_KEY, username); // Local에 username 저장
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.classList.remove(HIDDEN_CLASSMATE);
    greeting.innerHTML = `Hello, ${username}`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    // Form
    loginForm.classList.remove(HIDDEN_CLASSMATE);
    loginForm.addEventListener("submit", onLoginBtnClick);
} else {
    // Greeting
    paintGreetings(savedUsername);
}