class Model {
    constructor() {
        this.reset();
    }
    reset() {
        this.authtoken = null;
        this.files = [];
        this.activeFile = {
            id: null,
            text: ''
        }
    }
}

let data = new Model();

export const store = {
    data: data
};
