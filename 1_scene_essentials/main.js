import * as THREE from 'https://cdn.skypack.dev/three@0.137.5'

function init(){
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000)
   const renderer = new THREE.WebGLRenderer()

   renderer.setSize(window.innerWidth, window.innerHeight)

   document.getElementById('root').appendChild(renderer.domElement)
   renderer.render(scene, camera)
}

init()