const questions = [
    { question: '¿Qué tipo de aceite es recomendado para un motor Chevrolet de 4 cilindros?', options: ['5W-30', '10W-40', '15W-50'], answer: '5W-30' },
    { question: '¿Cada cuántos kilómetros se debe cambiar el filtro de aire en un Chevrolet?', options: ['10,000 km', '15,000 km', '20,000 km'], answer: '15,000 km' },
    { question: '¿Cuál es la capacidad de aceite de un motor V6 de Chevrolet?', options: ['4 litros', '5.7 litros', '6 litros'], answer: '5.7 litros' },
    { question: '¿Qué tipo de bujías se recomiendan para un Chevrolet Spark?', options: ['Iridio', 'Platino', 'Cobre'], answer: 'Iridio' },
    { question: '¿Cada cuántos kilómetros se debe cambiar la correa de distribución en un Chevrolet?', options: ['60,000 km', '80,000 km', '100,000 km'], answer: '100,000 km' },
    { question: '¿Qué líquido se usa para el sistema de frenos en un Chevrolet?', options: ['DOT 3', 'DOT 4', 'DOT 5'], answer: 'DOT 4' },
    { question: '¿Qué tipo de anticongelante se usa en un motor Chevrolet?', options: ['Rojo', 'Verde', 'Azul'], answer: 'Rojo' },
    { question: '¿Cuántos caballos de fuerza tiene un motor 2.0L de Chevrolet?', options: ['150 hp', '170 hp', '200 hp'], answer: '170 hp' },
    { question: '¿Cuál es la presión adecuada de los neumáticos en un Chevrolet Cruze?', options: ['30 psi', '32 psi', '35 psi'], answer: '32 psi' },
    { question: '¿Qué tipo de transmisión usa un Chevrolet Malibu 2020?', options: ['Manual', 'Automática', 'CVT'], answer: 'Automática' },
];

let currentQuestionIndex = 0;
let score = 0;
let answers = [];

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const answersElement = document.getElementById('answers');
const totalSolesElement = document.getElementById('total-soles');
const sendScoreButton = document.getElementById('send-score');
const restartButton = document.createElement('button');
restartButton.innerText = 'Reiniciar Juego';
restartButton.onclick = restartGame;
resultContainer.appendChild(restartButton);

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(option) {
    const currentQuestion = questions[currentQuestionIndex];
    answers.push({
        selectedAnswer: option,
        correctAnswer: currentQuestion.answer,
        isCorrect: option === currentQuestion.answer
    });
    if (option === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.innerText = `Tu puntaje es: ${score}`;
    totalSolesElement.innerHTML = `
        <div class="moneda1">
            <img src="coin-icon.png" alt="Moneda" class="coin-icon">
            <span>Has obtenido ${score} soles de ganancia, que puedes usar como descuento en tu próxima compra de repuestos.</span>
        </div>
    `;
    answersElement.innerHTML = '<h3>Respuestas</h3>';
    answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.innerHTML = `
            <p>Pregunta ${index + 1}: ${answer.isCorrect ? '<span class="correct-answer">✔ Correcto</span>' : '<span class="incorrect-answer">✖ Incorrecto</span>'}</p>
            <p>Respuesta correcta: ${answer.correctAnswer}</p>
        `;
        answersElement.appendChild(answerElement);
    });
}

sendScoreButton.onclick = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const previousPart = document.getElementById('previous-part').value;
    const isClient = document.getElementById('is-client').value;
    const opinion = document.getElementById('opinion').value;
    const message = `Nombre Completo: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nRepuesto que compró en algún momento: ${previousPart}\n¿Es cliente de Autopartes RL?: ${isClient}\nOpinión corta: ${opinion}\nPuntaje: ${score} soles obtenidos.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=51980927995&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    answers = [];
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion();
}

showQuestion();
