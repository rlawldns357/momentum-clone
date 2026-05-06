/* ====== Momentum: 괴테는 모든 것을 말했다 ====== */

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
  greeting.innerText = '어서 오세요, ' + username + '님';
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

/* ---- 4. 랜덤 배경 이미지 (따뜻한 톤) ---- */
const images = [
  'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1920',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920',
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920',
  'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1920',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1920'
];
const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = 'url(' + chosenImage + ')';

/* ---- 5. 명언집: 괴테는 모든 것을 말했다 ---- */
const quotes = [
  // 괴테
  { quote: '인간은 노력하는 한 방황한다.', author: '요한 볼프강 폰 괴테', book: '파우스트' },
  { quote: '아는 것만으로는 충분하지 않다. 적용해야 한다. 의지만으로는 충분하지 않다. 행해야 한다.', author: '요한 볼프강 폰 괴테' },
  { quote: '사람은 자신이 하는 일에 자신이 있어야 한다. 그리고 그 일이 옳다는 것을 알아야 한다.', author: '요한 볼프강 폰 괴테' },
  { quote: '망설이지 말고 시작하라. 새로운 시작 안에는 신비한 힘이 깃들어 있다.', author: '요한 볼프강 폰 괴테' },
  { quote: '무엇이든 할 수 있거나 할 수 있다고 꿈꾸는 일이라면, 지금 시작하라.', author: '요한 볼프강 폰 괴테' },
  { quote: '눈물 젖은 빵을 먹어보지 않은 자는 인생의 참맛을 모른다.', author: '요한 볼프강 폰 괴테' },
  { quote: '오늘 할 수 있는 일에 전력을 다하라. 그러면 내일은 한 걸음 더 진보한다.', author: '요한 볼프강 폰 괴테' },
  { quote: '자기 자신을 신뢰하는 순간, 어떻게 살아야 할지 알게 된다.', author: '요한 볼프강 폰 괴테' },
  { quote: '재능은 고요함 속에서 자라고, 인격은 세상의 격랑 속에서 빚어진다.', author: '요한 볼프강 폰 괴테' },
  { quote: '하루를 시작하면서 적어도 한 곡의 노래를 듣고, 한 편의 시를 읽고, 한 점의 그림을 보고, 가능하다면 의미 있는 몇 마디 말을 하라.', author: '요한 볼프강 폰 괴테' },
  // 따뜻한 가족의 말 (분위기 매치)
  { quote: '오늘도 너의 하루를 응원해.', author: '엄마의 메모' },
  { quote: '잘하지 않아도 괜찮아. 그저 너답게.', author: '아빠가 남긴 말' },
  { quote: '천천히 가도 돼. 길은 사라지지 않으니까.', author: '할머니의 편지에서' },
  { quote: '오늘 웃었으면 그걸로 충분한 하루야.', author: '딸이 만든 명언' },
  { quote: '커피 한 잔과 햇살이면 충분한 아침이 있다.', author: '주말의 식탁에서' },
  // 시인·작가들의 한 줄
  { quote: '죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를.', author: '윤동주', book: '서시' },
  { quote: '내려갈 때 보았네 / 올라갈 때 보지 못한 그 꽃.', author: '고은', book: '그 꽃' },
  { quote: '흔들리지 않고 피는 꽃이 어디 있으랴.', author: '도종환' },
  { quote: '자세히 보아야 예쁘다. 오래 보아야 사랑스럽다. 너도 그렇다.', author: '나태주', book: '풀꽃' }
];
const quoteEl = document.querySelector('#quote');
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteEl.querySelector('.quote-text').innerText = '"' + todaysQuote.quote + '"';
const authorLine = todaysQuote.book
  ? '— ' + todaysQuote.author + ' 〈' + todaysQuote.book + '〉'
  : '— ' + todaysQuote.author;
quoteEl.querySelector('.quote-author').innerText = authorLine;
quoteEl.classList.remove(HIDDEN);

/* ---- 6. 날씨와 위치 ---- */
const API_KEY = '1cfac442c64c9401a33ca51c6bfd3042';
const weatherEl = document.querySelector('#weather');

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY + '&units=metric&lang=kr';
  fetch(url)
    .then(r => r.json())
    .then(data => {
      weatherEl.querySelector('.city').innerText = data.name || '알 수 없음';
      weatherEl.querySelector('.temp').innerText = Math.round(data.main.temp) + '°';
      weatherEl.querySelector('.desc').innerText = data.weather[0].description;
      weatherEl.classList.remove(HIDDEN);
    })
    .catch(() => {
      weatherEl.querySelector('.city').innerText = '날씨 정보 없음';
      weatherEl.classList.remove(HIDDEN);
    });
}
function onGeoError() {
  weatherEl.querySelector('.city').innerText = '위치를 알 수 없어요';
  weatherEl.classList.remove(HIDDEN);
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
