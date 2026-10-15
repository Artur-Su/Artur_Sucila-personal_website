/**
 * Artur Sucila — Calibrated 3D WebGL Ambient Systems Engine
 * Slower, smooth ambient drift tuned for minimal distraction while retaining
 * full depth and reactivity on mobile phones & desktop.
 */

const initSystemsNetwork = () => {
  const container = document.getElementById('canvas-container');
  if (!container || typeof window.THREE === 'undefined') return;

  const THREE = window.THREE;
  const scene = new THREE.Scene();

  const isMobile = window.innerWidth < 820;
  const camera = new THREE.PerspectiveCamera(
    isMobile ? 76 : 68,
    window.innerWidth / window.innerHeight,
    0.1,
    1400
  );
  camera.position.z = isMobile ? 350 : 380;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch {
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const particleCount = isMobile ? 105 : 175;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const basePositions = new Float32Array(particleCount * 3);
  const velocities = [];
  const phases = new Float32Array(particleCount);

  const spreadX = isMobile ? 540 : 880;
  const spreadY = isMobile ? 700 : 840;
  const spreadZ = isMobile ? 360 : 420;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * spreadX;
    const y = (Math.random() - 0.5) * spreadY;
    const z = (Math.random() - 0.5) * spreadZ;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    basePositions[i3] = x;
    basePositions[i3 + 1] = y;
    basePositions[i3 + 2] = z;

    phases[i] = Math.random() * Math.PI * 2;

    // Slower, smooth ambient velocity
    velocities.push({
      x: (Math.random() - 0.5) * 0.22,
      y: (Math.random() - 0.5) * 0.22,
      z: (Math.random() - 0.5) * 0.18,
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Circular glowing sprite texture
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 64;
  spriteCanvas.height = 64;
  const ctx = spriteCanvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.75)');
  grad.addColorStop(0.7, 'rgba(99, 102, 241, 0.28)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const particleTexture = new THREE.CanvasTexture(spriteCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x38bdf8,
    map: particleTexture,
    size: isMobile ? 8.5 : 7.8,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, particleMaterial);
  scene.add(particles);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: isMobile ? 0.22 : 0.18,
    blending: THREE.AdditiveBlending,
  });

  const lineGeometry = new THREE.BufferGeometry();
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // Background wireframe core
  const coreGeo = new THREE.IcosahedronGeometry(isMobile ? 105 : 140, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.07,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  let pointerX = 0;
  let pointerY = 0;
  let scrollOffset = window.scrollY || 0;
  let pulseBoost = 0;
  let currentMode = 'mesh';
  let isTabVisible = !document.hidden;

  window.addEventListener(
    'mousemove',
    (e) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 1.4;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 1.4;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length > 0) {
        pointerX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.6;
        pointerY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.6;
        pulseBoost = 0.8;
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) {
        pointerX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.6;
        pointerY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.6;
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'deviceorientation',
    (e) => {
      if (e.gamma !== null && e.beta !== null) {
        pointerX = Math.max(-1, Math.min(1, e.gamma / 45));
        pointerY = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    () => {
      scrollOffset = window.scrollY || 0;
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
  });

  window.setWebGLMode = (mode) => {
    currentMode = mode;
    pulseBoost = 1.2;
    if (mode === 'mesh') {
      particleMaterial.color.setHex(0x38bdf8);
      lineMaterial.color.setHex(0x6366f1);
      coreMat.color.setHex(0x38bdf8);
      coreMat.opacity = 0.07;
    } else if (mode === 'vortex') {
      particleMaterial.color.setHex(0x10b981);
      lineMaterial.color.setHex(0x38bdf8);
      coreMat.color.setHex(0x10b981);
      coreMat.opacity = 0.12;
    } else if (mode === 'matrix') {
      particleMaterial.color.setHex(0xa855f7);
      lineMaterial.color.setHex(0x38bdf8);
      coreMat.color.setHex(0x6366f1);
      coreMat.opacity = 0.1;
    }
  };

  const maxConnectDist = isMobile ? 100 : 110;
  const maxConnectDistSq = maxConnectDist * maxConnectDist;

  const nodeCountEl = document.getElementById('hud-node-count');
  if (nodeCountEl) nodeCountEl.textContent = String(particleCount);

  let clock = 0;
  let lastFpsTime = performance.now();
  let frameCounter = 0;
  const fpsEl = document.getElementById('hud-fps');

  const animate = (now) => {
    requestAnimationFrame(animate);
    if (!isTabVisible) return;

    frameCounter++;
    if (now - lastFpsTime >= 1000) {
      if (fpsEl) fpsEl.textContent = `${Math.min(60, frameCounter)} FPS`;
      frameCounter = 0;
      lastFpsTime = now;
    }

    // Gentle, non-distracting clock speed
    clock += 0.0035;
    pulseBoost *= 0.95;

    const scrollAngle = scrollOffset * 0.0006;
    const targetCamX = pointerX * 28 + Math.sin(clock * 0.35) * 12;
    const targetCamY = -pointerY * 28 + Math.cos(clock * 0.28) * 10 - (scrollOffset * 0.02) % 90;

    camera.position.x += (targetCamX - camera.position.x) * 0.035;
    camera.position.y += (targetCamY - camera.position.y) * 0.035;
    camera.lookAt(scene.position);

    // Smooth, slow orbital drift
    particles.rotation.y = clock * 0.08 + scrollAngle;
    particles.rotation.x = Math.sin(clock * 0.2) * 0.06 + pointerY * 0.06;
    lines.rotation.copy(particles.rotation);

    coreMesh.rotation.y = -clock * 0.12 - scrollAngle;
    coreMesh.rotation.x = clock * 0.08;
    const coreScale = 1 + Math.sin(clock * 1.2) * 0.03 + pulseBoost * 0.06;
    coreMesh.scale.set(coreScale, coreScale, coreScale);

    const posArray = particles.geometry.attributes.position.array;
    const linePositions = [];
    const speedMult = 1 + pulseBoost;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      if (currentMode === 'vortex') {
        const angle = clock * 0.35 + phases[i];
        const radius = 120 + (i % 7) * 28;
        posArray[i3] += (Math.cos(angle) * radius - posArray[i3]) * 0.016;
        posArray[i3 + 1] += (Math.sin(angle) * radius - posArray[i3 + 1]) * 0.016;
        posArray[i3 + 2] += Math.sin(clock * 0.8 + phases[i]) * 0.35;
      } else if (currentMode === 'matrix') {
        posArray[i3 + 1] -= (0.45 + (i % 5) * 0.12) * speedMult;
        posArray[i3] += Math.sin(clock * 0.6 + phases[i]) * 0.18;
        if (posArray[i3 + 1] < -spreadY / 2) {
          posArray[i3 + 1] = spreadY / 2;
        }
      } else {
        posArray[i3] += velocities[i].x * speedMult + Math.sin(clock * 0.5 + phases[i]) * 0.07;
        posArray[i3 + 1] += velocities[i].y * speedMult + Math.cos(clock * 0.5 + phases[i]) * 0.07;
        posArray[i3 + 2] += velocities[i].z * speedMult;

        if (Math.abs(posArray[i3]) > spreadX / 2) velocities[i].x *= -1;
        if (Math.abs(posArray[i3 + 1]) > spreadY / 2) velocities[i].y *= -1;
        if (Math.abs(posArray[i3 + 2]) > spreadZ / 2) velocities[i].z *= -1;
      }

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

  requestAnimationFrame(animate);

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSystemsNetwork, { once: true });
} else {
  initSystemsNetwork();
}
