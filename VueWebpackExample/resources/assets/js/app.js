import Vue from 'vue';
import axios from 'axios';
import Form from './core/Form';

window.axios = axios;
window.Form = Form;

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