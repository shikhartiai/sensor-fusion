import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

class SceneManager {

    private static instance: SceneManager;

    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    curPath: string;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.curPath = "";
        this.setupScene();
        window.addEventListener("resize", () => {
            let width: number = window.innerWidth;
            let height: number = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    public getSceneObj(): THREE.Scene {
        return this.scene;
    }

    private setupScene() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.set(0, 0, 1);

        this.scene.add(this.camera);

        let controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.addEventListener('change', () => {
            this.renderer.render(this.scene, this.camera);
        });

        this.scene.add(new THREE.AxesHelper(1));

        this.renderer.render(this.scene, this.camera);
    }

    public renderScene() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager;