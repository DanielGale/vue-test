

new Vue({
    el: '#root',
    data: {
        posts: []
    },
    mounted() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => this.posts = response.data);
    }
});