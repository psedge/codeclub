var endpoint = 'https://82hi60j20m.execute-api.eu-west-1.amazonaws.com/prod/token/';

var editor = ace.edit("code");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    autoScrollEditorIntoView: false,
});
document.getElementById('code').style.fontSize = '15px';

var stopped = false;

function stop(disable = true) {
    stopped = true;
    if (disable) document.getElementById("play").disabled = false;
    editor.setReadOnly(false)
}

/**
 * Call to play the code.
 *
 * @param quick     Boolean determines whether we observe wait times
 * @param disable   Boolean determines whether we disable play button
 * @param stickyDisable   Boolean determines whether we disable play button until stopped manually
 * @returns {Promise<void>}
 */
async function playCode(quick = false, disable = true, stickyDisable = true) {
    stop(disable);
    stopped = false;
    if (disable) {
        document.getElementById("play").disabled = true;
    }

    editor.setReadOnly(true);
    lines = editor.getValue().split("\n");
    var depth = 0;
    var block = "";

    for (var line = 0; line < lines.length; line++) {
        if (stopped) {
            stopped = false;
            return
        }

        editor.selection.clearSelection();
        editor.moveCursorTo(line, 0);
        if (lines[line].substring(0, 2) == '//' || lines[line].substring(0, 2) == "") {
            if (!quick) await new Promise(resolve => setTimeout(resolve, 50));
            continue;
        }

        try {
            depth += lines[line].split("{").length - 1;
            depth -= lines[line].split("}").length - 1;
            block += lines[line];
            if (depth !== 0) continue;
            eval(block);
            block = "";
            depth = 0;
        } catch (err) {
            alert(err);
            stop(disable);
            return;
        }
        if (!quick) await new Promise(resolve => setTimeout(resolve, lineWait));
    }
    editor.setReadOnly(false)
    if (disable && stickyDisable) {
        document.getElementById("play").disabled = false;
    }
}

function save() {
    $.ajax({
        type: 'post',
        url: endpoint + $('#username').val() + "-" + $('#week').val(),
        data: editor.getValue(),
        dataType: 'json'
    })
        .done(function (res) {
            console.log('Saved')
        })
        .fail(function (err) {
            console.log(err);
        });
}

document.getElementsByTagName('textarea')[0].onkeydown = function (ev) {
    localStorage.setItem("week" + document.getElementById("board").getAttribute('week'), editor.getValue());
};

$(document).ready(function () {
    if (localStorage.getItem("week" + document.getElementById("board").getAttribute('week')) != null) {
        editor.setValue(localStorage.getItem("week" + document.getElementById("board").getAttribute('week')))
    }
});

function superReset() {
    localStorage.clear()
}

tippy('i', {maxWidth: 500});

async function wait(time) {
    await new Promise(resolve => setTimeout(resolve, time));
}

/* Helper functions */
/**
 * Return a random height within the #display
 * @returns {number}
 */
getRandomHeight = function () {
    return 50 + Math.random() * ($('section#display').height() - 250)
}
/**
 * Return a random width within the #display
 * @returns {number}
 */
getRandomWidth = function () {
    return 50 + Math.random() * ($('section#display').width() - 150)
}

function Generator() {};
Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();
Generator.prototype.getId = function () {
    return this.rand++;
};
var idGen = new Generator();
uniqueId = function () {
    return idGen.getId();
}

