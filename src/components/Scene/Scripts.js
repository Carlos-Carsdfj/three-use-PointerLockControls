import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

let currentRef = null
let xdir = 0,
  zdir = 0
let tiempoI, tiempoF, vel, delta
const scene = new THREE.Scene()
//scene.background = new THREE.Color(0xffffff)
scene.fog = new THREE.Fog(0xffffff, 0, 500)
//scene.background = null

const camera = new THREE.PerspectiveCamera(75, 100 / 100, 1, 1000)
scene.add(camera)
camera.position.set(0, 10, 30)
camera.lookAt(new THREE.Vector3())

const material = new THREE.MeshBasicMaterial({ color: 0x00eeee })
const geometry = new THREE.BoxBufferGeometry(5, 5, 5)
const cube = new THREE.Mesh(geometry, material)
cube.position.z = -50
scene.add(cube)

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
})
renderer.setSize(100, 100)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3.5
renderer.setPixelRatio(window.devicePixelRatio)

scene.add(new THREE.GridHelper(10000, 1000))

//ligth
scene.add(new THREE.HemisphereLight(0xffffff))

// key with pointlock
let pControl = new PointerLockControls(camera, renderer.domElement)

document.addEventListener('keydown', (e) => {
  switch (e?.keyCode) {
    case 37:
      xdir = -1
      break
    case 38:
      zdir = 1
      break
    case 39:
      xdir = 1
      break
    case 40:
      zdir = -1
      break
    default:
      zdir = 0
  }
})

document.addEventListener('keyup', (e) => {
  switch (e?.keyCode) {
    case 37:
      xdir = 0
      break
    case 38:
      zdir = 0
      break
    case 39:
      xdir = 0
      break
    case 40:
      zdir = 0
      break
    default:
      zdir = 0
  }
})
tiempoI = Date.now()
vel = 50
const animate = () => {
  if (pControl.isLocked === true) {
    tiempoF = Date.now()

    delta = (tiempoF - tiempoI) / 1000

    let xDis = xdir * vel * delta
    let zDis = zdir * vel * delta

    pControl.moveRight(xDis)
    pControl.moveForward(zDis)

    tiempoI = tiempoF
  }
  //post processing render
  renderer.render(scene, camera)
  //orbitControls.update()
  requestAnimationFrame(animate)
}
animate()

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight)
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight
  camera.updateProjectionMatrix()
}
window.addEventListener('resize', resize)
window.addEventListener('resize', resize)

export const makeScene = (esceneRef) => {
  currentRef = esceneRef.current
  currentRef.appendChild(renderer.domElement)
  resize()
}
export const unmakeScene = () => {
  scene.removeFromParent()
  currentRef.removeChild(renderer.domElement)

  pControl.dispose()
}
export const playPointLock = () => {
  pControl = new PointerLockControls(camera, renderer.domElement)
  pControl.lock()
  pControl.maxPolarAngle(50.0)
}
