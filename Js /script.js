const pcPartsBtn = document.getElementById('pcPartsBtn');
const pcQuestionsBtn = document.getElementById('pcQuestionsBtn');
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const resultMessage = document.getElementById('resultMessage');
const playAgainBtn = document.getElementById('playAgainBtn');
const resultContainer = document.querySelector('.result');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

// game variables
let currentCategory = []; // store the selected category questions
let currentQuestionIndex = 0; // tracks the current question number
let score = 0; // stores the player score
//

//function to start quiz
function startQuiz(category) {
  currentCategory = quizData[category]; // gets the quiz data
  currentQuestionIndex = 0;//resets the question index
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
  quizContainer.classList.remove('hidden');// shows quiz
  quizContainer.classList.add('visible');
  resultContainer.classList.remove('visible');
  resultContainer.classList.add('hidden');
  showQuestion();// Diplays the first question
}
// Check showQuestion
function showQuestion() {
// get the current question obj
  const question = currentCategory[currentQuestionIndex];
  questionElement.textContent = question.question; // display question text
  optionsElement.innerHTML = ''; //clears for prev. option
  question.options.forEach(option => {
    const button = document.createElement('button');// loop through answer and choice
    button.textContent = option; // button fo answer choice
    button.addEventListener('click', () => checkAnswer(option));
    optionsElement.appendChild(button);
  });
}
// Check Answer
function checkAnswer(selectedOption) {
  const question = currentCategory[currentQuestionIndex];
  // check if selected option is the correct answer
  if (selectedOption === question.answer) {
    score++; // increase score for correct answer
    correctSound.play(); // play correct answer sound
  } else {
    wrongSound.play(); // play incorrect answer sound
  }
  // update score display
  scoreElement.textContent = `Score: ${score}`;

  // move to the next question
  currentQuestionIndex++;

  // if there are more questions, shw the next one, else end the quiz
  if (currentQuestionIndex < currentCategory.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Check endQuiz
function endQuiz() {
    // hide the quiz and show the results
    quizContainer.classList.remove('visible');
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('visible');
  
    // display final score message
    resultMessage.textContent = `Quiz Over! Your final score is ${score}/${currentCategory.length}`;
  }
  
  // event listener for "Play Again" button to restart the quiz
  playAgainBtn.addEventListener('click', () => {
    resultContainer.classList.remove('visible');
    resultContainer.classList.add('hidden');
    startQuiz(currentCategory === quizData.pcParts ? 'pcParts' : 'pcQuestions');
  });
  
  // event listeners for category buttons
  pcPartsBtn.addEventListener('click', () => startQuiz('pcParts')); // start "PC Parts" quiz
  pcQuestionsBtn.addEventListener('click', () => startQuiz('pcQuestions')); // start "PC Questions" quiz