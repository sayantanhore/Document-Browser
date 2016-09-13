class Model {
    constructor() {
        this.reset();
    }
    reset() {
        this.authtoken = null;
        this.files = [];
    }
}

let data = new Model();

export const store = {
    data: data
};
