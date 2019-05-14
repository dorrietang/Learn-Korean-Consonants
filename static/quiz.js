function show_title(){
    $('#title').append($('<a class="navbar-brand font-title">Quiz: ' + info["slash"] + '</a>'))
}

function show_instructions(part) {
    if (part == 1) {
        $("#instructions").append($('<span class="font">Listen to each <b>consonant</b> and select the one that you hear.</span>'))
    } else {
        $("#instructions").append($('<span class="font">Listen to each <b>word</b> and select the consonant you hear used in each one.</span>'))
    }
}

function show_questions(part){
    var output = []

    for (var i = 0; i < quiz.length/2; i++) {
        var num = i + (parseInt(part)-1)*5
        var answers = []

        for (letter in info["options"]) {
            answers.push(
                '<label class="btn btn-outline-secondary">'
                    + '<input type="radio" class="question'+num+'" value="'+letter+'">'
                    + info["options"][letter]
                + '</label>'
            )
        }

        output.push(
            '<div class="row spaced-vert"><div class="col-md-12 text-center font">' + (num+1) + '. <audio src="../../static/audio/' + quiz[num].question + '" preload="auto"></audio>'
            + '<button class="play-button"><i class="material-icons">play_arrow</i></button>'
            + '<div class="btn-group btn-group-toggle answers" data-toggle="buttons">' + answers.join('') + '</div></div></div>'
        )
    }

    $("#quiz").html(output.join(''))
}

function show_selected(part){
    $('input').each(function(i) {
        var options = Object.keys(info["options"])
        var num = Math.floor(i/options.length) + (parseInt(part)-1)*5
        
        if (options[i%options.length] == quiz[num]["userAnswer"]) {
            $(this).prop('checked',true)
            $(this).parent().addClass("active")
        }
    });
}

function show_ending(part) {
    if (part == 1) {
        $("#ending").append($('<button class="btn btn-secondary font-title" id="next">Next Part ></button>'))
    } else {
        $("#ending").append($('<button class="btn btn-outline-secondary font-title" id="prev">< Prev Part</button>'))
        $("#ending").append($('<button class="btn btn-secondary font-title" id="submit">Submit</button>'))
    }
}

function save_answers(section, part){
    var answers = []
    $('.answers').each(function(i) {
        var num = i + (parseInt(part)-1)*5
        var userAnswer = $('input[class=question'+num+']:checked').val()
        answers.push(userAnswer)
    });
    var update = {"section": section, "part": part, "answers": answers}
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

function clear_answers(section){
    var answers = []
    for (var i = 0; i < quiz.length/2; i++) {
        answers.push('')
    }
    var update = {"section": section, "part": "3", "answers": answers}
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
    var section = String(window.location).split("/")[3]
    var part = String(window.location).split("/")[5]
    show_title()
    show_instructions(part)
    show_questions(part)
    show_selected(part)
    show_ending(part)

    $("input").click(function(){
        $(this).prop('checked',true)
        $(this).parent().addClass("active")
        $(this).parent().siblings().each(function() {
            $(this).children().prop('checked',false)
            $(this).removeClass("active")
        });
    })

    $(".play-button").click(function(){
        $(this).siblings('audio')[0].play()
    });

    $("#review").click(function(){  
        clear_answers(section)
        var cur = String(window.location)
        window.location = cur.substr(0, cur.lastIndexOf('/quiz'))
    });

    $("#home").click(function(){    
        clear_answers(section)          
        window.location='/'
    });

    $("#prev").click(function(){
        save_answers(section, part)
        window.location='./1'
    })

    $("#next").click(function(){
        save_answers(section, part)
        window.location='./2'
    })

    $("#submit").click(function(){
        save_answers(section, part)
        completed(section)
        window.location='../result'
    })
})