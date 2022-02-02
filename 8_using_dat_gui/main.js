import * as THREE from 'https://cdn.skypack.dev/three@0.137.5'

function init(){
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
   const renderer = new THREE.WebGLRenderer()

   const gui = new dat.GUI()

   //Create objects
   const box = getBox(1, 1, 1)
   const plane = getPlane(20)
   const sphere = getSphere(0.05, 24)

   //Create a point light
   const pointLight = getPointLight(1)
   pointLight.position.y = 1.5
   pointLight.intensity = 2

   //Create a controller to point light 
   gui.add(pointLight, 'intensity', 0, 10)
   gui.add(pointLight.position, 'y', 0, 5)
 
   //Three JS use radian instead degrees for rotation
   plane.rotation.x = Math.PI/2 //rotate the plane by 90 degrees

   //Makes the box above the plane 
   box.position.y = box.geometry.parameters.height/2

   //Add object(s) in scene
   scene.add(box) 
   scene.add(plane)

   pointLight.add(sphere) //add sphere into a pointLight
   scene.add(pointLight)

   //Change camera position
   camera.position.x = 1
   camera.position.y = 2
   camera.position.z = 5
   //The camera will look at center of scene
   camera.lookAt(new THREE.Vector3(0, 0, 0)) 

   document.getElementById('root').appendChild(renderer.domElement)
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.setClearColor('rgb(120, 120, 120)') //Change background color
   update(renderer, scene, camera)
}

function getBox(w, h, d){
   const geometry = new THREE.BoxGeometry(w, h, d)
   const material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)'}) //change to Phong material
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

function getPlane(size){
   const geometry = new THREE.PlaneGeometry(size, size)
   const material = new THREE.MeshPhongMaterial({ //change to Phong material
      color: 'rgb(120, 120, 120)',
      side: THREE.DoubleSide //Rendering both side a 2D flat object
   })
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

function getSphere(radius, segments){
   const geometry = new THREE.SphereGeometry(radius, segments, segments)
   const material = new THREE.MeshBasicMaterial({color: 'rgb(255, 255, 255)'})
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

function getPointLight(intensity){
   const light = new THREE.PointLight(0xffffff, intensity)
   return light
}

function update(renderer, scene, camera){
   renderer.render(scene, camera)

   //requestAnimationFrame is a JS callback function, called by 60 times per second
   requestAnimationFrame(function(){
      update(renderer, scene, camera)
   })
}

init()