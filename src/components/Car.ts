import * as THREE from 'three';
import { tileSize } from '../constants';
import { Wheel } from './Wheel';

interface ICar {
  initialTileIndex: number,
  direction:boolean,
  color: number,
}

export function Car ({
  initialTileIndex,
  direction,
  color,
}: ICar){
  const car = new THREE.Group();
  car.position.x = initialTileIndex * tileSize;
  if(!direction) car.position.z = Math.PI; // radianes -> 180 grados

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
    })
  )
  main.position.z = 12;
  main.castShadow = true;
  main.receiveShadow = true;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(33,24,12),
    new THREE.MeshLambertMaterial({
      color: 'white',
      flatShading: true,
    })
  )
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  const frontWheel = Wheel(18);
  car.add(frontWheel);

  const backWheel = Wheel(-18);
  car.add(backWheel);

  return car;
}