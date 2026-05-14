import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  const container = document.getElementById('three-container');
  const loaderElement = document.getElementById('loader');

  // 1. Escena y Cámara
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1B1717); // Color coincidente con el fondo de DaisyUI (dark)

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(2, 2, 5);

  // 2. Renderizador
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  container.appendChild(renderer.domElement);

  // 3. Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 500);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 200);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // 4. Controles (Mouse interaction)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // 5. Carga del Modelo GLTF/GLB
  const loader = new GLTFLoader();
  loader.load(
    './Files/3d/cube2.glb', // Ruta a tu archivo
    (gltf) => {
      const model = gltf.scene;
      
      // Centrar el modelo automáticamente
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      
      scene.add(model);
      loaderElement.classList.add('hidden'); // Ocultar loader cuando cargue
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    (error) => {
      console.error('Error al cargar el modelo:', error);
    }
  );

  // 6. Animación y Resize
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();