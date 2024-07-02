const appBar = new AppBar();

const toolsBar = new ToolsBar();

const workplace = new Workplace(1920, 1080);

toolsBar.onChange = newToolSelected;

appBar.onColorChange = (color) => {
    const tool = toolsBar.getSelectedTool();
    tool.color = color;
    newToolSelected(tool);
}

appBar.onSizeChange = (size) => {
    const tool = toolsBar.getSelectedTool();
    tool.size = size;
    newToolSelected(tool);
}

appBar.onReset = () => {
    workplace.reset();
}

appBar.onSave = () => {
    const img = workplace.canvasController.getImg();
    const a = document.createElement('a');
    a.download = (new Date()).toUTCString() + '.png';
    a.href = img;
    a.click();
}

function newToolSelected(selectedTool) {
    appBar.setColorPickerVisibility(selectedTool.selectableColor, selectedTool.color);
    appBar.setSizeInputVisibility(selectedTool.resizable, selectedTool.size);


    workplace.setSelectedTool(selectedTool);
}

window.addEventListener('keydown', (e) => {
    workplace.onKeyPress(e);
});

window.addEventListener('wheel', (e) => {
    const tool = toolsBar.getSelectedTool();

    if (!tool.resizable) {
        return;
    }

    appBar.setSize(e.deltaY > 0 ? tool.size++ : tool.size--);

    newToolSelected(tool);
});

newToolSelected(toolsBar.getSelectedTool());