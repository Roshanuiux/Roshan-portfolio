window.onload = function() {

    // --- MOUSE MOVE LOGIC (മാറ്റമില്ല) ---
    const card = document.getElementById("portfolioTag");
    const container = document.querySelector(".card-section");
    const strap = document.querySelector(".tag-strap");

    container.addEventListener("mousemove", (e) => {
        let x = (window.innerWidth / 2 - e.pageX) / 25;
        let y = (window.innerHeight / 2 - e.pageY) / 25;

        gsap.to(card, {
            rotationY: -x,
            rotationX: y,
            rotationZ: x * 0.2,
            transformOrigin: "top center",
            duration: 0.6
        });

        gsap.to(strap, {
            x: x * 0.5,
            rotationZ: x * 0.1,
            transformOrigin: "top center",
            duration: 0.6
        });
    });

    container.addEventListener("mouseleave", () => {
        gsap.to(card, { 
            rotationY: 0, rotationX: 0, rotationZ: 0, 
            duration: 1.5, ease: "elastic.out(1, 0.3)" 
        });
        gsap.to(strap, { x: 0, rotationZ: 0, duration: 1 });
    });
};

// ScrollTrigger രജിസ്റ്റർ ചെയ്യുക
gsap.registerPlugin(ScrollTrigger);

const talkBtn = document.querySelector(".talk-btn");
const navLogo = document.querySelector(".navbar .card-logo");

// എബൗട്ട് സെക്ഷൻ എത്തുമ്പോൾ ബട്ടൺ വൈറ്റ് ആക്കാനും ലോഗോ മാറ്റാനും
ScrollTrigger.create({
    trigger: ".about-section",
    start: "top 10%", // എബൗട്ട് സെക്ഷൻ മുകളിൽ എത്തുമ്പോൾ
    onEnter: () => {
        talkBtn.classList.add("white-mode");
        navLogo.classList.add("hidden");
    },
    onLeaveBack: () => {
        talkBtn.classList.remove("white-mode");
        navLogo.classList.remove("hidden");
    }
});



gsap.registerPlugin(ScrollTrigger);

// എബൗട്ട് സെക്ഷൻ പിൻ ചെയ്യാനും ടെക്സ്റ്റ് ഹൈലൈറ്റ് ചെയ്യാനും
const lines = document.querySelectorAll(".reveal-text span");

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-section",
        start: "top top",      // സെക്ഷൻ സ്ക്രീനിന്റെ മുകളിൽ എത്തുമ്പോൾ തുടങ്ങുക
        end: "+=1500",         // എത്ര ദൂരം സ്ക്രോൾ ചെയ്യണം (Pin duration)
        pin: true,             // സെക്ഷൻ അവിടെ ലോക്ക് ചെയ്യും
        scrub: 1,              // സ്ക്രോളിന് അനുസരിച്ച് ആനിമേഷൻ നടക്കാൻ
        onEnter: () => {
            document.querySelector(".talk-btn").classList.add("white-mode");
            document.querySelector(".navbar .card-logo").classList.add("hidden");
        },
        onLeaveBack: () => {
            document.querySelector(".talk-btn").classList.remove("white-mode");
            document.querySelector(".navbar .card-logo").classList.remove("hidden");
        }
    }
});

// ഓരോ വരിയും ഒന്നൊന്നായി തെളിഞ്ഞു വരാൻ
lines.forEach((line) => {
    tl.to(line, {
        color: "#ffffff",
        duration: 1
    });
});



// സർവീസ് കാർഡുകൾ ഓരോന്നായി തെളിഞ്ഞു വരാൻ
// home-script.js-ൽ ഇത് മാറ്റുക
gsap.from(".service-card", {
    scrollTrigger: {
        trigger: ".services-section", // ഗ്രിഡിന് പകരം സെക്ഷൻ തന്നെ നൽകുക
        start: "top 60%", // സെക്ഷൻ പകുതി എത്തുമ്പോൾ തന്നെ ആനിമേഷൻ തുടങ്ങാൻ
        toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});



ScrollTrigger.create({
    trigger: ".work-section",
    start: "top 10%",
    onEnter: () => {
        talkBtn.classList.remove("white-mode"); // ബട്ടൺ തിരിച്ച് ബ്ലാക്ക് ആകും
    },
    onLeaveBack: () => {
        talkBtn.classList.add("white-mode"); // തിരിച്ച് മുകളിലേക്ക് പോകുമ്പോൾ വൈറ്റ് ആകും
    }
});



const container = document.getElementById('gameContainer');
const paddle = document.getElementById('paddle');
const balls = document.querySelectorAll('.tool-ball');

let paddleX = window.innerWidth / 2;

// പാഡിൽ മൗസിനൊപ്പം നീങ്ങാൻ
window.addEventListener('mousemove', (e) => {
    paddleX = e.clientX;
    gsap.to(paddle, { x: paddleX - (window.innerWidth / 2), duration: 0.1 });
});

balls.forEach((ball, index) => {
    let posX = Math.random() * (window.innerWidth - 100) + 50;
    let posY = -100 - (index * 200); 
    
    // --- ഈ വാല്യൂസ് മാറ്റുക ---
    let velX = (Math.random() - 0.5) * 5; // വശങ്ങളിലേക്കുള്ള വേഗത പകുതിയാക്കി (നേരത്തെ 10 ആയിരുന്നു)
    let velY = 2;                         // താഴേക്ക് വീഴുന്ന തുടക്ക വേഗത കുറച്ചു (നേരത്തെ 5 ആയിരുന്നു)
    let gravity = 0.05;                   // വീഴുന്ന സ്പീഡ് (Gravity) നല്ലോണം കുറച്ചു (നേരത്തെ 0.2 ആയിരുന്നു)
    // -----------------------

    function animate() {
        velY += gravity;
        posX += velX;
        posY += velY;

        // ഭിത്തിയിൽ തട്ടുമ്പോൾ വേഗത കുറയാതിരിക്കാൻ 
        if (posX <= 0 || posX >= window.innerWidth - 60) velX *= -1;

        const paddleRect = paddle.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (ballRect.bottom >= paddleRect.top &&
            ballRect.right >= paddleRect.left &&
            ballRect.left <= paddleRect.right &&
            velY > 0) {
            
            // പാഡിലിൽ തട്ടി തെറിക്കുമ്പോൾ ഉള്ള സ്പീഡ്
            velY *= -0.8; 
            velY -= 6; // തെറിക്കുന്ന ഉയരം അല്പം കുറച്ചു (നേരത്തെ 10 ആയിരുന്നു)
            velX += (posX + 30 - paddleX) * 0.1; 
        }

        if (posY > window.innerHeight) {
            posY = -100;
            velY = 2; // റീസ്റ്റാർട്ട് ചെയ്യുമ്പോഴും കുറഞ്ഞ സ്പീഡ്
            posX = Math.random() * window.innerWidth;
        }

        ball.style.transform = `translate(${posX}px, ${posY}px)`;
        requestAnimationFrame(animate);
    }
    animate();
});



const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // സ്ക്രീൻ കഴിഞ്ഞാൽ തിരിച്ചു വരാൻ
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 200 നക്ഷത്രങ്ങളെ ഉണ്ടാക്കുന്നു
for (let i = 0; i < 200; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

animateStars();

// വിൻഡോ റീസൈസ് ചെയ്യുമ്പോൾ ക്യാൻവാസും റീസൈസ് ആവാൻ
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



const btn = document.getElementById('connectBtn');
const fill = document.querySelector('.btn-fill');

btn.addEventListener('mouseenter', (e) => {
    // മൗസ് കയറുന്ന പോയിന്റ് കണക്കാക്കുന്നു
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ബാക്ക്ഗ്രൗണ്ട് ലെയർ ആ പോയിന്റിലേക്ക് മാറ്റുന്നു
    fill.style.left = x + 'px';
    fill.style.top = y + 'px';
});

btn.addEventListener('mouseleave', (e) => {
    // മൗസ് പോകുന്ന പോയിന്റ് കണക്കാക്കുന്നു
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // പോകുന്ന ദിശയിലേക്ക് തന്നെ ബാക്ക്ഗ്രൗണ്ട് ഒഴിഞ്ഞു പോകും
    fill.style.left = x + 'px';
    fill.style.top = y + 'px';
});


const footerSection = document.querySelector('.footer-section');
const connectBtn = document.getElementById('connectBtn');

connectBtn.addEventListener('mouseenter', () => {
    footerSection.classList.add('gold-mode');
});

connectBtn.addEventListener('mouseleave', () => {
    footerSection.classList.remove('gold-mode');
});

// നേരത്തെ ചെയ്ത Directional Hover ലോജിക് ബട്ടൺ ഫില്ലിന് വേണ്ടി നിലനിർത്താം
connectBtn.addEventListener('mousemove', (e) => {
    const rect = connectBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const fill = document.querySelector('.btn-fill');
    fill.style.left = x + 'px';
    fill.style.top = y + 'px';
});



// ഫൂട്ടറിൽ എത്തുമ്പോൾ ഫ്ലോട്ടിങ് ബട്ടൺ ഹൈഡ് ചെയ്യാൻ
ScrollTrigger.create({
    trigger: ".footer-section",
    start: "top 80%", // ഫൂട്ടർ സെക്ഷൻ കാണാൻ തുടങ്ങുമ്പോൾ
    onEnter: () => {
        gsap.to(".talk-btn", { opacity: 0, scale: 0, duration: 0.3 });
    },
    onLeaveBack: () => {
        gsap.to(".talk-btn", { opacity: 1, scale: 1, duration: 0.3 });
    }
});



gsap.to(".global-nav-container", {
    scrollTrigger: {
        trigger: ".footer-section",
        start: "top 90%", // ഫൂട്ടർ കാണാൻ തുടങ്ങുമ്പോൾ
        toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    y: 50,
    pointerEvents: "none",
    duration: 0.4
});



document.addEventListener('DOMContentLoaded', () => {
    const talkBtn = document.querySelector('.talk-btn');
    const modal = document.querySelector('#contactModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalBox = document.querySelector('.modal-content');

    // Open Modal
    talkBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        gsap.to(modal, { opacity: 1, duration: 0.3 });
        gsap.fromTo(modalBox, 
            { y: 100, opacity: 0, scale: 0.9 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
        document.body.style.overflow = 'hidden';
    });

    // Close Modal
    const hideModal = () => {
        gsap.to(modal, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } 
        });
    };

    closeBtn.addEventListener('click', hideModal);
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
});


const form = document.getElementById('talkForm');

form.onsubmit = async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // 1. Loading State: Button text maattunnu
    submitBtn.innerHTML = "<span>SENDING...</span>";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.pointerEvents = "none";

    const formData = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // 2. Success State: Nalla oru feedback message
            form.style.transition = "opacity 0.4s";
            form.style.opacity = "0";
            
            setTimeout(() => {
                form.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 40px 0;">
                        <div class="check-icon" style="font-size: 50px; margin-bottom: 20px;">✓</div>
                        <h3 style="font-family: 'Koulen'; font-size: 2rem; color: #fff;">MESSAGE SENT!</h3>
                        <p style="color: #aaa; margin-top: 10px;">Thanks for reaching out. <br> I'll get back to you within 24 hours.</p>
                    </div>
                `;
                form.style.opacity = "1";
            }, 400);

            // 3. Auto Close: 3 second kazhiyumpol modal close aakan
            setTimeout(() => {
                hideModal(); // Nammal mumbu ezhuthiya close function
            }, 3500);

        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        submitBtn.innerHTML = "<span>TRY AGAIN</span>";
        submitBtn.style.opacity = "1";
        submitBtn.style.pointerEvents = "auto";
        alert("Oops! Something went wrong. Check your connection.");
    }
};