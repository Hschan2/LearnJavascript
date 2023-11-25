const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 6;
        this.velocityX = Math.random() * 4 - 2;
        this.velocityY = -Math.random() * 6 + 2;
        this.life = 150;
        this.rotation = Math.random() * 360;
        this.shake = 0;
        this.shakeSpeed = Math.random() * 0.2 + 0.2;
        this.shakeDirection = Math.random() < 0.5 ? 0.5 : -0.5;
        this.spinSpeed = Math.random() * 2 - 2;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += 0.1;
        this.life--;
        this.rotation += this.spinSpeed * 2;
        this.shake += this.shakeSpeed * this.shakeDirection;

        if (Math.abs(this.shake) > 5) {
            this.shakeDirection *= -1;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.shake, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const particles = [];

canvas.addEventListener('click', (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    createFirework(x, y);
});

function createFirework(x, y) {
    const colors = ['#FF6961', '#FFB347', '#77DD77', '#6C8DFA', '#B4D9EF'];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const particle = new Particle(x, y, color);
        particles.push(particle);
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

animate();
