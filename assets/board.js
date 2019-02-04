var endpoint = 'https://82hi60j20m.execute-api.eu-west-1.amazonaws.com/prod/token/';

var editor = ace.edit("code");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    autoScrollEditorIntoView: false,
});
document.getElementById('code').style.fontSize='15px';

var stopped = false;
function stop() {
    stopped = true;
    document.getElementById("play").disabled = false;
}

// Code play callback
async function playCode() {
    document.getElementById("play").disabled = true;
    
    editor.setReadOnly(true);
    lines = editor.getValue().split("\n");
    var depth = 0;
    var block = "";

    for (var line=0; line<lines.length;line++) {
        if (stopped) { stopped = false; return }

        editor.selection.clearSelection();
        editor.moveCursorTo(line, 0);
        if (lines[line].substring(0, 2) == '//' || lines[line].substring(0,2) == "") {
            await new Promise(resolve => setTimeout(resolve, 50));
            continue;
        }

        try {
            depth += lines[line].split("{").length-1;
            depth -= lines[line].split("}").length-1;
            block += lines[line];
            if (depth !== 0) continue;
            eval(block);
            block = "";
            depth = 0;
        } catch (err) {
            alert(err)
        }
        await new Promise(resolve => setTimeout(resolve, lineWait));
    }
    editor.setReadOnly(false)
    document.getElementById("play").disabled = false;
}

function save() {
    $.ajax({type: 'post', url: endpoint + $('#username').val() + "-" + $('#week').val(), data: editor.getValue(), dataType: 'json'})
        .done(function(res) {
            console.log('Saved')
        })
        .fail(function (err) {
            console.log(err);
        });
}

$('textarea').change(function() {
    localStorage.setItem("code", editor.getValue());
});

$(document).ready(function() {
    if (localStorage.getItem("code") != null) {
        editor.setValue(localStorage.getItem('code'))
    }
});
