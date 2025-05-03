const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const songNameDisplay = document.getElementById('song-name');
const albumArt = document.getElementById('album-art');

const songs = [
    { src: 'songs/music-1.mp4', name: 'tranquility', art:'music-1.gif' },
    { src: 'songs/music-2.mp4', name: 'breathe' , art:'music-2.gif'},
    { src: 'songs/music-3.mp4', name: 'loving you', art:'music-3.gif' },
    { src: 'songs/music-4.mp4', name: 'In the Monastery' , art:'music-4.gif'},
    { src: 'songs/music-5.mp4', name: 'Claire De Lune' , art:'music-5.gif'},
    { src: 'songs/music-6.mp4', name: 'Gymnopédie No.1', art:'music-6.gif' },
    { src: 'songs/music-7.mp4', name: 'Imagine' , art:'music-7.gif'},
    { src: 'songs/music-8.mp4', name: 'Bread' , art:'music-8.gif'},
    { src: 'songs/music-9.mp4', name: 'Bliss' , art:'music-9.gif'}
    
  ];

let currentSongIndex = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    songNameDisplay.textContent = songs[index].name;
    albumArt.src = songs[index].art;
    audio.play();
    playPauseButton.textContent = 'pause';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateSeekBar() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekBar.value = (currentTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTime);

    // Update the seek bar gradient based on thumb position
    const percent = (currentTime / duration) * 100;
    seekBar.style.background = `linear-gradient(to right, #00E9AB ${percent}%, #8C8CF6 ${percent}%, #fff ${percent}%, #fff 100%)`;
}

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'play_arrow';
    }
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateSeekBar);

seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
    updateSeekBar(); // Update seek bar to reflect the manual change
});

loadSong(currentSongIndex);




document.addEventListener('DOMContentLoaded', () => {
    const animatedObject = document.getElementById('ufo');

    // Function to toggle animation
    function toggleAnimation() {
        if (animatedObject.classList.contains('ufo-move')) {
            animatedObject.classList.remove('ufo-move');
            animatedObject.classList.add('ufo-freeze');
        } else {
            animatedObject.classList.remove('ufo-freeze');
            animatedObject.classList.add('ufo-move');
        }
        isAnimating = !isAnimating;
    }

    // Attach click event to the animated object
    animatedObject.addEventListener('click', toggleAnimation);
});


document.addEventListener('DOMContentLoaded', () => {
    const animatedlight = document.getElementById('light');

    // Function to toggle animation
    function tAnimation() {
        if (animatedlight.classList.contains('yes-light')) {
            animatedlight.classList.remove('yes-light');
            animatedlight.classList.add('no-light');
        } else {
            animatedlight.classList.remove('no-light');
            animatedlight.classList.add('yes-light');
        }
        isAnimating = !isAnimating;
    }

    // Attach click event to the animated object
    animatedlight.addEventListener('click', tAnimation);
});
