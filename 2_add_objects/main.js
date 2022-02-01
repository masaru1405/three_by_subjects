import * as THREE from 'https://cdn.skypack.dev/three@0.137.5'

function init(){
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
   const renderer = new THREE.WebGLRenderer()

   //Add a box
   const box = getBox(1, 1, 1)
   scene.add(box)

   //Change camera position
   camera.position.x = 1
   camera.position.y = 2
   camera.position.z = 5
   //The camera will look at center of scene
   camera.lookAt(new THREE.Vector3(0, 0, 0)) 

   document.getElementById('root').appendChild(renderer.domElement)
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.render(scene, camera)
}

function getBox(w, h, d){
   const geometry = new THREE.BoxGeometry(w, h, d)
   const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

init()