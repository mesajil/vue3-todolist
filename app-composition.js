// Vue3 - Api preference Composition

const { createApp, ref, onMounted } = Vue

const app = createApp({
  setup() {
    const newTask = ref('');
    const tasks = ref([]);

    function addTask() {
      if (newTask.value.trim() === '') {
        alert('Please enter a task!');
        return;
      }

      const newTaskObj = {
        id: Date.now(),
        title: newTask.value,
        isCompleted: false
      };

      tasks.value.push(newTaskObj);
      saveTasksToLocalStorage();
      newTask.value = ''; // Clear input field
    }

    function removeTask(taskId) {
      tasks.value = tasks.value.filter(task => task.id !== taskId);
      saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    }

    function loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        tasks.value = JSON.parse(storedTasks);
      }
    }

    onMounted(() => {
      loadTasksFromLocalStorage();
    });

    return {
      newTask, tasks, addTask, removeTask
    }
  }
});

app.mount('#app');