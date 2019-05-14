function get_ling(desc){
    var info = "<b>Linguistic terminology</b><br>"
    var pts = desc.toLowerCase().split(" ")
    for (var i in pts) {
        var parts = pts[i].split("/")
        for (var j in parts) {
            var term = parts[j]
            info += "<i>" + term + "</i>: " + ling[term] + "<br>"
        }
    }
    return info
}

function show_navbar(){
    var title = "";
    for (var i = 0; i < data.length; i++) {
        title += data[i]["consonant"]
        if (i < data.length-1) {
            title += "/"
        }
    }
    title += ": Learn"
    $('.navbar').prepend($('<a class="navbar-brand">' + title + '</a>'))
}

function show_content(has_results){
    for (var i = 0; i < data.length; i++) {
        var cons_info = $('<div class="row spaced">')

        var div_1 = $('<div class="col-md-3">')
        div_1.append($('<img class="border" src="../static/images/' + data[i]["image"] + '">'))
        cons_info.append(div_1)

        var div_2 = $('<div class="col-md-8">')
        var row_1 = $('<div class="row">')
        row_1.append($('<audio class="sound" src="../static/audio/' + data[i]["sound"] + '" preload="auto"></audio>'))
        row_1.append($('<span class="desc"><button class="button"><i class="material-icons play-icon">play_arrow</i></button></span><span>' + data[i]["description"] + '</span>'))
        var ling = $('<div class="ling">')
        ling.append($('<span class="italic">Ling. </span>'))
        ling.append($('<span>' + data[i]["linguistic"] + '</span>'))
        ling.append($('<button type="button" class="btn btn-secondary info" data-container="body" data-toggle="popover" data-placement="right" data-html="true" data-trigger="hover" data-content="' + get_ling(data[i]["linguistic"]) + '">i</button>'))
        row_1.append(ling)
        var row_2 = $('<div class="row">')
        var collapsible = $('<div class="collapsible">')
        collapsible.append($('<div>See examples</div>'))
        var ex = $('<div>')
        for (var j = 0; j < data[i]["examples"].length; j++) {
            var one_ex = $('<div class="row">')

            var ex_div_1 = $('<div class="col-md-4">')
            ex_div_1.append($('<img class="border" src="../static/images/' + data[i]["examples"][j]["image"] + '">'))
            one_ex.append(ex_div_1)

            var ex_div_2 = $('<div class="col-md-8">')
            var ex_row = $('<div class="row">')
            ex_row.append($('<audio class="sound" src="../static/audio/' + data[i]["examples"][j]["sound"] + '" preload="auto"></audio>'))
            ex_row.append($('<span class="desc"><button class="button"><i class="material-icons play-icon">play_arrow</i></button></span><span>"' + data[i]["examples"][j]["pronunciation"] + '"</span>'))
            ex_div_2.append(ex_row)
            if (data[i]["examples"][j]["meaning"] != "") {
                ex_div_2.append($('<div class="row meaning">(<span class="italic meaning-text">meaning:</span><span>' + data[i]["examples"][j]["meaning"] + '</span>)</div>'))
            }
            one_ex.append(ex_div_2)

            ex.append(one_ex)
        }
        collapsible.append(ex)
        row_2.append(collapsible)
        div_2.append(row_1)
        div_2.append(row_2)
        cons_info.append(div_2)
        
        $('#content').append(cons_info)
    }

    if (has_results) {
        $("#next").append($('<button class="btn btn-secondary" id="btn-wrapper"><i class="material-icons icon">assessment</i><span class="test-text">Review your quiz results</span></button>'))
    } else {
        var str = "I'm ready to test my progress!"
        $("#next").append($('<button class="btn btn-secondary" id="btn-wrapper"><i class="material-icons icon">create</i><span class="test-text">' + str + '</span></button>'))
    }
}

$(document).ready(function(){
    var section = String(window.location).split("/")[3]
    var has_results = (progress[section] === 2)

    show_navbar()
    show_content(has_results)

    $(".button").click(function(){
        $(this).parent().siblings('.sound')[0].play();
    });

    $( ".collapsible" ).accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    $("#btn-wrapper").click(function(){
        if (has_results) {
            window.location=window.location + '/result';
        } else {
            window.location=window.location + '/quiz';
        }             
    });

    $("#home").click(function(){              
        window.location='/home';
    });

    $('.info').popover()
});
