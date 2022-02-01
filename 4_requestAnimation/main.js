import * as THREE from 'https://cdn.skypack.dev/three@0.137.5'

function init(){
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
   const renderer = new THREE.WebGLRenderer()

   //Create objects
   const box = getBox(1, 1, 1)
   const plane = getPlane(4)

   //Three JS use radian instead degrees for rotation
   plane.rotation.x = Math.PI/2 //rotate the plane by 90 degrees

   //Makes the box above the plane 
   box.position.y = box.geometry.parameters.height/2

   //Add object(s) in scene
   scene.add(box)
   scene.add(plane)

   //Change camera position
   camera.position.x = 1
   camera.position.y = 2
   camera.position.z = 5
   //The camera will look at center of scene
   camera.lookAt(new THREE.Vector3(0, 0, 0)) 

   document.getElementById('root').appendChild(renderer.domElement)
   renderer.setSize(window.innerWidth, window.innerHeight)
   update(renderer, scene, camera)
}

function getBox(w, h, d){
   const geometry = new THREE.BoxGeometry(w, h, d)
   const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

function getPlane(size){
   const geometry = new THREE.PlaneGeometry(size, size)
   const material = new THREE.MeshBasicMaterial({
      color: 'red',
      side: THREE.DoubleSide //Rendering both side a 2D flat object
   })
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

function update(renderer, scene, camera){
   renderer.render(scene, camera)

   //requestAnimationFrame is a JS callback function, called by 60 times per second
   requestAnimationFrame(function(){
      update(renderer, scene, camera)
   })
}

init()