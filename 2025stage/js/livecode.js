let request = new Request("js/logo.js");
fetch(request).then((response) => response.text())
    .then((text) => {
        let editor = ace.edit("editor");
        editor.session.setValue(text);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        editor.commands.addCommand({
            name: 'recompile',
            bindKey: {win: 'Ctrl-Return',  mac: 'Command-Return'},
            exec: function(editor) {
                // eval is evil, but so am I >:D
                eval?.(editor.getValue());
                setup();
            }
        });
        editor.commands.addCommand({
            name: 'close',
            bindKey: {win: 'Esc',  mac: 'Esc'},
            exec: function(editor) { editor.close(); }
        });

        editor.close = function () {
            this.container.classList.add('hidden');
        };

        // define it here just so we have access to the editor object
        window.openEditor = function() {
            let editorDiv = editor.container;
            if (!editorDiv.closeButton) {
                let icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-square-xmark', 'fa-xl');

                editorDiv.closeButton = document.createElement('a');
                editorDiv.closeButton.onclick = function () { editor.execCommand('close'); };
                editorDiv.closeButton.classList.add('close-button');

                editorDiv.closeButton.append(icon);
                editorDiv.prepend(editorDiv.closeButton);
            }
            editorDiv.classList.remove('hidden');
        };
    });
