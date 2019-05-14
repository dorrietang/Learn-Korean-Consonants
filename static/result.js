function show_title(section){
    $('#title').append($('<a class="navbar-brand">Quiz Results: ' + info[section]["slash"] + '</a>'))
}

function clear_answers(section){
    var answers = []
    $('.answers').each(function(i) {
        answers.push('')
    });
    var update = {"section": section, "answers": answers}
    $.ajax({
        type: "POST",
        url: "/update_answers",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(update),
        success: function(result){
            quiz = result["quiz"][section]
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function show_results(section){
    var numCorrect = 0
    
    for (var i = 0; i < quiz.length; i++) {
        if (quiz[i].userAnswer != quiz[i].correctAnswer) {
            var q_info = $('<div class="row small-spaced">')
            q_info.append($('<audio src="../static/audio/' + quiz[i].question + '" preload="auto"></audio>'))
            q_info.append($('<div class="col-md-2 btn-wrapper"><button class="play-button"><i class="material-icons play-icon">play_arrow</i><div>'))
            q_info.append($('<div class="col-md-3">Your answer: </div>'))
            if (quiz[i].userAnswer == null) {
                q_info.append($('<div class="col-md-2">(blank)</div>'))
            } else {
                q_info.append($('<div class="col-md-2">' + info[section]["options"][quiz[i].userAnswer] + '</div>'))
            }
            q_info.append($('<div class="col-md-3">Correct answer: </div>'))
            q_info.append($('<div class="col-md-2">' + info[section]["options"][quiz[i].correctAnswer] + '</div>'))
            $("#results").append(q_info)
        }

        if (quiz[i].userAnswer === quiz[i].correctAnswer) {
            numCorrect++
        }
    }

    if (numCorrect != quiz.length) {
        $("#results").prepend('<div class="large-spaced">Summary of mistakes:</div>')
    }
    $("#results").prepend('<div class="large-spaced">You answered ' + numCorrect + ' out of ' + quiz.length + ' questions correctly.</div>')
    if (numCorrect === quiz.length) {
        $("#results").prepend('<div class="large-spaced">Congratulations!</div>')
    } else if (numCorrect < quiz.length/2) {
        $("#results").prepend('<div class="large-spaced">Needs more work...</div>')
    } else {
        $("#results").prepend("<div class='large-spaced'>You're getting there</div>")
    }
}

function reset(section) {
    var update = {"section": section, "stage": 1}  
    $.ajax({
        type: "POST",
        url: "/update_progress",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(update),
        success: function(result){
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    var section = String(window.location).split("/")[3]
    show_title(section)
    show_results(section)

    $(".play-button").click(function(){
        $(this).parent().siblings('audio')[0].play()
    });

    $("#back").click(function(){  
        var cur = String(window.location)
        window.location = cur.substr(0, cur.lastIndexOf('/'))
    });

    $("#home").click(function(){              
        window.location='/'
    });

    $("#redo").click(function(){
        clear_answers(section)
        reset(section)
        window.location="./quiz"
    });
})