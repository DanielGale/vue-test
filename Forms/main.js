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
        let data = Object.assign({}, this);

        delete data.originalData;
        delete data.errors;

        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }
    }

    submit(requestType, url) {
        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this));
    }

    onSuccess(response) {
        alert(response.data.id);

        this.errors.clear();

        this.reset();
    }

    onFail(error) {
        this.errors.record(error.response.data);
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
            this.form.submit('post', 'https://jsonplaceholder.typicode.com/posts');

        }
    }
    //mounted() {
    //    axios.get('https://jsonplaceholder.typicode.com/posts')
    //        .then(response => this.posts = response.data);
    //}
});