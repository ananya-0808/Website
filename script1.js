const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.gif`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp4`;
}

function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

function prevMusic(){
  musicIndex--; 
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}


playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  const duration = e.target.duration; 
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
  playingSong();
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText;
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

mainAudio.addEventListener("ended", ()=>{
  let getText = repeatBtn.innerText;
  switch(getText){
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp4"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; 
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

const display = document.getElementById("display");
function appendToDisplay(input){
  display.value += input;
}
function clearDisplay(){
  display.value = "";
}
function calculate(){
  try{
    display.value = eval(display.value);
  }
  catch(error){
    display.value = "Error"
  }
}



const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];

// Handle form submission to add a new todo
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value); // Call addTodo function with the input value
});

// Add a new todo to the list
function addTodo(item) {
  if (item !== '') { // Ensure the input is not empty
    const todo = {
      id: Date.now(), // Unique id based on the current timestamp
      name: item,
      completed: false // New todos are not completed by default
    };
    todos.push(todo); // Add the new todo to the array
    addToLocalStorage(todos); // Store the updated todos in localStorage
    todoInput.value = ''; // Clear the input field
  }
}

// Render the todo list
function renderTodos(todos) {
  todoItemsList.innerHTML = ''; // Clear the current list

  todos.forEach(function(item) {
    const checked = item.completed ? 'checked' : ''; // Check if the todo is completed
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id); // Set a data attribute for identifying the todo item

    // Apply visual styles for completed tasks
    if (item.completed) {
      li.classList.add('checked'); // Optionally add a class for styling completed items
      li.style.textDecoration = 'line-through'; // Apply strike-through style to completed tasks
    }

    // Create the HTML structure for the todo item
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}> ${item.name}
      <img src="images1/delete.png" class="delete-button"> <!-- Delete button -->
    `;
    todoItemsList.append(li); // Append the new list item to the todo list
  });
}

// Save todos to localStorage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos)); // Store todos in localStorage as a string
  renderTodos(todos); // Re-render the list
}

// Retrieve todos from localStorage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference); // Parse the JSON string into an array
    renderTodos(todos); // Render the todos
  }
}

// Toggle the completed state of a todo item
function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed; // Toggle the completed state
    }
  });

  addToLocalStorage(todos); // Store the updated todos in localStorage
}

// Delete a todo item
function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id; // Remove the item with the matching id
  });

  addToLocalStorage(todos); // Store the updated todos in localStorage
}

// Load todos from localStorage on page load
getFromLocalStorage();

// Event listener for checking/unchecking checkboxes and deleting items
todoItemsList.addEventListener('click', function(event) {
  const checkbox = event.target.closest('.checkbox'); // Get the checkbox element clicked
  
  // If the clicked element is a checkbox
  if (checkbox) {
    const todoId = checkbox.closest('.item').getAttribute('data-key'); // Get the todo item's ID
    toggle(todoId); // Toggle the completion of that todo
  }

  // Handle delete button click
  if (event.target.classList.contains('delete-button')) {
    const todoId = event.target.closest('.item').getAttribute('data-key'); // Get the todo item's ID
    deleteTodo(todoId); // Delete the todo item
  }
});





document.addEventListener('DOMContentLoaded', () => {
  const movingObject = document.getElementById('object');

  movingObject.addEventListener('click', () => {
      // Move the object to the right
      movingObject.style.transform = 'translateX(100vw)'; // Adjust if needed

      // Save the state to local storage
      localStorage.setItem('objectMoved', 'true');

      // Wait for the animation to finish before navigating to the next page
      setTimeout(() => {
          window.location.href = 'screen-2.html';
      }, 1000); // Match this duration to the CSS transition time
  });
});