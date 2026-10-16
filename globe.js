// Hero globe: NASA Black Marble night texture, atmosphere rim, red routes between hubs.
import * as THREE from 'three';

const canvas = document.getElementById('globe');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

try {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
  camera.position.set(0, 0, 4.1);

  const sun = new THREE.Vector3(.8, .6, -.25).normalize();
  const earth = new THREE.Group();
  earth.rotation.set(.72, -2.25, .22); // Europe / Africa / Middle East facing camera, north tilted back
  scene.add(earth);

  const tex = await new THREE.TextureLoader().loadAsync('assets/earth-night.jpg');
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const globeMat = new THREE.ShaderMaterial({
    uniforms: { night: { value: tex }, sun: { value: sun } },
    vertexShader: `
      varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main() {
        vUv = uv;
        vN = normalize(mat3(modelMatrix) * normal);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vV = normalize(cameraPosition - wp.xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform sampler2D night; uniform vec3 sun;
      varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main() {
        vec3 t = texture2D(night, vUv).rgb;
        // Texture is blue-tinted land + orange city lights: split them by warmth.
        float lights = smoothstep(.0, .2, t.r - t.b * .8);
        float land = max(dot(t, vec3(.3, .59, .11)) - .1, 0.0);
        float day = smoothstep(-.1, .6, dot(vN, sun));
        vec3 col = vec3(.62, .66, .72) * land * 1.7;
        col += vec3(1.0, .76, .45) * lights * 2.6 * (1.0 - day * .7);
        col += vec3(.5, .56, .66) * day * (.06 + land * 1.6);
        float rim = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
        col += vec3(.32, .5, .95) * rim * (.28 + day * 1.4);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  earth.add(new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), globeMat));

  // Atmosphere halo (back faces, additive)
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.06, 96, 64), new THREE.ShaderMaterial({
    uniforms: { sun: { value: sun } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main() { vN = normalize(mat3(modelMatrix) * normal); vec4 wp = modelMatrix * vec4(position, 1.0); vV = normalize(cameraPosition - wp.xyz); gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: `uniform vec3 sun; varying vec3 vN; varying vec3 vV;
      void main() {
        float edge = pow(1.0 - abs(dot(vN, vV)), 5.0);
        float s = .35 + 1.6 * smoothstep(-.2, .9, dot(vN, sun));
        gl_FragColor = vec4(vec3(.45, .65, 1.0) * edge * s, edge * s);
      }`,
    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
  })));

  // Routes between hubs
  const ll = (lat, lon, r = 1) => {
    const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
  };
  const hubs = { msk: [55.75, 37.62], lon: [51.5, -.12], ist: [41, 29], cai: [30.04, 31.24], dxb: [25.2, 55.27], del: [28.6, 77.2], nsk: [55, 82.9], lag: [6.5, 3.4], jnb: [-26.2, 28.04], par: [48.85, 2.35] };
  const routes = [['msk', 'lon'], ['msk', 'dxb'], ['msk', 'nsk'], ['ist', 'cai'], ['cai', 'lag'], ['dxb', 'del'], ['par', 'cai'], ['lag', 'jnb'], ['msk', 'ist'], ['dxb', 'jnb']];
  const lineMat = new THREE.LineBasicMaterial({ color: 0xff2a36, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false });
  const pulses = [];
  for (const [a, b] of routes) {
    const A = ll(...hubs[a], 1.004), B = ll(...hubs[b], 1.004); // just above the surface: no z-fighting at the ends
    const lift = 1 + A.distanceTo(B) * .14;
    const curve = new THREE.QuadraticBezierCurve3(A, A.clone().add(B).normalize().multiplyScalar(lift), B);
    earth.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), lineMat));
    pulses.push({ curve, t: Math.random() });
  }

  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.18, 'rgba(255,80,80,1)'); gr.addColorStop(.45, 'rgba(255,30,40,.35)'); gr.addColorStop(1, 'rgba(255,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  const sprite = s => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true })); m.scale.setScalar(s); return m; };
  const nodes = Object.values(hubs).map(h => { const s = sprite(.07); s.position.copy(ll(...h, 1.004)); earth.add(s); return s; });
  pulses.forEach(p => { p.sprite = sprite(.045); earth.add(p.sprite); });

  // Sprites skip the depth test (the sphere would clip them), so fade them out towards the limb instead
  const tmp = new THREE.Vector3(), eye = camera.position.clone().normalize();
  const facing = obj => THREE.MathUtils.smoothstep(obj.getWorldPosition(tmp).normalize().dot(eye), .02, .2);

  function resize() {
    const s = canvas.clientWidth;
    renderer.setSize(s, s, false);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  const INTRO = 3.2, SPIN = Math.PI * 3; // seconds, radians
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!visible && !document.documentElement.classList.contains('intro')) return;
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
    // Intro: globe flies in spinning fast and eases to rest, then the idle sway starts from zero.
    const p = reduce ? 1 : Math.min(t / INTRO, 1), e = 1 - Math.pow(1 - p, 4);
    camera.position.z = 4.1 + 3.2 * (1 - e);
    earth.rotation.y = -2.25 - SPIN * (1 - e) + (p < 1 ? 0 : Math.sin((t - INTRO) * .05) * .22);
    if (p > .72) document.documentElement.classList.remove('intro');
    nodes.forEach((n, i) => { n.material.opacity = facing(n); n.scale.setScalar(.06 + .02 * Math.sin(t * 2 + i)); });
    pulses.forEach(p => { p.t = (p.t + dt * .18) % 1; p.sprite.position.copy(p.curve.getPoint(p.t)); p.sprite.material.opacity = facing(p.sprite) * Math.sin(Math.PI * p.t); });
    renderer.render(scene, camera);
  });
  canvas.classList.remove('fallback');
  canvas.classList.add('ready');
} catch (err) {
  console.warn('Globe fallback:', err);
  canvas.classList.add('fallback');
  document.documentElement.classList.remove('intro');
}
