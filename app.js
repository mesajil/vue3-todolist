// Vue3 - Api preference Options

const app = Vue.createApp({
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === '') {
        alert('Please enter a task!');
        return;
      }

      const newTaskObj = {
        id: Date.now(),
        title: this.newTask,
        isCompleted: false
      };

      this.tasks.push(newTaskObj);
      this.saveTasksToLocalStorage();
      this.newTask = ''; // Clear input field
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }
  },
  mounted() {
    this.loadTasksFromLocalStorage();
  }
});

app.mount('#app');