var editor = ace.edit("code");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    autoScrollEditorIntoView: false,
});
document.getElementById('code').style.fontSize='15px';

// Code play callback
async function play() {
    editor.setReadOnly(true);
    lines = editor.getValue().split("\n");
    var depth = 0;
    var block = "";

    for (var line=0; line<lines.length;line++) {
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
        await new Promise(resolve => setTimeout(resolve, 450));
    }
    editor.setReadOnly(false)
}