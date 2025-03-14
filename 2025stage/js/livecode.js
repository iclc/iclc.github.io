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
			exec: function(editor) {
				closeEditor();
			}
		});
	}
);

function openEditor() {
	let editorDiv = document.querySelector('#editor');
	editorDiv.style.display = 'block';
};

function closeEditor() {
	let editorDiv = document.querySelector('#editor');
	editorDiv.style.display = 'none';
}
