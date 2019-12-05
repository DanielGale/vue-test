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
        delete this.errors[field];
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }
}

new Vue({
    el: '#root',
    data: {
        title: '',
        body: '',
        userId: 1,
        errors: new Errors()
    },
    methods: {
        onSubmit() {

            axios.post('https://jsonplaceholder.typicode.com/posts', this.$data)
                .then(this.onSuccess)
                .catch(error => this.errors.record(error.response.data));
        },

        onSuccess(response) {
            alert(response.data.message);


            //form.reset();
            this.title = '';
            this.body = '';
        }
    }
    //mounted() {
    //    axios.get('https://jsonplaceholder.typicode.com/posts')
    //        .then(response => this.posts = response.data);
    //}
});