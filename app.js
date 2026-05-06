/* ====== Momentum Clone ====== */

/* ---- 1. 실시간 시계 ---- */
const clock = document.querySelector('#clock');
function getClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clock.innerText = h + ':' + m + ':' + s;
}
getClock();
setInterval(getClock, 1000);

/* ---- 2. 로그인 (localStorage) ---- */
const loginForm = document.querySelector('#login-form');
const loginInput = loginForm.querySelector('input');
const greeting = document.querySelector('#greeting');
const HIDDEN = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(e) {
  e.preventDefault();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  loginForm.classList.add(HIDDEN);
  paintGreeting(username);
}
function paintGreeting(username) {
  greeting.innerText = 'Hello, ' + username;
  greeting.classList.remove(HIDDEN);
  document.querySelector('#todo-form').classList.remove(HIDDEN);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}

/* ---- 3. 투두리스트 (localStorage) ---- */
const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todo-list');
const TODOS_KEY = 'todos';
let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
function deleteTodo(e) {
  const li = e.target.parentElement;
  li.remove();
  todos = todos.filter(t => t.id !== parseInt(li.id));
  saveTodos();
}
function paintTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const btn = document.createElement('button');
  btn.innerText = '✕';
  btn.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(btn);
  todoList.appendChild(li);
}
function handleTodoSubmit(e) {
  e.preventDefault();
  const newTodoText = todoInput.value;
  todoInput.value = '';
  const newTodoObj = { text: newTodoText, id: Date.now() };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}
todoForm.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsed = JSON.parse(savedTodos);
  todos = parsed;
  parsed.forEach(paintTodo);
}

/* ---- 4. 랜덤 배경 이미지 (Unsplash) ---- */
const images = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920'
];
const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = 'url(' + chosenImage + ')';

/* ---- 5. 명언 ---- */
const quotes = [
  { quote: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
  { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { quote: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  { quote: 'Do or do not. There is no try.', author: 'Yoda' },
  { quote: 'The best way to predict the future is to invent it.', author: 'Alan Kay' }
];
const quoteEl = document.querySelector('#quote');
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteEl.querySelector('span:first-child').innerText = '"' + todaysQuote.quote + '"';
quoteEl.querySelector('span:last-child').innerText = '— ' + todaysQuote.author;
quoteEl.classList.remove(HIDDEN);

/* ---- 6. 날씨와 위치 ---- */
const API_KEY = '1cfac442c64c9401a33ca51c6bfd3042';
const weatherEl = document.querySelector('#weather');

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&units=metric';
  fetch(url)
    .then(r => r.json())
    .then(data => {
      weatherEl.querySelector('.city').innerText = data.name || 'Unknown';
      weatherEl.querySelector('.temp').innerText = Math.round(data.main.temp) + '°C';
      weatherEl.querySelector('.desc').innerText = data.weather[0].main;
      weatherEl.classList.remove(HIDDEN);
    })
    .catch(() => {
      weatherEl.querySelector('.city').innerText = 'Weather unavailable';
      weatherEl.classList.remove(HIDDEN);
    });
}
function onGeoError() {
  weatherEl.querySelector('.city').innerText = 'Location denied';
  weatherEl.classList.remove(HIDDEN);
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
