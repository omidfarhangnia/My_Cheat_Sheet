import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

// function main() {
//   const canvas = document.querySelector("#c");
//   const renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     canvas,
//   });

//   const fov = 75;
//   const aspect = 2; // the canvas default
//   const near = 0.1;
//   const far = 100;
//   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//   camera.position.z = 5;

//   const scene = new THREE.Scene();

//   {
//     const controls = new OrbitControls(camera, canvas);
//     controls.target.set(0, 0, 0);
//     controls.update();
//   }

//   const material = new THREE.LineBasicMaterial({
//     color: 0x0000ff,
//   });

//   const points = [];
//   points.push(new THREE.Vector3(-10, 0, 0));
//   points.push(new THREE.Vector3(10, 0, 0));

//   const geometry = new THREE.BufferGeometry().setFromPoints(points);

//   const line = new THREE.Line(geometry, material);
//   scene.add(line);

//   {
//     const light = new THREE.PointLight(0xffffff, 50);
//     light.position.set(3, 3, 3);
//     scene.add(light);
//   }

//   function resizeRendererToDisplaySize(renderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//       renderer.setSize(width, height, false);
//     }

//     return needResize;
//   }

//   function render(time) {
//     time *= 0.001;

//     if (resizeRendererToDisplaySize(renderer)) {
//       const canvas = renderer.domElement;
//       camera.aspect = canvas.clientWidth / canvas.clientHeight;
//       camera.updateProjectionMatrix();
//     }

//     renderer.render(scene, camera);

//     requestAnimationFrame(render);
//   }

//   requestAnimationFrame(render);
// }

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 10;

  const scene = new THREE.Scene();

  {
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  const boxGeo = new THREE.BoxGeometry(3, 3, 3);
  const boxMat = new THREE.MeshBasicMaterial({ color: "blue" });
  const boxMesh = new THREE.Mesh(boxGeo, boxMat);
  scene.add(boxMesh);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();

// creating all geometry
function main2() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 120;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = [];
  const spread = 15;

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  // addSolidGeometry(-2, 2, new THREE.BoxGeometry(8, 8, 8));
  // addSolidGeometry(-1, 2, new THREE.DodecahedronGeometry(5));
  // addSolidGeometry(0, 2, new THREE.OctahedronGeometry(5));
  // addSolidGeometry(1, 2, new THREE.SphereGeometry(6));

  const radius = 7;
  const widthSegments = 12;
  const heightSegments = 8;
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const material = new THREE.mest({
    color: "red",
    size: 0.2, // in world units
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // {

  // 	const loader = new FontLoader();
  // 	// promisify font loading
  // 	function loadFont( url ) {
  // 		return new Promise( ( resolve, reject ) => {
  // 			loader.load( url, resolve, undefined, reject );
  // 		} );
  // 	}

  // 	async function doit() {

  // 		const font = await loadFont( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json' );
  // 		const geometry = new TextGeometry( 'three.js', {
  // 			font: font,
  // 			size: 3.0,
  // 			depth: .2,
  // 			curveSegments: 12,
  // 			bevelEnabled: true,
  // 			bevelThickness: 0.15,
  // 			bevelSize: .3,
  // 			bevelSegments: 5,
  // 		} );

  // 		addSolidGeometry( - .5, 0, geometry );

  // 		const mesh = new THREE.Mesh( geometry, createMaterial() );
  // 		addObject( 0, 0, parent );
  // 	}
  // 	doit();

  // }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((member) => {
      member.rotation.x = time * 0.5;
      member.rotation.y = time * 0.5;
    });

    points.rotation.x = time * 0.5;
    points.rotation.y = time * 0.5;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// solar system
function main3() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const gui = new GUI();

  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
  camera.position.set(0, 100, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const light = new THREE.PointLight(0xffffff, 3);
  scene.add(light);

  const objects = [];

  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const sphereGeometry = new THREE.SphereGeometry(1.5, 5, 5);

  const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 25;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthMesh.scale.set(2, 2, 2);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 10;
  earthOrbit.add(moonOrbit);

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  class AxisGridHelper {
    constructor(node, units = 10) {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2; // after the grid
      node.add(axes);

      const grid = new THREE.GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }
    get visible() {
      return this._visible;
    }
    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, "visible").name(label);
  }

  makeAxisGrid(solarSystem, "solarSystem", 50);
  makeAxisGrid(sunMesh, "sunMesh");
  makeAxisGrid(earthOrbit, "earthOrbit");
  makeAxisGrid(earthMesh, "earthMesh");
  makeAxisGrid(moonOrbit, "moonOrbit");
  makeAxisGrid(moonMesh, "moonMesh");

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((member) => {
      member.rotation.y = time;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// texture loader
function main4() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const light = new THREE.PointLight(0xffffff, 1000);
  light.lookAt(0, 0, 0);
  light.position.set(20, 20, 0);
  scene.add(light);

  const objects = [];

  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);
  const geometry = new THREE.BoxGeometry(13, 13, 10);
  const materials = [
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8zOF9waG90b2dyYXBoX2FfY2xvc2UtdXBfb2ZfbmVvbl9mbG93ZXJfd2l0aF9zcF8wM2RkMDkwNy1mNTY4LTQ5NGYtOWI3NS1hZTc1MjJhODM2YjEuanBn.jpg"
      ),
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/manual/examples/resources/images/flower-2.jpg"
      ),
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/manual/examples/resources/images/flower-3.jpg"
      ),
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/manual/examples/resources/images/flower-4.jpg"
      ),
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://threejs.org/manual/examples/resources/images/flower-5.jpg"
      ),
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load(
        "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8zOF9waG90b2dyYXBoX2FfY2xvc2UtdXBfb2ZfbmVvbl9mbG93ZXJfd2l0aF9zcF8wM2RkMDkwNy1mNTY4LTQ5NGYtOWI3NS1hZTc1MjJhODM2YjEuanBn.jpg"
      ),
    }),
  ];

  const loadingElem = document.querySelector("#loading");
  const progressBarElem = loadingElem.querySelector(".progressbar");

  loadManager.onLoad = () => {
    loadingElem.style.display = "none";
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    objects.push(cube); // add to our list of cubes to rotate
  };
  loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    progressBarElem.style.transform = `scaleX(${progress})`;
  };

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((member) => {
      member.rotation.y = time * 0.5;
      member.rotation.x = time * 0.5;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// texture controller
function main5() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.set(0, 10, 20);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const light1 = new THREE.PointLight(0xffffff, 1000);
  light1.lookAt(0, 0, 0);
  light1.position.set(20, 20, 0);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xffffff, 1000);
  light2.lookAt(0, 0, 0);
  light2.position.set(0, 20, 20);
  scene.add(light2);
  const objects = [];

  const loader = new THREE.TextureLoader();
  const texture = loader.load("./public/wall.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.center.set(0.5, 0.5);
  texture.repeat.set(3, 3);
  const geometry = new THREE.BoxGeometry(6, 6, 6);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  objects.push(mesh);

  class DegRadHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
      this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
  }

  class StringToNumberHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return this.obj[this.prop];
    }
    set value(v) {
      this.obj[this.prop] = parseFloat(v);
    }
  }

  const wrapModes = {
    ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
    RepeatWrapping: THREE.RepeatWrapping,
    MirroredRepeatWrapping: THREE.MirroredRepeatWrapping,
  };

  function updateTexture() {
    texture.needsUpdate = true;
  }

  const gui = new GUI();
  gui
    .add(new StringToNumberHelper(texture, "wrapS"), "value", wrapModes)
    .name("texture.wrapS")
    .onChange(updateTexture);
  gui
    .add(new StringToNumberHelper(texture, "wrapT"), "value", wrapModes)
    .name("texture.wrapT")
    .onChange(updateTexture);
  gui.add(texture.repeat, "x", 0, 5, 0.01).name("texture.repeat.x");
  gui.add(texture.repeat, "y", 0, 5, 0.01).name("texture.repeat.y");
  gui.add(texture.offset, "x", -2, 2, 0.01).name("texture.offset.x");
  gui.add(texture.offset, "y", -2, 2, 0.01).name("texture.offset.y");
  gui.add(texture.center, "x", -0.5, 1.5, 0.01).name("texture.center.x");
  gui.add(texture.center, "y", -0.5, 1.5, 0.01).name("texture.center.y");
  gui
    .add(new DegRadHelper(texture, "rotation"), "value", -360, 360)
    .name("texture.rotation");

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((member) => {
      member.rotation.y = time * 0.5;
      member.rotation.x = time * 0.5;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// controler and light
function main6() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
    folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
    folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
    folder.open();
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);

    function updateLight() {
      light.target.updateMatrixWorld();
      helper.update();
    }

    updateLight();

    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 5, 0.01);

    makeXYZGUI(gui, light.position, "position", updateLight);
    makeXYZGUI(gui, light.target.position, "target", updateLight);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// two scenes two cameras
function main7() {
  const canvas = document.querySelector("#c");
  const view1Elem = document.querySelector("#view1");
  const view2Elem = document.querySelector("#view2");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 5;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const cameraHelper = new THREE.CameraHelper(camera);

  class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(
        this.obj[this.maxProp],
        v + this.minDif
      );
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min; // this will call the min setter
    }
  }

  const gui = new GUI();
  gui.add(camera, "fov", 1, 180);
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, "near", "far", 0.1);
  gui.add(minMaxGUIHelper, "min", 0.1, 50, 0.1).name("near");
  gui.add(minMaxGUIHelper, "max", 0.1, 50, 0.1).name("far");

  const controls = new OrbitControls(camera, view1Elem);
  controls.target.set(0, 5, 0);
  controls.update();

  const camera2 = new THREE.PerspectiveCamera(
    60, // fov
    2, // aspect
    0.1, // near
    500 // far
  );
  camera2.position.set(40, 10, 30);
  camera2.lookAt(0, 5, 0);

  const controls2 = new OrbitControls(camera2, view2Elem);
  controls2.target.set(0, 5, 0);
  controls2.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");
  scene.add(cameraHelper);

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function setScissorForElement(elem) {
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom =
      Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
  }

  function render() {
    resizeRendererToDisplaySize(renderer);

    // turn on the scissor
    renderer.setScissorTest(true);

    // render the original view
    {
      const aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      scene.background.set(0x000000);

      // render
      renderer.render(scene, camera);
    }

    // render from the 2nd camera
    {
      const aspect = setScissorForElement(view2Elem);

      // adjust the camera for this aspect
      camera2.aspect = aspect;
      camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      cameraHelper.visible = true;

      scene.background.set(0x000040);

      renderer.render(scene, camera2);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// if the depth is distoryed
// -- const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
// ++ const renderer = new THREE.WebGLRenderer({
// ++   antialias: true,
// ++   canvas,
// ++   logarithmicDepthBuffer: true,
// ++ });

// two scenes two cameras (OrthographicCamera)
function main8() {
  const canvas = document.querySelector("#c");
  const view1Elem = document.querySelector("#view1");
  const view2Elem = document.querySelector("#view2");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const size = 1;
  const near = 5;
  const far = 50;
  const camera = new THREE.OrthographicCamera(
    -size,
    size,
    size,
    -size,
    near,
    far
  );
  camera.zoom = 0.2;
  camera.position.set(0, 10, 20);

  const cameraHelper = new THREE.CameraHelper(camera);

  class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(
        this.obj[this.maxProp],
        v + this.minDif
      );
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min; // this will call the min setter
    }
  }

  const gui = new GUI();
  gui.add(camera, "zoom", 0.01, 1, 0.01).listen();
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, "near", "far", 0.1);
  gui.add(minMaxGUIHelper, "min", 0.1, 50, 0.1).name("near");
  gui.add(minMaxGUIHelper, "max", 0.1, 50, 0.1).name("far");

  const controls = new OrbitControls(camera, view1Elem);
  controls.target.set(0, 5, 0);
  controls.update();

  const camera2 = new THREE.PerspectiveCamera(
    60, // fov
    2, // aspect
    0.1, // near
    500 // far
  );
  camera2.position.set(16, 28, 40);
  camera2.lookAt(0, 5, 0);

  const controls2 = new OrbitControls(camera2, view2Elem);
  controls2.target.set(0, 5, 0);
  controls2.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");
  scene.add(cameraHelper);

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function setScissorForElement(elem) {
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom =
      Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
  }

  function render() {
    resizeRendererToDisplaySize(renderer);

    // turn on the scissor
    renderer.setScissorTest(true);

    // render the original view
    {
      const aspect = setScissorForElement(view1Elem);

      // update the camera for this aspect
      camera.left = -aspect;
      camera.right = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      scene.background.set(0x000000);
      renderer.render(scene, camera);
    }

    // render from the 2nd camera
    {
      const aspect = setScissorForElement(view2Elem);

      // update the camera for this aspect
      camera2.aspect = aspect;
      camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      cameraHelper.visible = true;

      scene.background.set(0x000040);
      renderer.render(scene, camera2);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// shadow in spotlight
function main9() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.shadowMap.enabled = true;

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejs.org/manual/examples/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.receiveShadow = true;
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  {
    const cubeSize = 30;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({
      color: "#CCC",
      side: THREE.BackSide,
    });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.receiveShadow = true;
    mesh.position.set(0, cubeSize / 2 - 0.1, 0);
    scene.add(mesh);
  }

  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
    folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
    folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
    // folder.open();
  }

  {
    const color = 0xffffff;
    const intensity = 100;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    light.position.set(0, 10, 0);
    scene.add(light);

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    function updateCamera() {}

    class MinMaxGUIHelper {
      constructor(obj, minProp, maxProp, minDif) {
        this.obj = obj;
        this.minProp = minProp;
        this.maxProp = maxProp;
        this.minDif = minDif;
      }
      get min() {
        return this.obj[this.minProp];
      }
      set min(v) {
        this.obj[this.minProp] = v;
        this.obj[this.maxProp] = Math.max(
          this.obj[this.maxProp],
          v + this.minDif
        );
      }
      get max() {
        return this.obj[this.maxProp];
      }
      set max(v) {
        this.obj[this.maxProp] = v;
        this.min = this.min; // this will call the min setter
      }
    }

    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 200);
    gui.add(light, "distance", 0, 40).onChange(updateCamera);

    {
      const folder = gui.addFolder("Shadow Camera");
      folder.open();
      const minMaxGUIHelper = new MinMaxGUIHelper(
        light.shadow.camera,
        "near",
        "far",
        0.1
      );
      folder
        .add(minMaxGUIHelper, "min", 0.1, 50, 0.1)
        .name("near")
        .onChange(updateCamera);
      folder
        .add(minMaxGUIHelper, "max", 0.1, 50, 0.1)
        .name("far")
        .onChange(updateCamera);
    }

    makeXYZGUI(gui, light.position, "position", updateCamera);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render() {
    resizeRendererToDisplaySize(renderer);

    {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// fog for cubes (except the green one)
function main10() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const near = 1;
    const far = 3;
    const color = "lightblue";
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    if (x === 0) {
      material.fog = false;
    }

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// render targets cubes inside cube
function main11() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const rtWidth = 512;
  const rtHeight = 512;
  const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
    depthBuffer: false,
    stencilBuffer: false,
  });

  const rtFov = 75;
  const rtAspect = rtWidth / rtHeight;
  const rtNear = 0.1;
  const rtFar = 5;
  const rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
  rtCamera.position.z = 2;

  const rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color("blue");

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    rtScene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    rtScene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const rtCubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const material = new THREE.MeshPhongMaterial({
    map: renderTarget.texture,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

      renderTarget.setSize(canvas.width, canvas.height);
      rtCamera.aspect = camera.aspect;
      rtCamera.updateProjectionMatrix();
    }

    // rotate all the cubes in the render target scene
    rtCubes.forEach((cube, ndx) => {
      const speed = 0.3 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    // draw render target scene to render target
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
    renderer.setRenderTarget(null);

    // rotate the cube in the scene
    cube.rotation.x = time / 3;
    cube.rotation.y = time / 3;

    // render the scene to the canvas
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// custom buffergeometry
function main12() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;

  const scene = new THREE.Scene();

  function addLight(...pos) {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
  }

  addLight(-1, 2, 4);
  addLight(2, -2, 3);

  function makeSpherePositions(segmentsAround, segmentsDown) {
    const numVertices = segmentsAround * segmentsDown * 6;
    const numComponents = 3;
    const positions = new Float32Array(numVertices * numComponents);
    const indices = [];

    const longHelper = new THREE.Object3D();
    const latHelper = new THREE.Object3D();
    const pointHelper = new THREE.Object3D();
    longHelper.add(latHelper);
    latHelper.add(pointHelper);
    pointHelper.position.z = 1;
    const temp = new THREE.Vector3();

    function getPoint(lat, long) {
      latHelper.rotation.x = lat;
      longHelper.rotation.y = long;
      longHelper.updateMatrixWorld(true);
      return pointHelper.getWorldPosition(temp).toArray();
    }

    let posNdx = 0;
    let ndx = 0;
    for (let down = 0; down < segmentsDown; ++down) {
      const v0 = down / segmentsDown;
      const v1 = (down + 1) / segmentsDown;
      const lat0 = (v0 - 0.5) * Math.PI;
      const lat1 = (v1 - 0.5) * Math.PI;

      for (let across = 0; across < segmentsAround; ++across) {
        const u0 = across / segmentsAround;
        const u1 = (across + 1) / segmentsAround;
        const long0 = u0 * Math.PI * 2;
        const long1 = u1 * Math.PI * 2;

        positions.set(getPoint(lat0, long0), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat1, long0), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat0, long1), posNdx);
        posNdx += numComponents;
        positions.set(getPoint(lat1, long1), posNdx);
        posNdx += numComponents;

        indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
        ndx += 4;
      }
    }

    return { positions, indices };
  }

  const segmentsAround = 24;
  const segmentsDown = 16;
  const { positions, indices } = makeSpherePositions(
    segmentsAround,
    segmentsDown
  );

  const normals = positions.slice();

  const geometry = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  const normalNumComponents = 3;

  const positionAttribute = new THREE.BufferAttribute(
    positions,
    positionNumComponents
  );
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", positionAttribute);
  geometry.setAttribute(
    "normal",
    new THREE.BufferAttribute(normals, normalNumComponents)
  );
  geometry.setIndex(indices);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({
      color,
      side: THREE.DoubleSide,
      shininess: 100,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  }

  const cubes = [makeInstance(geometry, 0xff0000, 0)];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  const temp = new THREE.Vector3();

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    for (let i = 0; i < positions.length; i += 3) {
      const quad = (i / 12) | 0;
      const ringId = (quad / segmentsAround) | 0;
      const ringQuadId = quad % segmentsAround;
      const ringU = ringQuadId / segmentsAround;
      const angle = ringU * Math.PI * 2;
      temp.fromArray(normals, i);
      temp.multiplyScalar(
        THREE.MathUtils.lerp(
          1,
          1.4,
          Math.sin(time + ringId + angle) * 0.5 + 0.5
        )
      );
      temp.toArray(positions, i);
    }

    positionAttribute.needsUpdate = true;

    cubes.forEach((cube, ndx) => {
      const speed = -0.2 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// rendering on demand (smooth moving in orbit)
function main13() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  makeInstance(geometry, 0x44aa88, 0);
  makeInstance(geometry, 0x8844aa, -2);
  makeInstance(geometry, 0xaa8844, 2);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  let renderRequested = false;

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
  }

  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener("change", requestRenderIfNotRequested);
  window.addEventListener("resize", requestRenderIfNotRequested);
}

// getting screenshot
function main14() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  const state = {
    time: 0,
  };

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = state.time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
  }

  function animate(time) {
    state.time = time * 0.001;

    render();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  const elem = document.querySelector("#screenshot");
  elem.addEventListener("click", () => {
    render();
    canvas.toBlob((blob) => {
      saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
    });
  });

  const saveBlob = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    return function saveData(blob, fileName) {
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
    };
  })();
}

// setting event listeners for canvases (https://threejs.org/manual/#en/tips#tabindex)
// document.querySelectorAll("canvas").forEach((canvas) => {
//   const ctx = canvas.getContext("2d");

//   function draw(str) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(str, canvas.width / 2, canvas.height / 2);
//   }

//   draw(canvas.id);

//   canvas.addEventListener("focus", () => {
//     draw("has focus press a key");
//   });

//   canvas.addEventListener("blur", () => {
//     draw("lost focus");
//   });

//   canvas.addEventListener("keydown", (e) => {
//     draw(`keyCode: ${e.keyCode}`);
//   });
// });

// making canvas transparent (https://threejs.org/manual/#en/tips#transparent-canvas)

// using iframe for setting style in background
// more data https://threejs.org/manual/#en/tips#html-background
