import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

  const container = document.getElementById('three-container');
  const loaderElement = document.getElementById('loader');

  // 1. Escena y Cámara
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1B1717); // Color coincidente con el fondo de DaisyUI (dark)

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(1.875, 1.75, 1.875); // Valores reducidos para acercar la vista inicial

  // 2. Renderizador
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Carga de HDRI para iluminación (Invisible en el fondo)
  const exrLoader = new EXRLoader();
  exrLoader.load('./Files/3d/HDRI_1.exr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture; // Ilumina el objeto y genera reflejos
  });

  // 3. Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.0001;
  scene.add(directionalLight);

  // Plano invisible para capturar sombras en el suelo
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.3 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

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
      const size = box.getSize(new THREE.Vector3());
      model.position.sub(center);

      // Posicionar el suelo de sombras justo debajo de la base del modelo
      shadowPlane.position.y = -size.y / 2;
      
      // Habilitar sombras para cada parte del modelo
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

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