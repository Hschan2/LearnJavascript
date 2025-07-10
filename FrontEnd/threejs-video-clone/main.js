// src/main.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// 기본 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 별 배경
const loader = new THREE.TextureLoader();
loader.load('/textures/starfield.jpg', texture => {
    scene.background = texture;
});

// 조명
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// 텍스트 로딩
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', font => {
    const textGeo = new TextGeometry('Three.js!', {
        font,
        size: 2,
        height: 0.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 5,
    });

    const textMat = new THREE.MeshStandardMaterial({ color: 0x00ffff });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.position.set(-6, 0, 0);
    scene.add(textMesh);

    animateObjects.push(textMesh);
});

// 카메라 컨트롤
const controls = new OrbitControls(camera, renderer.domElement);

// 후처리
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
));

// 애니메이션
const animateObjects = [];
function animate() {
    requestAnimationFrame(animate);
    animateObjects.forEach(obj => obj.rotation.y += 0.01);
    controls.update();
    composer.render();
}

animate();

// 리사이즈 대응
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
