
const ul = document.querySelector('#ul')
const form = document.querySelector('#form-list')
const input = document.querySelector('#input')
const removeBtn = document.querySelectorAll('.remove-btn');
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        ul.innerHTML = savedTasks;
    }
}


function saveTasks() {
    localStorage.setItem('tasks', ul.innerHTML);
}


loadTasks();

form.addEventListener('submit', submitForm);
let editableTask = null;


function submitForm(e) {
    e.preventDefault();
    if (input.value) {
        if (editableTask) {
            editableTask.innerText = input.value;
            editableTask = null;
        }
        else {
            const newDiv = document.createElement('div');
            newDiv.classList.add('d-flex');

            const text = input.value;
            const newTask = document.createElement('p');

            const btn = document.createElement('button');
            btn.innerText = 'Remove';
            btn.classList.add('remove-btn');

            btn.addEventListener('click', () => {
                newDiv.remove();
                saveTasks();
            })

            newTask.innerText = text;
            ul.appendChild(newDiv);
            newDiv.appendChild(newTask)
            newDiv.appendChild(btn);
        }
        saveTasks(); 
        input.value = '';
        input.focus();
    }
}


ul.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'P') {
        editableTask = target;
        input.value = target.innerText;
    }
});
removeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentNode.remove();
        saveTasks();
    })
})
