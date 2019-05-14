function show_progress(){
    for (var section in progress) {
        var section_element = $("#" + section)
        if (progress[section] == 1) {
            section_element.removeClass("btn-outline-secondary")
            section_element.addClass("btn-outline-warning")
            section_element.parent().siblings('.label').append($('<div class="in-progress">In Progress</div>'))
        } else if (progress[section] == 2) {
            section_element.removeClass("btn-outline-secondary")
            section_element.addClass("btn-outline-success")
            section_element.parent().siblings('.label').append($('<div class="completed">Completed<button class="btn btn-success result" id="' + section + '-result" title="Review quiz result"><i class="material-icons">assessment</i></button></div>'))
        }
    }
}

function in_progress(section) {
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
    show_progress()

    $("#bp").click(function(){
        if (progress["bp"] == 0) {
            in_progress("bp") 
        }             
        window.location='/bp';
    })

    $("#sj").click(function(){    
        if (progress["sj"] == 0) {
            in_progress("sj") 
        }            
        window.location='/sj';
    })

    $("#dt").click(function(){ 
        if (progress["dt"] == 0) {
            in_progress("dt") 
        }                
        window.location='/dt';
    })

    $("#gk").click(function(){ 
        if (progress["gk"] == 0) {
            in_progress("gk") 
        }                
        window.location='/gk';
    })

    $("#bp-result").click(function(){
        window.location='/bp/result'
    })

    $("#sj-result").click(function(){
        window.location='/sj/result'
    })

    $("#dt-result").click(function(){
        window.location='/dt/result'
    })

    $("#gk-result").click(function(){
        window.location='/gk/result'
    })
})