function show_navbar(){
    var title = ""
    for (var key in quiz[0]["answers"]) {
        title += quiz[0]["answers"][key] + "/"
    }
    title = title.substring(0, title.length-1)
    title += ": Quiz"
    $('#title').append($('<a class="navbar-brand">' + title + '</a>'))
}

function show_questions(){
    var output = []

    for(var i = 0; i < quiz.length; i++) {
        var answers = []

        for (letter in quiz[i].answers) {
            answers.push(
                '<label class="btn btn-outline-secondary option">'
                    + '<input type="radio" class="question'+i+'" value="'+letter+'">'
                    + quiz[i].answers[letter]
                + '</label>'
            )
        }

        output.push(
            '<div class="row spaced">' + (i+1) + '. <audio class="sound" src="../static/audio/' + quiz[i].question + '" preload="auto"></audio>'
            + '<button class="button"><i class="material-icons">play_arrow</i></button>'
            + '<div class="btn-group btn-group-toggle answers" data-toggle="buttons">' + answers.join('') + '</div></div>'
        )
    }

    $("#quiz").html(output.join(''))
}

function save_answers(section){
    var answers = []
    $('.answers').each(function(i) {
        var userAnswer = $('input[class=question'+i+']:checked').val()
        answers.push(userAnswer)
    });
    var update = {"section": section, "answers": answers}
    $.ajax({
        type: "POST",
        url: "/update_answers",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(update),
        success: function(result){
            quiz = result["quiz_data"][section]
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function completed(section) {
    var update = {"section": section, "stage": 2}  
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
    show_navbar()
    show_questions()

    $("input").click(function(){
        $(this).prop('checked',true)
        $(this).parent().addClass("active")
        $(this).parent().siblings().each(function() {
            $(this).children().prop('checked',false)
            $(this).removeClass("active")
        });
    })

    $(".button").click(function(){
        $(this).siblings('.sound')[0].play()
    });

    $("#back").click(function(){  
        var cur = String(window.location)
        window.location = cur.substr(0, cur.lastIndexOf('/'))
    });

    $("#home").click(function(){              
        window.location='/home'
    });

    $("#submit").click(function(){
        var section = String(window.location).split("/")[3]
        save_answers(section)
        completed(section)
        window.location='./result'
    })
})