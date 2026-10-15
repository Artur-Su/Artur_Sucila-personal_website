/**
 * Artur Sucila — Hardware-Accelerated WebGL Systems Network Background
 * Automatically respects prefers-reduced-motion and pauses when tab is hidden.
 */

const initSystemsNetwork = () => {
  const container = document.getElementById('canvas-container');
  if (!container || typeof window.THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const THREE = window.THREE;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 420;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch {
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const particleCount = window.innerWidth < 768 ? 75 : 180;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 960;
    positions[i3 + 1] = (Math.random() - 0.5) * 960;
    positions[i3 + 2] = (Math.random() - 0.5) * 360;

    velocities.push({
      x: (Math.random() - 0.5) * 0.28,
      y: (Math.random() - 0.5) * 0.28,
      z: (Math.random() - 0.5) * 0.22,
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x6366f1,
    size: 2.4,
    transparent: true,
    opacity: 0.65,
  });

  const particles = new THREE.Points(geometry, particleMaterial);
  scene.add(particles);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.11,
  });

  const lineGeometry = new THREE.BufferGeometry();
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  let mouseX = 0;
  let mouseY = 0;
  let isTabVisible = !document.hidden;

  document.addEventListener(
    'mousemove',
    (e) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
  });

  const maxConnectDistSq = 82 * 82;

  const animate = () => {
    requestAnimationFrame(animate);
    if (!isTabVisible) return;

    camera.position.x += (mouseX * 0.035 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.035 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    const posArray = particles.geometry.attributes.position.array;
    const linePositions = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      posArray[i3] += velocities[i].x;
      posArray[i3 + 1] += velocities[i].y;
      posArray[i3 + 2] += velocities[i].z;

      if (Math.abs(posArray[i3]) > 480) velocities[i].x *= -1;
      if (Math.abs(posArray[i3 + 1]) > 480) velocities[i].y *= -1;
      if (Math.abs(posArray[i3 + 2]) > 180) velocities[i].z *= -1;

      for (let j = i + 1; j < particleCount; j++) {
        const j3 = j * 3;
        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxConnectDistSq) {
          linePositions.push(
            posArray[i3],
            posArray[i3 + 1],
            posArray[i3 + 2],
            posArray[j3],
            posArray[j3 + 1],
            posArray[j3 + 2]
          );
        }
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    { passive: true }
  );
};

if (document.readyState === 'complete') {
  initSystemsNetwork();
} else {
  window.addEventListener('load', initSystemsNetwork, { once: true });
}
