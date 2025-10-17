// --- ระบบรวม: Playlist Pop-up + Theme Changer ---

// 💡 1. ตั้งค่าหลัก
const SPECIAL_IMAGE_URLS = [
    'https://uwuxp.github.io/Flower4U/secret_1.png', 
    'https://uwuxp.github.io/Flower4U/secret_2.png', 
    'https://uwuxp.github.io/Flower4U/secret_3.png',
    'https://uwuxp.github.io/Flower4U/secret_4.png',
    'https://uwuxp.github.io/Flower4U/secret_5.png'
];
const SPAWN_CHANCE = 0.4;

// ✨✨✨ อัปเกรด Playlist ของคุณตรงนี้! ✨✨✨
const playlist = [
    { 
        title: "Shoti-LDR", 
        src: "https://uwuxp.github.io/Flower4U/song/song1.mp3",
        theme: { // 🎨 ธีมสีชมพู (Original)
            main: '#FF69B4',
            light: '#FFB6C1',
            petalStart: '#F8C8DC',
            petalEnd: '#FFD1DC',
            glow: 'rgba(255, 20, 147, 0.25)'
        }
    },
    { 
        title: "JVKE-her", 
        src: "https://uwuxp.github.io/Flower4U/song/song2.mp3",
        theme: { // 🎨 ธีมสีเขียวมิ้นต์
            main: '#69ffb4',
            light: '#b6ffc1',
            petalStart: '#dcf8c8',
            petalEnd: '#dcffd1',
            glow: 'rgba(20, 255, 147, 0.25)'
        }
    },
    { 
        title: "Ed Sheeran-Perfect", 
        src: "https://uwuxp.github.io/Flower4U/song/song3.mp3",
        theme: { // 🎨 ธีมสีฟ้า
            main: '#69b4ff',
            light: '#b6c1ff',
            petalStart: '#c8dcf8',
            petalEnd: '#d1dcff',
            glow: 'rgba(20, 147, 255, 0.25)'
        }
    },
];
let currentSongIndex = 0;

// 💡 2. ดึง Element ทั้งหมดมาเก็บไว้ (เหมือนเดิม)
const backgroundMusic = document.getElementById('bg-music');
const musicControls = document.getElementById('music-controls');
const musicButton = document.getElementById('music-toggle-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songInfoWrapper = document.getElementById('song-info-wrapper');
const songInfo = document.getElementById('song-info');
const playlistPopup = document.getElementById('playlist-popup');
const playlistList = document.getElementById('playlist-list');

// 💡 3. ฟังก์ชันสร้าง "หัวใจพื้นหลัง" (เหมือนเดิม)
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

// 💡 4. ฟังก์ชันใหม่! สำหรับเปลี่ยนธีมสี
function applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--main-pink', theme.main);
    root.style.setProperty('--light-pink', theme.light);
    root.style.setProperty('--petal-pink-start', theme.petalStart);
    root.style.setProperty('--petal-pink-end', theme.petalEnd);
    root.style.setProperty('--glow-color', theme.glow);
}

// 💡 5. ฟังก์ชันใหม่! สร้างรายการเพลงใน Pop-up (เหมือนเดิม)
function generatePlaylist() { /* ...โค้ดเดิม... */ }

// 💡 6. ฟังก์ชันจัดการ Playlist (อัปเกรด!)
function loadSong(songIndex) {
    const song = playlist[songIndex]; // ดึงข้อมูลเพลงปัจจุบัน
    
    applyTheme(song.theme); // 👈👈 เวทมนตร์อยู่ตรงนี้! สั่งเปลี่ยนธีม!

    songInfo.textContent = song.title;
    backgroundMusic.src = song.src;
    
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

// 💡 7. ฟังก์ชันสำหรับเริ่มการทำงานทุกอย่าง (เหมือนเดิม)
function startExperience() {
    document.body.classList.remove("not-loaded");
    musicControls.style.display = 'flex';
    loadSong(currentSongIndex);
    musicButton.addEventListener('click', () => { /* ...โค้ดเดิม... */ });
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    backgroundMusic.addEventListener('ended', nextSong);
    songInfoWrapper.addEventListener('click', () => {
        generatePlaylist();
        playlistPopup.classList.toggle('active');
    });
    setInterval(() => { /* ...โค้ดเดิม... */ }, 800);
    document.body.removeEventListener('click', startExperience);
    document.body.removeEventListener('touchstart', startExperience);
}

// 💡 8. รอการคลิกครั้งแรกเพื่อเริ่มทุกอย่าง (เหมือนเดิม)
document.body.addEventListener('click', startExperience);
document.body.addEventListener('touchstart', startExperience);

// (โค้ดย่อสำหรับฟังก์ชันที่ไม่เปลี่ยนแปลง)
function generatePlaylist() { playlistList.innerHTML = ""; playlist.forEach((song, index) => { const li = document.createElement('li'); li.textContent = song.title; if (index === currentSongIndex) { li.classList.add('current-song'); } li.addEventListener('click', () => { currentSongIndex = index; loadSong(currentSongIndex); playlistPopup.classList.remove('active'); }); playlistList.appendChild(li); }); }
function startExperience() { document.body.classList.remove("not-loaded"); musicControls.style.display = 'flex'; loadSong(currentSongIndex); musicButton.addEventListener('click', () => { if (backgroundMusic.paused) { backgroundMusic.play(); } else { backgroundMusic.pause(); } musicButton.classList.toggle('playing', !backgroundMusic.paused); }); prevButton.addEventListener('click', prevSong); nextButton.addEventListener('click', nextSong); backgroundMusic.addEventListener('ended', nextSong); songInfoWrapper.addEventListener('click', () => { generatePlaylist(); playlistPopup.classList.toggle('active'); }); setInterval(() => { if (Math.random() < SPAWN_CHANCE) { const img = document.createElement('div'); img.classList.add('special-image', 'heart'); const randomIndex = Math.floor(Math.random() * SPECIAL_IMAGE_URLS.length); img.style.backgroundImage = `url(${SPECIAL_IMAGE_URLS[randomIndex]})`; img.style.left = Math.random() * 100 + 'vw'; img.style.top = '100vh'; const imgSize = Math.random() * 40 + 40; img.style.width = imgSize + 'px'; img.style.height = imgSize + 'px'; img.style.animationDuration = `${Math.random() * 5 + 7}s`; document.body.appendChild(img); img.addEventListener('animationend', () => img.remove()); } else { createRandomHeart(); } }, 800); document.body.removeEventListener('click', startExperience); document.body.removeEventListener('touchstart', startExperience); }
