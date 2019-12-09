import Vue from 'vue';
import axios from 'axios';
import Form from './core/Form';

import Example from './components/Example';

window.axios = axios;
window.Form = Form;

new Vue({
    el: '#root',
    components: {
      Example  
    },
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
});