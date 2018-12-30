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
            console.log(err)
        }
        await new Promise(resolve => setTimeout(resolve, lineWait));
    }
    editor.setReadOnly(false)
    document.getElementById("play").disabled = false;
}

