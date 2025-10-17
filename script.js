// --- ระบบรวม: เหลือแค่ปุ่ม Play/Pause ---

// 💡 1. ตั้งค่าหลัก (เหมือนเดิม)
const SPECIAL_IMAGE_URLS = [
    'https://uwuxp.github.io/Flower4U/secret_1.png', 
    'https://uwuxp.github.io/Flower4U/secret_2.png', 
    'https://uwuxp.github.io/Flower4U/secret_3.png',
    'https://uwuxp.github.io/Flower4U/secret_4.png',
    'https://uwuxp.github.io/Flower4U/secret_5.png'
];
const SPAWN_CHANCE = 0.4;

// 💡 2. ดึง Element มาเก็บไว้ (เหลือแค่ 2 ตัว)
const backgroundMusic = document.getElementById('bg-music');
const musicButton = document.getElementById('music-toggle-button');

// ... ฟังก์ชัน create... และ handlePointerMove เหมือนเดิม ไม่ต้องแก้ไข ...
function createRandomHeart() { const heart = document.createElement('div'); heart.classList.add('heart', 'heart-shape'); heart.style.left = Math.random() * 100 + 'vw'; heart.style.top = '100vh'; const heartSize = Math.random() * 60 + 20; heart.style.width = heartSize + 'px'; heart.style.height = heartSize * 0.8 + 'px'; const animationDuration = Math.random() * 5 + 7; heart.style.animationDuration = animationDuration + 's'; document.body.appendChild(heart); heart.addEventListener('animationend', () => heart.remove()); }
function createCursorHeart(x, y) { const heart = document.createElement('div'); heart.classList.add('cursor-heart'); heart.style.left = x + 'px'; heart.style.top = y + 'px'; const heartSize = Math.random() * 50 + 20; heart.style.width = heartSize + 'px'; heart.style.height = heartSize + 'px'; const animationDuration = Math.random() * 0.5 + 0.5; heart.style.animationDuration = animationDuration + 's'; document.body.appendChild(heart); heart.addEventListener('animationend', () => heart.remove()); }
function createSpecialImage(x, y) { const randomIndex = Math.floor(Math.random() * SPECIAL_IMAGE_URLS.length); const randomImageUrl = SPECIAL_IMAGE_URLS[randomIndex]; const img = document.createElement('div'); img.classList.add('special-image'); img.style.backgroundImage = `url(${randomImageUrl})`; img.style.animation = 'specialImageFloat 1.5s ease-out forwards'; img.style.left = x + 'px'; img.style.top = y + 'px'; const imgSize = Math.random() * 50 + 20; img.style.width = imgSize + 'px'; img.style.height = imgSize + 'px'; document.body.appendChild(img); img.addEventListener('animationend', () => img.remove()); }
let isThrottled = false; function handlePointerMove(e) { if (isThrottled) return; isThrottled = true; setTimeout(() => { isThrottled = false; }, 100); const x = e.touches ? e.touches[0].clientX : e.clientX; const y = e.touches ? e.touches[0].clientY : e.clientY; if (Math.random() < SPAWN_CHANCE) { createSpecialImage(x, y); } else { createCursorHeart(x, y); } }

// 💡 3. ฟังก์ชันสำหรับเริ่มการทำงานทุกอย่าง (อัปเดต!)
function startExperience() {
    document.body.classList.remove("not-loaded");

    // ✨✨✨ ส่วนควบคุมเพลง (เหลือแค่ปุ่มเดียว) ✨✨✨
    backgroundMusic.play();
    
    musicButton.style.display = 'block';
    musicButton.classList.add('playing');

    musicButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
        musicButton.classList.toggle('playing', !backgroundMusic.paused);
    });
    
    // ... โค้ดสร้างหัวใจพื้นหลังและติดตามเมาส์เหมือนเดิม ...
    setInterval(() => { if (Math.random() < SPAWN_CHANCE) { const img = document.createElement('div'); img.classList.add('special-image', 'heart'); const randomIndex = Math.floor(Math.random() * SPECIAL_IMAGE_URLS.length); img.style.backgroundImage = `url(${SPECIAL_IMAGE_URLS[randomIndex]})`; img.style.left = Math.random() * 100 + 'vw'; img.style.top = '100vh'; const imgSize = Math.random() * 40 + 40; img.style.width = imgSize + 'px'; img.style.height = imgSize + 'px'; img.style.animationDuration = `${Math.random() * 5 + 7}s`; document.body.appendChild(img); img.addEventListener('animationend', () => img.remove()); } else { createRandomHeart(); } }, 800);
    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('touchmove', handlePointerMove);

    // ลบ Event Listener ของการคลิกครั้งแรก
    document.body.removeEventListener('click', startExperience);
    document.body.removeEventListener('touchstart', startExperience);
}

// 💡 4. รอการคลิกครั้งแรกเพื่อเริ่มทุกอย่าง (เหมือนเดิม)
document.body.addEventListener('click', startExperience);
document.body.addEventListener('touchstart', startExperience);
