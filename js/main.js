import * as CANNON from 'https://cdn.skypack.dev/cannon-es';
import * as THREE from 'three';
// mergeVertices() requires the import of BufferGeometryUtils file
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

        const subCube = new THREE.Vector3(Math.sign(position.x), Math.sign(position.y), Math.sign(position.z)).multiplyScalar(subCubeHalfSize);
        const addition = new THREE.Vector3().subVectors(position, subCube);

        if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.y) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
            addition.normalize().multiplyScalar(params.edgeRadius);
            position = subCube.add(addition);
        } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.y) > subCubeHalfSize) {
            addition.z = 0;
            addition.normalize().multiplyScalar(params.edgeRadius);
            position.x = subCube.x + addition.x;
            position.y = subCube.y + addition.y;
        } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
            addition.y = 0;
            addition.normalize().multiplyScalar(params.edgeRadius);
            position.x = subCube.x + addition.x;
            position.z = subCube.z + addition.z;
        } else if (Math.abs(position.y) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
            addition.x = 0;
            addition.normalize().multiplyScalar(params.edgeRadius);
            position.y = subCube.y + addition.y;
            position.z = subCube.z + addition.z;
        }
        
        const notchWave = (v) => {
            v = (1 / params.notchRadius) * v;
            v = Math.PI * Math.max(-1, Math.min(1, v));
            return params.notchDepth * (Math.cos(v) + 1.);
        }
        
        const notch = (pos) => notchWave(pos[0]) * notchWave(pos[1]);

        position.setXYZ(i, position.x, position.y, position.z);
        
    }

// all the modifications of geometryBase.attributes.position
    geometryBase.deleteAttribute('normal');
    geometryBase.deleteAttribute('uv');
    geometryBase = BufferGeometryUtils.mergeVertices(geometryBase);
    
    geometryBase.computeVertexNormals();

    return boxGeometry;
}

boxGeometry;