
// Array para armazenar os dados da tabela
var tableData = [];

// Índice da entrada em edição (-1 quando não está em edição)
var editingIndex = -1;

// Função para criar ou atualizar uma entrada na tabela
function createOrUpdateEntry() {
    var responsavelInput = document.getElementById("responsavelInput");
    var dataCompraInput = document.getElementById("dataCompraInput");
    var descricaoInput = document.getElementById("descricaoInput");
    var valorInput = document.getElementById("valorInput");
    var parcelamentoInput = document.getElementById("parcelamentoInput");
    var observacaoInput = document.getElementById("observacaoInput");
    var categoriaInput = document.getElementById("categoriaInput");

    // Validação dos campos
    var isResponsavelValid = validateResponsavel();
    var isDataCompraValid = validateDataCompra();
    var isValorValid = validateValor();

    if (!isResponsavelValid || !isDataCompraValid || !isValorValid) {
        return;
    }

    var responsavel = responsavelInput.value;
    var dataCompra = dataCompraInput.value;
    var descricao = descricaoInput.value;
    var valor = parseFloat(valorInput.value.replace(/[^0-9.-]+/g, "").replace(",", "."));
    var parcelamento = parcelamentoInput.value;
    var observacao = observacaoInput.value;
    var categoria = categoriaInput.value;

    if (editingIndex === -1) {
        // Criar nova entrada
        var entry = {
            responsavel: responsavel,
            dataCompra: dataCompra,
            descricao: descricao,
            valor: valor,
            parcelamento: parcelamento,
            observacao: observacao,
            categoria: categoria
        };

        tableData.unshift(entry);
    } else {
        // Atualizar entrada existente
        var entry = tableData[editingIndex];
        entry.responsavel = responsavel;
        entry.dataCompra = dataCompra;
        entry.descricao = descricao;
        entry.valor = valor;
        entry.parcelamento = parcelamento;
        entry.observacao = observacao;
        entry.categoria = categoria;

        // Resetar o índice de edição
        editingIndex = -1;
    }

    updateTable();
    calculateSum();
    clearInputs();
}

// Função para validar o campo "Responsável"
function validateResponsavel() {
    var responsavelInput = document.getElementById("responsavelInput");
    var responsavel = responsavelInput.value;

    if (responsavel.trim() === "") {
        responsavelInput.classList.add("error");
        return false;
    }

    responsavelInput.classList.remove("error");
    return true;
}

// Função para validar o campo "Data da Compra"
function validateDataCompra() {
    var dataCompraInput = document.getElementById("dataCompraInput");
    var dataCompra = dataCompraInput.value;

    if (dataCompra.trim() === "") {
        dataCompraInput.classList.add("error");
        return false;
    }

    var datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(dataCompra)) {
        dataCompraInput.classList.add("error");
        return false;
    }

    dataCompraInput.classList.remove("error");
    return true;
}

// Função para validar o campo "Valor"
function validateValor() {
    var valorInput = document.getElementById("valorInput");
    var valor = valorInput.value;

    if (valor.trim() === "") {
        valorInput.classList.add("error");
        return false;
    }

    // Verificar se o valor é um número válido
    var numericValue = parseFloat(valor.replace(/[^0-9.-]+/g, "").replace(",", "."));
    if (isNaN(numericValue)) {
        valorInput.classList.add("error");
        return false;
    }

    valorInput.classList.remove("error");
    return true;
}

// Função para preencher os campos de entrada com os valores da linha selecionada para edição
function editEntry(index) {
    var entry = tableData[index];
    var responsavelInput = document.getElementById("responsavelInput");
    var dataCompraInput = document.getElementById("dataCompraInput");
    var descricaoInput = document.getElementById("descricaoInput");
    var valorInput = document.getElementById("valorInput");
    var parcelamentoInput = document.getElementById("parcelamentoInput");
    var observacaoInput = document.getElementById("observacaoInput");

    responsavelInput.value = entry.responsavel;
    dataCompraInput.value = entry.dataCompra;
    descricaoInput.value = entry.descricao;
    valorInput.value = entry.valor.toFixed(2);
    parcelamentoInput.value = entry.parcelamento;
    observacaoInput.value = entry.observacao;

    // Armazenar o índice da entrada em edição
    editingIndex = index;
}

// Função para cancelar a edição de uma entrada
function cancelEdit() {
    editingIndex = -1;
    clearInputs();
}

// Função para atualizar a tabela
function updateTable() {
    var table = document.getElementById("table");

    // Limpa o conteúdo da tabela
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Popula a tabela com os dados
    tableData.forEach(function (entry, index) {
        var row = table.insertRow();
        row.className = "linhas";

        var responsavelCell = row.insertCell();
        responsavelCell.textContent = entry.responsavel;

        var dataCompraCell = row.insertCell();
        dataCompraCell.textContent = entry.dataCompra;

        var descricaoCell = row.insertCell();
        descricaoCell.textContent = entry.descricao;

        var valorCell = row.insertCell();
        valorCell.textContent = "R$" + entry.valor.toFixed(2);

        var parcelamentoCell = row.insertCell();
        parcelamentoCell.textContent = entry.parcelamento;

        var observacaoCell = row.insertCell();
        observacaoCell.textContent = entry.observacao;

        var categoriaCell = row.insertCell();
        categoriaCell.textContent = entry.categoria;

        var actionsCell = row.insertCell();
        actionsCell.classList.add("action-button");

        var editButton = document.createElement("button");
        editButton.className = "edit-button";
        var editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit";
        editButton.appendChild(editIcon);
        editButton.addEventListener("click", function () {
            editEntry(index);
        });
        actionsCell.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        var deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash";
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", function () {
            deleteEntry(index);
        });
        actionsCell.appendChild(deleteButton);
    });
}

// Função para deletar uma entrada da tabela
function deleteEntry(index) {
    tableData.splice(index, 1);
    updateTable();
    calculateSum();
}

// Aplica a máscara de data no campo "Data da Compra"
$(document).ready(function () {
    $('#dataCompraInput').mask('00/00/0000');
});

function calculateSum() {
    var total = 0;
    tableData.forEach(function (entry) {
        if (entry.parcelamento > 0) {
            total += entry.valor / entry.parcelamento;
        } else {
            total += entry.valor;
        }
    });
    document.getElementById("totalValue").textContent = "Total: R$" + total.toFixed(2);

    var sumByResponsavel = {}; // Objeto para armazenar a soma por responsável
    var sumByMonth = {}; // Objeto para armazenar a soma por mês (ano e mês combinados)
    var sumByCategory = {}; // Objeto para armazenar a soma por categoria

    tableData.forEach(function (entry) {
        var responsavel = entry.responsavel;
        var valor = entry.valor;
        var dataCompra = entry.dataCompra;
        var parcelamento = entry.parcelamento;
        var categoria = entry.categoria;

        // Calcula a soma por responsável
        if (!sumByResponsavel[responsavel]) {
            sumByResponsavel[responsavel] = {};
        }

        var monthKey = getMonthKey(dataCompra);
        if (!sumByResponsavel[responsavel][monthKey]) {
            sumByResponsavel[responsavel][monthKey] = 0;
        }

        if (parcelamento > 0) {
            sumByResponsavel[responsavel][monthKey] += valor / parcelamento;
        } else {
            sumByResponsavel[responsavel][monthKey] += valor;
        }

        // Calcula a soma por mês
        if (!sumByMonth[monthKey]) {
            sumByMonth[monthKey] = 0;
        }

        if (parcelamento > 0) {
            sumByMonth[monthKey] += valor / parcelamento;
        } else {
            sumByMonth[monthKey] += valor;
        }

        // Calcula a soma por categoria
        if (!sumByCategory[categoria]) {
            sumByCategory[categoria] = {};
        }

        var monthKey = getMonthKey(dataCompra);
        if (!sumByCategory[categoria][monthKey]) {
            sumByCategory[categoria][monthKey] = 0;
        }

        if (parcelamento > 0) {
            sumByCategory[categoria][monthKey] += valor / parcelamento;
        } else {
            sumByCategory[categoria][monthKey] += valor;
        }
    });

    // Exibir a soma por responsável
    var totalByResponsavelElement = document.getElementById("totalByResponsavel");
    totalByResponsavelElement.innerHTML = ""; // Limpa o conteúdo

    Object.keys(sumByResponsavel).forEach(function (responsavel) {
        var responsavelData = sumByResponsavel[responsavel];
        var responsavelTotalElement = document.createElement("div");
        responsavelTotalElement.textContent = "Responsável: " + responsavel;

        Object.keys(responsavelData).forEach(function (monthKey) {
            var total = responsavelData[monthKey];
            var monthLabel = getMonthLabel(monthKey);

            var monthTotalElement = document.createElement("span");
            monthTotalElement.textContent = monthLabel + ": R$" + total.toFixed(2) + "  ";

            responsavelTotalElement.appendChild(monthTotalElement);
        });

        totalByResponsavelElement.appendChild(responsavelTotalElement);
    });

    // Exibir a soma por mês
    var totalByMonthElement = document.getElementById("totalByMonth");
    totalByMonthElement.innerHTML = ""; // Limpa o conteúdo

    Object.keys(sumByMonth).forEach(function (monthKey) {
        var total = sumByMonth[monthKey];
        var monthLabel = getMonthLabel(monthKey);

        var monthTotalElement = document.createElement("div");
        monthTotalElement.textContent = "Mês: " + monthLabel + ", Total: R$" + total.toFixed(2);

        totalByMonthElement.appendChild(monthTotalElement);
    });

    // Exibir a soma por categoria
    var totalByCategoryElement = document.getElementById("totalByCategory");
    totalByCategoryElement.innerHTML = ""; // Limpa o conteúdo

    Object.keys(sumByCategory).forEach(function (categoria) {
        var categoriaData = sumByCategory[categoria];
        var categoriaTotalElement = document.createElement("div");
        categoriaTotalElement.textContent = "Categoria: " + categoria;

        Object.keys(categoriaData).forEach(function (monthKey) {
            var total = categoriaData[monthKey];
            var monthLabel = getMonthLabel(monthKey);

            var monthTotalElement = document.createElement("span");
            monthTotalElement.textContent = monthLabel + ": R$" + total.toFixed(2) + "  ";

            categoriaTotalElement.appendChild(monthTotalElement);
        });

        totalByCategoryElement.appendChild(categoriaTotalElement);
    });
}

// Função auxiliar para obter a chave do mês (ano e mês combinados) a partir da data no formato "DD/MM/YYYY"
function getMonthKey(dateString) {
    var parts = dateString.split("/");
    var year = parts[2];
    var month = parts[1];
    return year + "-" + month;
}

// Função auxiliar para obter o rótulo do mês a partir da chave do mês (ano e mês combinados)
function getMonthLabel(monthKey) {
    var parts = monthKey.split("-");
    var year = parts[0];
    var month = parts[1];
    var monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];
    return monthNames[parseInt(month) - 1] + " " + year;
}

// Limpa os campos de entrada
function clearInputs() {
    var responsavelInput = document.getElementById("responsavelInput");
    var dataCompraInput = document.getElementById("dataCompraInput");
    var descricaoInput = document.getElementById("descricaoInput");
    var valorInput = document.getElementById("valorInput");
    var parcelamentoInput = document.getElementById("parcelamentoInput");
    var observacaoInput = document.getElementById("observacaoInput");
    var categoriaInput = document.getElementById("categoriaInput");

    responsavelInput.value = "";
    dataCompraInput.value = "";
    descricaoInput.value = "";
    valorInput.value = "";
    parcelamentoInput.value = "";
    observacaoInput.value = "";
    categoriaInput.value = "";

    // Remove a classe de erro dos campos
    responsavelInput.classList.remove("error");
    dataCompraInput.classList.remove("error");
    valorInput.classList.remove("error");
}