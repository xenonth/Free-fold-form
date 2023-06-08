import * as CANNON from 'https://cdn.skypack.dev/cannon-es';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const params = {
    segments: 50,
    edgeRadius: .07
};

//variable for boxGeometry
let boxGeometry = new THREE.BoxGeometry(1, 1, 1, params.segments, params.segments, params.segments);

//Dice maker function 

function createDiceGeometry() {
    let boxGeometry = new THREE.BoxGeometry(1, 1, 1, params.segments, params.segments, params.segments);
    
    const positionAttribute = boxGeometry.attributes.position;
    const subCubeHalfSize = .5 - params.edgeRadius;

    for (let i = 0; i < positionAttribute.count; i++) {

        let position = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);

        // modify position.x, position.y and position.z

        positionAttribute.setXYZ(i, position.x, position.y, position.z);

        if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.y) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
            // position is close to box vertex
        } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.y) > subCubeHalfSize) {
            // position is close to box edge that's parallel to Z axis
        } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
            // position is close to box edge that's parallel to Y axis
        } else if (Math.abs(position.y) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
            // position is close to box edge that's parallel to X axis
        }
        
    }

    return boxGeometry;
}