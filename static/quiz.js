function show_navbar(){
    var title = ""
    for (var key in questions[0]["answers"]) {
        title += questions[0]["answers"][key] + "/"
    }
    title = title.substring(0, title.length-1)
    title += ": Quiz"
    $('#title').append($('<a class="navbar-brand">' + title + '</a>'))
}

function show_questions(){
    var output = []

    for(var i = 0; i < questions.length; i++) {
        var answers = []

        for (letter in questions[i].answers) {
            answers.push(
                '<label class="btn btn-outline-secondary option">'
                    + '<input type="radio" class="question'+i+'" value="'+letter+'">'
                    + questions[i].answers[letter]
                + '</label>'
            )
        }

        output.push(
            '<div class="row spaced">' + (i+1) + '. <audio class="sound" src="../static/audio/' + questions[i].question + '" preload="auto"></audio>'
            + '<button class="button"><i class="material-icons">play_arrow</i></button>'
            + '<div class="btn-group btn-group-toggle answers" data-toggle="buttons">' + answers.join('') + '</div></div>'
        )
    }

    $("#quiz").html(output.join(''))
}

function show_results(){
    var numCorrect = 0
    
    $('.answers').each(function(i) {
        $(this).children('.option').removeClass('btn-outline-secondary')
        $(this).children('.option').removeClass('btn-outline-success')
        $(this).children('.option').removeClass('btn-outline-danger')

        var userAnswer = $('input[class=question'+i+']:checked').val()
        if (userAnswer === questions[i].correctAnswer) {
            numCorrect++
            $(this).children('.option').addClass('btn-outline-success')
        } else {
            $(this).children('.option').addClass('btn-outline-danger')
        }
    });

    $("#results").html('You answered ' + numCorrect + ' out of ' + questions.length + ' correctly.')
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

    // $("#back").click(function(){  
    //     var cur = String(window.location)
    //     window.location = cur.substr(0, cur.lastIndexOf('/'))
    // });

    $("#home").click(function(){              
        window.location='/home'
    });

    $("#submit").click(function(){
        show_results()
        completed(String(window.location).split("/")[3])
    })
})