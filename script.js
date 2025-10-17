// --- ระบบรวม: Playlist Pop-up (ฉบับแก้ไขสมบูรณ์) ---

// 💡 1. ตั้งค่าหลัก
const SPECIAL_IMAGE_URLS = [
    'https://uwuxp.github.io/Flower4U/secret_1.png', 
    'https://uwuxp.github.io/Flower4U/secret_2.png', 
    'https://uwuxp.github.io/Flower4U/secret_3.png',
    'https://uwuxp.github.io/Flower4U/secret_4.png',
    'https://uwuxp.github.io/Flower4U/secret_5.png'
];
const SPAWN_CHANCE = 0.4;

const playlist = [
    { title: "Shoti-LDR", src: "https://uwuxp.github.io/Flower4U/song/song1.mp3" },
    { title: "JVKE-her", src: "https://uwuxp.github.io/Flower4U/song/song2.mp3" },
    { title: "Ed Sheeran-Perfect", src: "https://uwuxp.github.io/Flower4U/song/song3.mp3" },
];
let currentSongIndex = 0;

// 💡 2. ดึง Element ทั้งหมดมาเก็บไว้
const backgroundMusic = document.getElementById('bg-music');
const musicControls = document.getElementById('music-controls');
const musicButton = document.getElementById('music-toggle-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songInfoWrapper = document.getElementById('song-info-wrapper');
const songInfo = document.getElementById('song-info');
const playlistPopup = document.getElementById('playlist-popup');
const playlistList = document.getElementById('playlist-list');

// 💡 3. ฟังก์ชันสร้าง "หัวใจพื้นหลัง" (เอากลับมาแล้ว!)
function createRandomHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart', 'heart-shape'); 
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    const heartSize = Math.random() * 60 + 20;
    heart.style.width = heartSize + 'px';
    heart.style.height = heartSize * 0.8 + 'px';
    const animationDuration = Math.random() * 5 + 7;
    heart.style.animationDuration = animationDuration + 's';
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
}

// 💡 4. ฟังก์ชันใหม่! สร้างรายการเพลงใน Pop-up
function generatePlaylist() {
    playlistList.innerHTML = "";
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        if (index === currentSongIndex) {
            li.classList.add('current-song');
        }
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playlistPopup.classList.remove('active');
        });
        playlistList.appendChild(li);
    });
}

// 💡 5. ฟังก์ชันจัดการ Playlist
function loadSong(songIndex) {
    songInfo.textContent = playlist[songIndex].title;
    backgroundMusic.src = playlist[songIndex].src;
    const playPromise = backgroundMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicButton.classList.add('playing');
        }).catch(error => {
            console.log("Autoplay was prevented.", error);
            musicButton.classList.remove('playing');
        });
    }
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
}

// 💡 6. ฟังก์ชันสำหรับเริ่มการทำงานทุกอย่าง
function startExperience() {
    document.body.classList.remove("not-loaded");

    // --- ส่วนควบคุมเพลง ---
    musicControls.style.display = 'flex';
    loadSong(currentSongIndex);

    musicButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
        musicButton.classList.toggle('playing', !backgroundMusic.paused);
    });

    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    backgroundMusic.addEventListener('ended', nextSong);

    songInfoWrapper.addEventListener('click', () => {
        generatePlaylist();
        playlistPopup.classList.toggle('active');
    });

    // --- ส่วนสร้างเอฟเฟคพื้นหลัง (เอากลับมาแล้ว!) ---
    setInterval(() => {
        if (Math.random() < SPAWN_CHANCE) {
            const img = document.createElement('div');
            img.classList.add('special-image', 'heart'); 
            const randomIndex = Math.floor(Math.random() * SPECIAL_IMAGE_URLS.length);
            img.style.backgroundImage = `url(${SPECIAL_IMAGE_URLS[randomIndex]})`;
            img.style.left = Math.random() * 100 + 'vw';
            img.style.top = '100vh';
            const imgSize = Math.random() * 40 + 40;
            img.style.width = imgSize + 'px';
            img.style.height = imgSize + 'px';
            img.style.animationDuration = `${Math.random() * 5 + 7}s`;
            document.body.appendChild(img);
            img.addEventListener('animationend', () => img.remove());
        } else {
            createRandomHeart();
        }
    }, 800);

    // ลบ Event Listener ของการคลิกครั้งแรก
    document.body.removeEventListener('click', startExperience);
    document.body.removeEventListener('touchstart', startExperience);
}

// 💡 7. รอการคลิกครั้งแรกเพื่อเริ่มทุกอย่าง
document.body.addEventListener('click', startExperience);
document.body.addEventListener('touchstart', startExperience);
