let showState = false;
const newToDo = [];

function list(title, done) {
    this.title = title;
    this.done = done;
    return this;
}

function addTodo() {
    const title = document.getElementById("title").value;
    const done = document.getElementById("done").checked;
    const newList = new list(title, done);
    newToDo.push(newList);
    console.log(newToDo);
}

function showForm() {
    const form = document.getElementById("show");
    if (!showState) {
        form.style.display = "block";
        showState = true;
    } else {
        form.style.display = "none";
        showState = false;
    }
}

function render() {
    const listContainer = document.getElementById("container");
    listContainer.innerHTML = '';
    newToDo.forEach((list, main) => {
        const listDiv = document.createElement('div');
        listDiv.classList.add('book');
        listDiv.innerHTML = `
        <p>${list.title}</p>
        <p>Done: ${list.done ? 'Yes' : 'No'}</p>
        <button onclick="removeList(${main})">Remove</button>
        <button onclick="toggleDone(${main})">Toggle Done</button>
        <button id="toggleButton-${main}" onclick="toggleDone(${main})">${newToDo[main].done ? 'Toggle Undone' : 'Toggle Done'}</button>
        `;
        listContainer.appendChild(listDiv);
    });
}

function removeList(main) {
    newToDo.splice(main, 1);
    render();
}

function toggleDone(main) {
    newToDo[main].done = !newToDo[main].done;
    render();
    const doneButton = document.getElementById(`toggleButton-${main}`);
    doneButton.textContent = newToDo[main].done ? 'Toggle Undone' : 'Toggle Done';
}

document.getElementById('showBtn').addEventListener('click', () => {
    document.getElementById('show').style.display = 'block';
});

document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const done = document.getElementById('done').checked;
    addTodo();
    render();
    document.getElementById('show').style.display = 'none';
});
