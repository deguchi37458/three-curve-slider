import vertexShader from "./shader/vertexShader";
import fragmentShader from "./shader/fragmentShader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import GUI from 'lil-gui'; 
import gsap from 'gsap'; 

import img from "./images/image01.jpg"

// Debug
// const dat = new GUI();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();

// Camera
const fov = 50;
const fovRad = (fov / 2) * (Math.PI / 180);
let dist = (window.innerHeight / 2) / Math.tan(fovRad);
const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = dist;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false; // ズームを無効化
controls.enablePan = false; // ドラッグ移動を無効化
controls.enableRotate = false; // 回転を無効化

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Mesh
let meshes = [];
function createMesh(img) {
  const texture = textureLoader.load(img.src);
  const geometry = new THREE.PlaneGeometry(600, 600, 500, 500);
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uTexture: {
        type: 't',
        value: texture
      },
      curlR: {
        type: 'f',
        value: -900
      },   
    }
  })
  const mesh = new THREE.Mesh(geometry, material)
  meshes.push(mesh);
  return mesh
}

const imgs = [...document.querySelectorAll('.sec img')];
for (const img of imgs) {
  const mesh = createMesh(img);
  scene.add(mesh)
}

// Animate
let speed = 0;
let rotation = 0
// window.addEventListener('wheel', (e) => {
//   speed += e.deltaY * -0.0002;
//   // console.log(speed);
// })

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
  console.log(sizes.height)
  // rotation = (Math.PI * window.scrollY) / (4 * sizes.height)
  console.log((Math.PI * window.scrollY) / (4 * sizes.height));
  rotation = (-(Math.PI * window.scrollY) / (4 * sizes.height))
  // console.log(rotation);
  // const currentScrollTop = window.scrollY;
  // const deltaY = currentScrollTop - lastScrollTop;
  // // console.log(deltaY);
  // lastScrollTop = currentScrollTop;
  // speed += deltaY * -0.00007;
})

function rot() {
  const r = 900 // 原点からの距離
  // rotation += speed;
  // speed *= 0.93;
  
  meshes[0].rotation.x = (rotation)
  meshes[0].position.y = -r * Math.sin(rotation)
  meshes[0].position.z = -r + r * Math.cos(rotation)

  meshes[1].rotation.x = (rotation + Math.PI / 4)
  meshes[1].position.y = -r * Math.sin(rotation + Math.PI / 4)
  meshes[1].position.z = -r + r * Math.cos(rotation + Math.PI / 4)
  
  meshes[2].rotation.x = (rotation + Math.PI / 2)
  meshes[2].position.y = -r * Math.sin(rotation + (Math.PI / 2))
  meshes[2].position.z = -r + r * Math.cos(rotation + (Math.PI / 2))
  
  // mesh4.rotation.x = (rotation + Math.PI)
  // mesh4.position.y = -r * Math.sin(rotation + Math.PI)
  // mesh4.position.z = -r + r * Math.cos(rotation + Math.PI)

  // mesh5.rotation.x = (rotation + (3 * (Math.PI / 2)))
  // mesh5.position.y = -r * Math.sin(rotation + (3 * (Math.PI / 2)))
  // mesh5.position.z = -r + r * Math.cos(rotation + (3 * (Math.PI / 2)))

  window.requestAnimationFrame(rot)
}
rot();

const animate = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};
animate();


// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Helper 
const AxesHelper = new THREE.AxesHelper();
scene.add(AxesHelper);
