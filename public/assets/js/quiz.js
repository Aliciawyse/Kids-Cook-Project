// ==========================================
// QUIZ PAGE
// ==========================================

var displayQuestion = 0;

//use an object to grade how well user does in each category. Highest score for each category is 5.
var categories = {
    "vegetables": 0,
    "fruits": 0,
    "whole grains": 0,
    "healthy protein": 0,
    "water": 0
};

//Use this variable to grade how well user scored overall
var totalPoints = 0;

var myListofQuestions = [

    {
        question: "Did your child eat vegetables today?",
        choices: ["No", "Yes"],
        addPoints: [1,0],
        category: "vegetables"
    },

    {
        question: "Has your kid eaten any fruits?",
        choices: ["No", "Yes"],
        addPoints: [1,0],
        category: "fruits"
    },

    {
        question: "Did your family eat whole grains today?",
        choices: ["No", "Yes"],
        addPoints: [1,0],
        category: "whole grains"
    },

    {
        question: "Do feel like your child had enough healthy protein?",
        choices: ["No", "Yes"],
        addPoints: [1,0],
        category: "healthy protein"
    },

    {
        question: "Did your kid have 8 glasses of water today?",
        choices: ["No", "Yes"],
        addPoints: [1,0],
        category: "water"
    }
    ];

showQuestion();

function showQuestion() {


    myQuestion = "";

    myQuestion = myQuestion + "<p class='bold center_q'>" + myListofQuestions[displayQuestion].question + "</p>";

    myListofQuestions[displayQuestion].choices.forEach(function(choice) {
        myQuestion += "<input type='radio' id='" + choice + "' name='" + displayQuestion + "' value='" + choice + "' + class='selectable'><label for='" + choice + "' class='option-input'>" + choice + "</label><br>";
    });

    $("#quiz").html(myQuestion);

    $(".selectable").on("click", function() {

       // var counter = 0;
        var index = $("input").index(this);

        //counter =+ ;

        processQuestion(index);

    });
}

var results = [];
var counter = 0;
var quizResults = {};


function processQuestion(idx) {

    var pointsToAdd = myListofQuestions[displayQuestion].addPoints[idx];

    var thisCategory = myListofQuestions[displayQuestion].category;

    var currCategoryTotal = categories[thisCategory];

    totalPoints += pointsToAdd;

    categories[thisCategory] = currCategoryTotal + pointsToAdd;

    if (displayQuestion < myListofQuestions.length - 1) {

        results.push({
            answers: myListofQuestions[displayQuestion].choices[idx],
            question: myListofQuestions[displayQuestion].questionn
        });

        quizResults[myListofQuestions[displayQuestion].question] = myListofQuestions[displayQuestion].choices[idx];

        counter++;
        displayQuestion++;
        showQuestion();

    } else {

        $("#quizWrapper").toggleClass("hidden");
        $("#resultsWrapper").toggleClass("hidden");


        console.log("Results object", results);
        //console.log("Quiz Results with corresponding answers", quizResults);
        console.log("Score per category", categories);

       console.log("new categories", categories);

        // Send the GET request.
        $.get("/results").then(function(results) {
                console.log("great!");
            }
        );

        console.log("Total points (the user's grade for how well they feed their kid)", totalPoints);

        var userEmail = window.localStorage.getItem("userEmail");

        console.log("userEmail", userEmail);


    }
}