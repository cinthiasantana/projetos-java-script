
// Obtenha referências aos elementos relevantes
const tarefaInput = document.getElementById('tarefaInput');
const adicionaTarefaBtn = document.getElementById('adicionaTarefaBtn');
const listaTarefas = document.getElementById('listaTarefas');

// Adicione um ouvinte de evento de clique ao botão "Adicionar"
adicionaTarefaBtn.addEventListener('click', adicionaTarefa);

// Adicione um ouvinte de evento de tecla pressionada para a tecla Enter
tarefaInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    adicionaTarefa();
  }
});

const dataAtual = document.getElementById('dataAtual'); // Referência ao elemento de data
// Atualiza a data atual
const hoje = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dataAtual.textContent = hoje.toLocaleDateString('pt-BR', options);

tarefaInput.className = 'tarefaInput';
tarefaInput.appendChild(tarefaInput);

adicionaTarefaBtn.className = 'adicionaTarefaBtn';
adicionaTarefaBtn.appendChild(adicionaTarefaBtn);

// Função para adicionar uma nova tarefa
function adicionaTarefa() {
  const tarefaTexto = tarefaInput.value.trim(); // Obtenha o valor da nova tarefa

  if (tarefaTexto !== '') {
    const tarefaItem = document.createElement('li');
    const tarefaCheckbox = document.createElement('input');
    const tarefaLabel = document.createElement('label');
    const deletarTarefa = document.createElement('button');
    const editIcon = document.createElement("i");

    tarefaCheckbox.type = 'checkbox';
    tarefaLabel.textContent = tarefaTexto;
    editIcon.className = "fas fa-trash";
    deletarTarefa.className = 'delete';

    deletarTarefa.addEventListener('click', function () {
      tarefaItem.remove();
    });

    tarefaItem.appendChild(tarefaCheckbox);
    tarefaItem.appendChild(tarefaLabel);
    tarefaItem.appendChild(deletarTarefa);
    deletarTarefa.appendChild(editIcon);

    listaTarefas.appendChild(tarefaItem);

    tarefaInput.value = '';
  }
}