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
        this.size = 5;
        this.velocityX = (Math.random() * 4 - 2) * 1.5;
        this.velocityY = (-Math.random() * 4 + 2) * 1.5;
        this.life = 150;
        this.rotation = Math.random() * 360;
        this.accelerationX = Math.random() * 0.2 - 0.1;
        this.accelerationY = Math.random() * 0.2 - 0.1;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX += this.accelerationX;
        this.velocityY += this.accelerationY;
        this.life--;
        this.rotation += Math.random() * 4 - 2;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
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

    for (let i = 0; i < 150; i++) {
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
