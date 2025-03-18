import * as THREE from 'three';
import { Grass } from './Grass';
import { Tree } from './Tree';
import { Road } from './Road';
import { Car } from './Car';

interface IMetadata {
  type: string,
  trees: {
    tileIndex: number,
    height: number,
  }[]
}

export const metadata: IMetadata[] = [
  // {
  //   type: 'forest',
  //   trees:[
  //     {tileIndex: -3, height: 50},
  //     {tileIndex: 2, height: 30},
  //     {tileIndex: 3, height: 50},
  //   ]
  // }
  {
    type: 'car',
    direction: false,
    speed:1,
    vehicles:[{initialTileIndex: 2, color: 0x0ff000}]
  }
];

export const map = new THREE.Group();

export function initializeMap(){
  const grass = Grass(0);
  map.add(grass);
  addRows();
}

export function addRows(){
  metadata.forEach((rowData: IMetadata, index) => {
    const rowIndex = index + 1;
    if(rowData.type === 'forest'){
      const row = Grass(rowIndex);

      rowData.trees.forEach(({tileIndex, height})=>{
        const tree = Tree(tileIndex, height);
        row.add(tree);
      });

      map.add(row);
    }

    if(rowData.type === 'car'){
      const row = Road(rowIndex);
      rowData.vehicles.forEach(vehicle=>{
        const car = Car({
          initialTileIndex: vehicle.initialTileIndex,
          direction: rowData.direction,
          color: vehicle.color
        }
        );
        row.add(car);
      });

      map.add(row)
    }
  });
}