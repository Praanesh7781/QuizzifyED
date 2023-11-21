// Ensure the DOM is ready before executing the script
document.addEventListener('DOMContentLoaded', function () {
  // (Same questions array as in quiz.html)

  // Variables to keep track of the user's answers and score
  let userAnswers = [];
  let userScore = 0;

  // Function to generate and display random questions
  function generateRandomQuestions() {
    const totalQuestions = 50;
    const questionsToDisplay = 20;

    // Shuffle questions array
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Take the first 20 questions
    const selectedQuestions = shuffledQuestions.slice(0, questionsToDisplay);

    // Display questions
    displayQuestions(selectedQuestions);
  }

  // Function to display questions on the webpage
  function displayQuestions(questions) {
    const questionsContainer = document.getElementById("question-container");
    questionsContainer.innerHTML = ""; // Clear previous questions

    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      const questionText = document.createElement("p");
      questionText.innerHTML = `<strong>Question ${index + 1}:</strong> ${q.question}`;
      questionDiv.appendChild(questionText);

      const optionsList = document.createElement("ul");
      q.options.forEach((option, i) => {
        const optionItem = document.createElement("li");
        optionItem.innerHTML = `<label><input type="radio" name="q${index}" value="${i}"> ${option}</label>`;
        optionsList.appendChild(optionItem);
      });

      questionDiv.appendChild(optionsList);
      questionsContainer.appendChild(questionDiv);
    });
  }

  // Function to submit user answers
  function submitAnswers() {
    // Collect user answers
    const questions = document.getElementById("question-container").querySelectorAll(".question");
    userAnswers = Array.from(questions).map((question, index) => {
      const selectedOption = question.querySelector(`input[name="q${index}"]:checked`);
      return selectedOption ? parseInt(selectedOption.value) : -1;
    });

    // Evaluate user's answers
    userScore = evaluateAnswers(userAnswers);

    // Display result
    displayResult(userScore);
  }

  // Function to evaluate user answers
  function evaluateAnswers(answers) {
    // You can implement your logic to evaluate the answers.
    // For now, let's just count the correct answers.
    return answers.reduce((score, answer, index) => {
      const correctAnswer = questions[index].correctAnswer;
      return answer === correctAnswer ? score + 1 : score;
    }, 0);
  }

  // Function to display the result
  function displayResult(score) {
    // Display the result
    alert(`Your score: ${score}/${userAnswers.length}`);
    // Optionally, you can redirect to the recommendations page here
    window.location.href = "/get_recommendations";
  }

  // Call the function to generate random questions when the page loads
  generateRandomQuestions();

  // Bind the submitAnswers function to the button click event
  document.getElementById("submit-button-container").addEventListener("click", submitAnswers);
});
