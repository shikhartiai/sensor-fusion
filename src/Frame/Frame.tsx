class Frame {
    private frameId: string;
    private framePath: string;

    constructor(path: string) {
        this.frameId = 'id' + (new Date()).getTime();
        this.framePath = path;
    }

    public getPath() {
        return this.framePath;
    }

    public getId() {
        return this.frameId;
    }
}

export default Frame;