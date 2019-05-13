$(document).ready(function(){
    $("#ㅂ_button").click(function(){
        $('#ㅂ_sound')[0].play();
    });

    $("#ㅃ_button").click(function(){
        $('#ㅃ_sound')[0].play();
    });

    $("#ㅍ_button").click(function(){
        $('#ㅍ_sound')[0].play();
    });
    
    $("#quiz").click(function(){              
        window.location='/bp_quiz';
    });

    $("#home").click(function(){              
        window.location='/';
    });

    $( "#collapsible" ).accordion({
        collapsible: true,
        active: false
    });
})