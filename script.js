// --- ระบบรวม: คลิกเพื่อเริ่ม, สุ่มหัวใจ, หัวใจตามเมาส์, และสุ่มรูปภาพ 3 แบบ (แก้ไขแล้ว) ---

// 💡 1. ตั้งค่าหลัก
const SPECIAL_IMAGE_URLS = [
    'https://uwuxp.github.io/Flower4U/secret_1.png', 
    'https://uwuxp.github.io/Flower4U/secret_2.png', 
    'https://uwuxp.github.io/Flower4U/secret_3.png'
];
const SPAWN_CHANCE = 0.1; // 0.1 = 10% (โอกาส 1 ใน 10)

// 💡 2. ฟังก์ชันสร้าง "หัวใจพื้นหลัง" (แบบสุ่ม)
function createRandomHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart'); 

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

// 💡 3. ฟังก์ชันสร้าง "หัวใจตามเมาส์/นิ้ว"
function createCursorHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('cursor-heart'); 

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    const heartSize = Math.random() * 20 + 10;
    heart.style.width = heartSize + 'px';
    heart.style.height = heartSize + 'px';

    const animationDuration = Math.random() * 0.5 + 0.5;
    heart.style.animationDuration = animationDuration + 's';

    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
}

// 💡 4. ฟังก์ชันสร้าง "รูปภาพพิเศษ" (สำหรับเมาส์เท่านั้น)
function createSpecialImage(x, y) {
    const randomIndex = Math.floor(Math.random() * SPECIAL_IMAGE_URLS.length);
    const randomImageUrl = SPECIAL_IMAGE_URLS[randomIndex];

    const img = document.createElement('div');
    img.classList.add('special-image');
    img.style.backgroundImage = `url(${randomImageUrl})`;

    img.style.left = x + 'px';
    img.style.top = y + 'px';

    const imgSize = Math.random() * 40 + 40;
    img.style.width = imgSize + 'px';
    img.style.height = imgSize + 'px';
    
    document.body.appendChild(img);
    
    img.addEventListener('animationend', () => img.remove());
}

// 💡 5. Throttling: สำหรับหัวใจ/รูปภาพที่ตามเมาส์
let isThrottled = false;
function handlePointerMove(e) {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => { isThrottled = false; }, 50);

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    if (Math.random() < SPAWN_CHANCE) {
        createSpecialImage(x, y);
    } else {
        createCursorHeart(x, y);
    }
}

// 💡 6. ฟังก์ชันสำหรับเริ่มการทำงานทุกอย่าง
function startExperience() {
    document.body.classList.remove("not-loaded");

    // ✨✨✨ แก้ไขตรรกะทั้งหมดตรงนี้ ✨✨✨
    // สำหรับหัวใจ/รูปภาพพื้นหลัง
    setInterval(() => {
        if (Math.random() < SPAWN_CHANCE) {
            // ถ้าสุ่มได้รูปพิเศษ: สร้าง div ใหม่ที่ "หน้าตา" เหมือน special-image แต่ "พฤติกรรม" เหมือน heart
            const img = document.createElement('div');
            
            // 👈 **เคล็ดลับคือเพิ่มคลาส 'heart' เข้าไปด้วย!**
            // เพื่อให้มันใช้อนิเมชัน floatUp ที่ลอยขึ้นสูงๆ
            img.classList.add('special-image', 'heart'); 

            // สุ่มรูปจากใน List
            const randomIndex = Math.floor(Math.random() * SPECIAL_IMAGE_URLS.length);
            img.style.backgroundImage = `url(${SPECIAL_IMAGE_URLS[randomIndex]})`;

            // กำหนดค่าต่างๆ ให้เหมือนกับหัวใจพื้นหลัง
            img.style.left = Math.random() * 100 + 'vw';
            img.style.top = '100vh';
            const imgSize = Math.random() * 40 + 40; // ขนาดรูปพิเศษ
            img.style.width = imgSize + 'px';
            img.style.height = imgSize + 'px';
            img.style.animationDuration = `${Math.random() * 5 + 7}s`; // ใช้เวลานานเหมือนหัวใจ

            document.body.appendChild(img);
            img.addEventListener('animationend', () => img.remove());

        } else {
            // ถ้าสุ่มไม่โดน ก็สร้างหัวใจปกติ
            createRandomHeart();
        }
    }, 500); // ความถี่ของหัวใจ/รูปภาพพื้นหลัง

    // เริ่มระบบติดตามเมาส์/นิ้ว
    document.addEventListener('mousemove', handlePointerMove);
    document.addEventListener('touchmove', handlePointerMove);

    // ลบ Event Listener ของการคลิกครั้งแรก
    document.body.removeEventListener('click', startExperience);
    document.body.removeEventListener('touchstart', startExperience);
}

// 💡 7. รอการคลิกครั้งแรกเพื่อเริ่มทุกอย่าง
document.body.addEventListener('click', startExperience);
document.body.addEventListener('touchstart', startExperience);
