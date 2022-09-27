import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import SceneManager from "../Scene/SceneManager";
import Frame from "./Frame";

class FrameManager {
    private static instance: FrameManager;

    private frames: Array<Frame>;
    private paths: ReadonlyArray<string>;
    private isFrameLoaded: Boolean;
    private sceneManager: SceneManager
    private scene: THREE.Scene;
    private curFrameIndex: number;

    constructor() {
        this.paths = ["pcd/s1.pcd", "pcd/s2.pcd", "pcd/s3.pcd"];
        this.frames = this.initializeFrames();
        this.isFrameLoaded = false
        this.sceneManager = SceneManager.getInstance();
        this.scene = this.sceneManager.getSceneObj();
        this.curFrameIndex = -1;
    }

    public static getInstance(): FrameManager {
        if (!FrameManager.instance) {
            FrameManager.instance = new FrameManager();
        }
        return FrameManager.instance;
    }

    private initializeFrames(): Array<Frame> {
        let tempFrames: Array<Frame> = new Array();
        this.paths.forEach((path) => {
            tempFrames.push(new Frame(path));
        })
        return tempFrames;
    }

    public changeFrame(frameIndex: number) {
        let loader: PCDLoader = new PCDLoader();
        let path: string = this.frames[frameIndex].getPath();
        
        loader.load(path, (points: any) => {
            points.geometry.center();
            points.geometry.rotateX(Math.PI);
            points.name = path;
            if(this.isFrameLoaded)
                this.scene.children.pop();
            this.scene.add(points);
            this.isFrameLoaded = true;
            this.curFrameIndex = frameIndex;
            this.sceneManager.renderScene();
        });
    }

    public getCurrentFrameIndex() {
        return this.curFrameIndex
    }

}

export default FrameManager;