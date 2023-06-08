import * as CANNON from 'https://cdn.skypack.dev/cannon-es';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const params = {
    segments: 50,
    edgeRadius: .07
};

let boxGeometry = new THREE.BoxGeometry(1, 1, 1, params.segments, params.segments, params.segments);