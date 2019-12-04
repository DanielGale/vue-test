Vue.component('task-list', {
    template: `
            <div>
                <task v-for="task in tasks">{{ task.description }}</task>
            </div>
        `,

    data() {
        return {
            tasks: [
                { description: 'Go to the Store', completed: true },
                { description: 'Finish project', completed: true },
                { description: 'Go to bank', completed: false },
                { description: 'Clear inbox', completed: false },
                { description: 'Make dinner', completed: true },
                { description: 'Pickup kids', completed: false },
                { description: 'Clean house', completed: true }
            ]
        };
    }
});

Vue.component('task', {
    template: '<li><slot></slot></li>'
});


new Vue({
    el: '#root'
});