// ========== GLOBAL VARIABLES ==========
let audioEnabled = false;
let backgroundMusic;

// ========== FLOATING HEARTS BACKGROUND ==========
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');
        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 6}s`;
        heart.style.animationDelay = `${Math.random() * 3}s`;
        // set pseudo-element sizes
        heart.style.setProperty('--size', `${size}px`);
        document.getElementById('hearts-bg').appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 600);
}

// ========== BACKGROUND MUSIC ==========
function initMusic() {
    backgroundMusic = new Audio('love.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.4;
}

// ========== DRAMATIC ENTRANCE → MAGOLIS STORY ==========
function startDramaticEntrance() {
    const entrance = document.getElementById('dramatic-entrance');
    setTimeout(() => {
        entrance.style.display = 'none';
        showMagolisStory();
    }, 3500);
}

function showMagolisStory() {
    const storyContainer = document.getElementById('magolis-story');
    storyContainer.style.display = 'flex';
    const storyTextElem = document.getElementById('story-text');
    
    const fullStory = `Just a small visit at Magolis Resort to chill… didn’t know there was an Angel waiting for me there. 👼\n\nI looked into her eyes 👀 — my heart started racing. I pretended like nothing happened for a while, but then I knew… I could never forgive myself if I let her go.\n\nHer name goes by the name…`;
    
    let i = 0;
    function typeNext() {
        if (i < fullStory.length) {
            storyTextElem.innerHTML += fullStory.charAt(i);
            i++;
            setTimeout(typeNext, 50); // medium speed
        } else {
            // Show photo
            const photoContainer = document.getElementById('thandeka-photo-container');
            photoContainer.style.display = 'block';
            // Ensure photo is loaded
            const img = document.getElementById('thandeka-photo');
            img.onload = () => {
                // After photo loaded, show continue button
                document.getElementById('continue-after-story').style.display = 'inline-block';
            };
            if (img.complete) {
                document.getElementById('continue-after-story').style.display = 'inline-block';
            }
        }
    }
    typeNext();
    
    // Continue button action
    document.getElementById('continue-after-story').onclick = () => {
        storyContainer.style.display = 'none';
        revealEnvelope();
    };
}

function revealEnvelope() {
    const envelope = document.getElementById('envelope');
    envelope.style.display = 'flex';
    envelope.style.animation = 'slideUp 0.5s ease-out';
    // Add heartbeat animation
    const heartbeat = document.createElement('div');
    heartbeat.innerHTML = '💖';
    heartbeat.style.cssText = 'position:fixed; bottom:20px; left:20px; font-size:2rem; animation: heartbeat 1s infinite; z-index:2000';
    document.body.appendChild(heartbeat);
    setTimeout(() => heartbeat.remove(), 4000);
}

// ========== ENVELOPE CLICK → QUESTION ==========
document.getElementById('envelope').addEventListener('click', function(e) {
    // love explosion effect
    for (let i=0; i<15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; font-size:${15+Math.random()*15}px; pointer-events:none; z-index:5000; animation: floatUp 1s forwards;`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
    this.style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
});

// ========== BIRTHDAY CHECK ==========
function checkAnswer() {
    const answer = document.getElementById('birthdayAnswer').value.toLowerCase().trim();
    const correct = ['21 october', 'october 21', '21st october', 'october 21st', '21 oct', 'oct 21'];
    if (correct.includes(answer)) {
        // rainbow beam effect
        const beam = document.createElement('div');
        beam.style.cssText = 'position:fixed; top:0; left:50%; width:100px; height:100vh; background:linear-gradient(180deg,red,orange,yellow,green,blue,indigo,violet); transform:translateX(-50%); z-index:4000; animation: fadeOutBg 1s forwards;';
        document.body.appendChild(beam);
        setTimeout(() => beam.remove(), 1000);
        
        document.getElementById('questionScreen').style.display = 'none';
        showHurray();
    } else {
        alert('Not quite right, baby 😘 Try "21 October"');
    }
}

function showHurray() {
    const msgBox = document.createElement('div');
    msgBox.className = 'message-box';
    msgBox.innerHTML = `<h2>🎉 HURRAY! 🎉</h2><p>You remembered my birthday! 💖</p><button class="next-btn" onclick="closeMessageAndStart()">Next 💖</button>`;
    document.body.appendChild(msgBox);
}

function closeMessageAndStart() {
    document.querySelector('.message-box').remove();
    popOutPhotos();
}

function popOutPhotos() {
    // Sample photos – replace with your own image1.jpg etc.
    const photos = ['image1.JPG', 'image2.JPG', 'image3JPG', 'image4.JPG'];
    const positions = [
        { left: '15%', top: '25%' },
        { left: '70%', top: '20%' },
        { left: '10%', top: '70%' },
        { left: '75%', top: '75%' }
    ];
    photos.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'photo';
        img.style.left = positions[idx].left;
        img.style.top = positions[idx].top;
        document.body.appendChild(img);
        // mosaic reveal effect (simplified: just fade+scale)
        img.style.animation = 'photoPop 0.5s forwards';
    });
    
    setTimeout(() => {
        const btn = document.createElement('button');
        btn.textContent = 'Continue ⚡';
        btn.className = 'next-btn';
        btn.style.cssText = 'position:fixed; bottom:30px; left:50%; transform:translateX(-50%); z-index:5000;';
        btn.onclick = strikeThunder;
        document.body.appendChild(btn);
    }, 1500);
}

function strikeThunder() {
    document.querySelectorAll('.next-btn').forEach(b => b.remove());
    const thunder = document.createElement('div');
    thunder.className = 'thunder';
    document.body.appendChild(thunder);
    setTimeout(() => thunder.style.opacity = '0.9', 10);
    setTimeout(() => thunder.style.opacity = '0', 200);
    setTimeout(() => thunder.remove(), 500);
    setTimeout(() => showNameWithHearts(), 600);
}

function showNameWithHearts() {
    const nameDiv = document.createElement('div');
    nameDiv.className = 'name-display';
    nameDiv.innerHTML = 'THANDEKA 💖';
    document.body.appendChild(nameDiv);
    // floating hearts
    for (let i=0;i<30;i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:${Math.random()*100}vh; font-size:${20+Math.random()*20}px; animation: floatUp 2s forwards; z-index:4000;`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i*50);
    }
    setTimeout(() => {
        nameDiv.remove();
        showRomanticMessage();
    }, 2500);
}

function showRomanticMessage() {
    const magolisDate = new Date(2025, 2, 20); // CHANGE THIS DATE
    const today = new Date();
    const diffDays = Math.floor((today - magolisDate) / (1000*3600*24));
    const daysText = diffDays >= 0 ? `${diffDays} days since I first saw you at Magolis` : "Counting down to our Magolis memory";
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'romantic-message';
    msgDiv.innerHTML = `
        <h1>Hey Thandeka Babe... 💫</h1>
        <div id="typed-text"></div>
        <div class="days-counter">❤️ ${daysText} ❤️</div>
        <button class="next-btn" onclick="startPhotosGoBack()">Watch Magic Continue ✨</button>
    `;
    document.body.appendChild(msgDiv);
    setTimeout(() => {
        const typedElem = document.getElementById('typed-text');
        const loveMsg = "Every moment with you feels like magic. Your smile lights up my world, your laugh is my favorite song, and your love is the greatest gift I've ever received. I'm so incredibly lucky to have you in my life. 🌟";
        let i = 0;
        function typeLove() {
            if (i < loveMsg.length) {
                typedElem.innerHTML += loveMsg.charAt(i);
                i++;
                setTimeout(typeLove, 40);
            }
        }
        typeLove();
    }, 100);
}

function startPhotosGoBack() {
    document.querySelector('.romantic-message').remove();
    const goingMsg = document.createElement('div');
    goingMsg.className = 'message-box';
    goingMsg.innerHTML = '<p>✨ Our memories are returning to the envelope... ✨</p>';
    document.body.appendChild(goingMsg);
    setTimeout(() => {
        goingMsg.remove();
        photosGoBack();
    }, 1500);
}

function photosGoBack() {
    const photos = document.querySelectorAll('.photo');
    const envelopeX = window.innerWidth/2 - 150;
    const envelopeY = window.innerHeight/2 - 100;
    photos.forEach((photo, idx) => {
        const rect = photo.getBoundingClientRect();
        const dx = envelopeX - rect.left;
        const dy = envelopeY - rect.top;
        photo.style.transition = 'all 1s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        photo.style.transform = `translate(${dx}px, ${dy}px) scale(0) rotate(${360 + idx*90}deg)`;
        photo.style.opacity = '0';
        setTimeout(() => photo.remove(), 1000);
    });
    setTimeout(() => showFinalMessage(), 1200);
}

function showFinalMessage() {
    const finalDiv = document.createElement('div');
    finalDiv.className = 'final-message';
    finalDiv.innerHTML = `
        <div class="shimmer-text">I really really love you 😘</div>
        <div style="font-size:1.5rem; margin:15px 0;">Forever and always... 💝</div>
        <button class="next-btn" onclick="startCosmicFinale()">Our Eternal Story Continues 🌌</button>
    `;
    document.body.appendChild(finalDiv);
}

function startCosmicFinale() {
    document.querySelector('.final-message').remove();
    const cosmicDiv = document.createElement('div');
    cosmicDiv.id = 'cosmic-finale';
    document.body.appendChild(cosmicDiv);
    
    const messages = [
        "Our love isn't just a moment...",
        "It's a constellation in the cosmos",
        "Written in the stars forever",
        "Echoed through eternity",
        "I will love you...",
        "ALWAYS AND FOREVER 💫"
    ];
    messages.forEach((msg, idx) => {
        setTimeout(() => {
            const textDiv = document.createElement('div');
            textDiv.className = 'cosmic-text';
            textDiv.textContent = msg;
            cosmicDiv.appendChild(textDiv);
            setTimeout(() => textDiv.remove(), 3800);
        }, idx * 2000);
    });
    
    setTimeout(() => {
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Relive Our Love Story 💖';
        restartBtn.className = 'next-btn';
        restartBtn.style.cssText = 'position:absolute; bottom:50px; left:50%; transform:translateX(-50%); background:#ff6b6b;';
        restartBtn.onclick = () => location.reload();
        cosmicDiv.appendChild(restartBtn);
    }, 13000);
}

// ========== AUDIO & FULLSCREEN CONTROLS ==========
document.getElementById('toggle-audio').addEventListener('click', () => {
    if (!backgroundMusic) initMusic();
    audioEnabled = !audioEnabled;
    if (audioEnabled) {
        backgroundMusic.play().catch(e => console.log("Playback failed", e));
        document.getElementById('toggle-audio').textContent = '🔊';
    } else {
        backgroundMusic.pause();
        document.getElementById('toggle-audio').textContent = '🔈';
    }
});

document.getElementById('toggle-fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
});

// ========== SPARKLE ON CLICK ==========
document.addEventListener('click', (e) => {
    const spark = document.createElement('div');
    spark.innerHTML = '✨';
    spark.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; font-size:20px; pointer-events:none; z-index:9999; animation: floatUp 0.8s forwards;`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
});

// ========== INIT ==========
window.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    startDramaticEntrance();
});
