let input = document.getElementById('input');
let btn = document.getElementById('add');
let txtcontainer = document.querySelector('.textcontainer');

// Load todos from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

btn.addEventListener('click', function () {
    if (input.value === '') {
        alert('Please enter a todo message');
    } else {
        addTodoItem(input.value);
        updateLocalStorage();
    }
    input.value = '';
});

txtcontainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('deletebtn')) {
        deleteTodo(event.target.parentElement);
        updateLocalStorage();
    }
});

function addTodoItem(text) {
    let outputContainer = document.createElement('div');
    outputContainer.classList.add('outputContainer');
    txtcontainer.appendChild(outputContainer);

    let ul = document.createElement('li');
    ul.innerText = text;
    outputContainer.appendChild(ul);

    let check = document.createElement('button');
    check.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    check.classList.add('checkbtn');
    outputContainer.appendChild(check);

    let delet = document.createElement('button');
    delet.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delet.classList.add('deletebtn');
    outputContainer.appendChild(delet);

    check.addEventListener('click', markItem);
}

function deleteTodo(outputContainer) {
    txtcontainer.removeChild(outputContainer);
}

function markItem(event) {
    const checkButton = event.target.closest('.checkbtn');
    if (checkButton) {
        const outputContainer = checkButton.parentElement;
        const listItem = outputContainer.querySelector('li');

        if (listItem.style.textDecoration === 'line-through') {
            listItem.style.textDecoration = 'none';
        } else {
            listItem.style.textDecoration = 'line-through';
        }
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const todos = Array.from(txtcontainer.children).map(outputContainer => {
        return outputContainer.querySelector('li').innerText;
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todo => {
        addTodoItem(todo);
    });
}
