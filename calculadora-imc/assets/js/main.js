
function calcularIMC() {
    // Obter os valores de peso e altura inseridos pelo usuário
    let pesoInput = document.getElementById('pesoInput');
    let alturaInput = document.getElementById('alturaInput');
    let peso = parseFloat(pesoInput.value);
    let altura = parseFloat(alturaInput.value);

    // Verificar se os valores inseridos são válidos
    if (isNaN(peso) || isNaN(altura)) {
        alert("Por favor, insira valores numéricos para peso e altura.");
        return;
    }

    // Calcular o IMC
    const imc = peso / Math.pow(altura, 2);

    // Exibir o resultado na página
    let resultado = document.getElementById('resultadoIMC');
    resultado.textContent = imc.toFixed(1);

    let classificacao = document.getElementById('classificacao');

    if (imc < 18.5) {
        classificacao.textContent = ' Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        classificacao.textContent = ' Normal';
    } else if (imc >= 25 && imc < 30) {
        classificacao.textContent = ' Sobrepeso grau 1';
    } else if (imc >= 30 && imc < 40) {
        classificacao.textContent = ' Obesidade grau 2';
    } else {
        classificacao.textContent = ' Obesidade grau 3';
    }

    // Esconder o botão "Calcular"
    let calcularBtn = document.getElementById('calcularBtn');
    calcularBtn.style.display = 'none';

    // Mostrar o botão "Novo Cálculo"
    let novoCalculoBtn = document.getElementById('novoCalculoBtn');
    novoCalculoBtn.style.display = 'block';

    let resultadoIMC = document.getElementById('resultado');
    resultadoIMC.style.display = 'block';
}

function novoCalculo() {
    // Limpar os campos de entrada e resultado
    let pesoInput = document.getElementById('pesoInput');
    let alturaInput = document.getElementById('alturaInput');
    let resultado = document.getElementById('resultadoIMC');

    pesoInput.value = '';
    alturaInput.value = '';
    resultado.textContent = '';

    // Esconder o botão "Novo Cálculo"
    let novoCalculoBtn = document.getElementById('novoCalculoBtn');
    novoCalculoBtn.style.display = 'none';

    // Mostrar o botão "Calcular"
    let calcularBtn = document.getElementById('calcularBtn');
    calcularBtn.style.display = 'block';

    let resultadoIMC = document.getElementById('resultado');
    resultadoIMC.style.display = 'none';
}