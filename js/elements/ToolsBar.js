


class ToolsBar {
    constructor() {
        this.container = document.getElementById('toolsBar');
        const toolsContainer = document.createElement('ul');
        this.selectedTool = null;
        this.onChange = null;

        for (const key of Object.keys(tools)) {
            const tool = document.createElement('li');
            tool.classList.add('clickable');
            if (key == "select") {
                tool.classList.add('selected');
                this.selectedTool = {
                    tool: tools[key],
                    element: tool,
                };
            }
            tool.title = key;
            tool.onclick = () => {
                this.handleToolSelected(tool, key);
            }
            tool.appendChild(getIcon(tools[key].icon));

            toolsContainer.appendChild(tool);
        }

        toolsContainer.appendChild(document.createElement('hr'));

        const tool = document.createElement('li');
        tool.classList.add('clickable');
        tool.title = "theme";

        tool.onclick = () => {
            this.themeToggle(tool);
        }
        tool.appendChild(getIcon('light'));
        toolsContainer.appendChild(tool);
        this.container.appendChild(toolsContainer);
    }

    handleToolSelected(element, name) {
        this.selectedTool.element.classList.remove('selected');
        element.classList.add('selected');
        this.selectedTool = {
            tool: tools[name],
            element,
        };

        this.onChange && this.onChange(this.getSelectedTool())
    }

    themeToggle(tool) {
        const body = document.querySelector('body');
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');

            tool.innerHTML = "";
            tool.appendChild(getIcon('dark'));
        } else {
            body.classList.add('dark');
            tool.innerHTML = "";
            tool.appendChild(getIcon('light'));
        }
    }

    getSelectedTool() {
        return this.selectedTool.tool;
    }

    toggleVisibility() {
        this.container.style.display = this.container.style.display == 'none' ? "flex" : 'none';
    }
}

