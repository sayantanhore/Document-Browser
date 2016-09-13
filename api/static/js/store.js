class Model {
    constructor() {
        this.authtoken = null;
        this.fileNames = [];
    }
}

let data = new Model();

export const store = {
    data: data
};
