class Errors {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    record(errors) {
        this.errors = errors;
    }

    clear(field) {
        if (field) {
            delete this.errors[field];
        }
        else {
            this.errors = {};
        }
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }
}

class Form {

    constructor(data) {

        this.originalData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();

    }

    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    post(url) {
        this.submit('post', url);
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data);
                    reject(error.response.data);
                });
        });
    }

    onSuccess(data) {
        alert(data.id);

        this.reset();
    }

    onFail(errors) {
        this.errors.record(errors);
    }
}

new Vue({
    el: '#root',
    data: {
        form: new Form({
            title: '',
            body: '',
            userId: 1
        })
    },
    methods: {
        onSubmit() {
            this.form.post('https://jsonplaceholder.typicode.com/posts')
                .then(data => console.log(data))
                .catch(errors => console.log(errors));

        }
    }
    //mounted() {
    //    axios.get('https://jsonplaceholder.typicode.com/posts')
    //        .then(response => this.posts = response.data);
    //}
});