// script.js
function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').style.display = 'block';
}

function calculateResult() {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    const resultImage = document.getElementById('resultImage');
    const resultDescription = document.getElementById('resultDescription');

    const answers = {
        'Радость': 0,
        'Печаль': 0,
        'Гнев': 0,
        'Страх': 0,
        'Брезгливость': 0
    };

    // Проверяем, что на все вопросы даны ответы
    const formData = new FormData(form);
    let unansweredQuestions = false;
    for (let i = 1; i <= 15; i++) {
        if (!formData.get(`q${i}`)) {
            unansweredQuestions = true;
            break;
        }
    }

    if (unansweredQuestions) {
        alert('Пожалуйста, ответьте на все вопросы.');
        return;
    }

    // Собираем ответы
    formData.forEach((value) => {
        if (answers[value] !== undefined) {
            answers[value]++;
        }
    });

    // Определяем максимальное количество ответов
    let max = 0;
    let result = '';
    for (const [key, value] of Object.entries(answers)) {
        if (value > max) {
            max = value;
            result = key;
        }
    }

    // Показать результат и соответствующее изображение
    if (result) {
        resultDiv.innerHTML = `<span class="result-text">Ты: ${result}</span>`;
        switch (result) {
            case 'Радость':
                resultImage.src = 'images/joy.jpg';
                resultDescription.innerHTML = 'Ты – Радость! Ты всегда стараешься найти позитив во всем, и твоя энергия заряжает окружающих.';
                break;
            case 'Печаль':
                resultImage.src = 'images/sadness.jpg';
                resultDescription.innerHTML = 'Ты – Печаль! Ты глубоко чувствуешь эмоции и умеешь поддержать других в трудные времена.';
                break;
            case 'Гнев':
                resultImage.src = 'images/anger.jpg';
                resultDescription.innerHTML = 'Ты – Гнев! Ты прямолинеен и всегда борешься за свои убеждения, даже если это может вызвать конфликты.';
                break;
            case 'Страх':
                resultImage.src = 'images/fear.jpg';
                resultDescription.innerHTML = 'Ты – Страх! Ты осторожен и всегда думаешь наперед, стараясь избежать опасностей и неопределенности.';
                break;
            case 'Брезгливость':
                resultImage.src = 'images/disgust.jpg';
                resultDescription.innerHTML = 'Ты – Брезгливость! Ты всегда следишь за чистотой и не переносишь, когда что-то не по твоим стандартам.';
                break;
        }

        document.getElementById('quizScreen').style.display = 'none';
        document.getElementById('resultScreen').style.display = 'block';
    }
}

function restartQuiz() {
    document.getElementById('resultScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('quizForm').reset();
}
