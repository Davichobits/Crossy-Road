import * as THREE from 'three';

export function Wheel(index:number){
  const wheel = new THREE.Mesh(
    new THREE.BoxGeometry(12,33,12),
    new THREE.MeshLambertMaterial({
      color: 0x333333,
      flatShading: true,
    })
  )
  wheel.position.x = index
  wheel.position.z = 6;
  return wheel;
}