function buildUI() {
  let uiContainer = select("#ui-container"); // Select the div

  createP().parent(uiContainer);

  let a_button = createButton("TOGGLE BN");
  a_button.mousePressed(function () {
    toggleFilters = !toggleFilters;
  });
  a_button.parent(uiContainer); // Attach to div

  let recreate = createButton("REDRAW");
  recreate.mousePressed(function () {
    createTiles();
  });
  recreate.parent(uiContainer);

  let editor = ace.edit("editor");
  let request = new Request("js/logo.js");
  fetch(request).then((response) => response.text())
    .then((text) => { editor.session.setValue(text); });
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.commands.addCommand({
    name: 'recompile',
    bindKey: {win: 'Ctrl-Return',  mac: 'Command-Return'},
    exec: function(editor) {
			// eval is evil, but so am I >:D
			eval?.(editor.getValue());
    }
  });

  let editButton = createButton("TOGGLE EDITOR");
  editButton.mousePressed(function () {
    let editorDiv = document.querySelector('#editor');
    editorDiv.style.display = editorDiv.style.display == 'block' ? 'none' : 'block';

  });
  editButton.parent(uiContainer);


  createP().parent(uiContainer);
  createSpan("TYPOGRAPHY RESOLUTION ").parent(uiContainer);
  sampleFactor = createSlider(0.0, 1.0, 0.18, 0.01).parent(uiContainer);

  createP().parent(uiContainer);
  createSpan("MOSAIC MAX SLIDES").parent(uiContainer);
  mosaicMaxSides = createSlider(6, 20, 6, 1).parent(uiContainer);

  createP().parent(uiContainer);
  createSpan("MOUSE DIASPORA STRENGTH").parent(uiContainer);
  mouseDiaspora = createSlider(10, 220, 65, 1).parent(uiContainer);

  createP().parent(uiContainer);
  createSpan("MIN MOSAIC SIZE").parent(uiContainer);
  minMosaicSize = createSlider(1, 100, 5, 1).parent(uiContainer);

  createP().parent(uiContainer);
  createSpan("MAX MOSAIC SIZE").parent(uiContainer);
  maxMosaicSize = createSlider(1, 100, 15, 1).parent(uiContainer);
}
