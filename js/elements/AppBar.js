


class AppBar {
    constructor() {
        this.colorPicker = document.querySelector('#colorPicker');
        this.sizeInput = document.querySelector('#sizeInput');
        this.resetButton = document.querySelector('#resetButton');
        this.saveButton = document.querySelector('#saveButton');
        this.onColorChange = null;
        this.onSizeChange = null;
        this.onSave = null;
        this.onReset = null;
        this.init()
    }

    init() {
        this.colorPicker.querySelector('input').oninput = (e) => {
            this.onColorChange && this.onColorChange(e.currentTarget.value);
        };

        this.sizeInput.querySelector('input').addEventListener('input', (e) => {
            this.onSizeChange && this.onSizeChange(e.currentTarget.value);
        })

        this.resetButton.addEventListener('click', (_) => {
            this.onReset?.call();
        })

        this.saveButton.addEventListener('click', (_) => {
            this.onSave?.call();
        })
    }

    setColorPickerVisibility(visible, value = null) {
        if (visible) {
            this.setColor(value);
            this.colorPicker.style.display = "flex";
        } else {
            this.colorPicker.style.display = "none";
        }
    }

    setSizeInputVisibility(visible, value = null) {
        if (visible) {
            if (value) {
                this.setSize(value);
            }

            this.sizeInput.style.display = "flex";
        } else {
            this.sizeInput.style.display = "none";
        }
    }

    setColor(color) {
        if (color) {
            this.colorPicker.querySelector('input').value = color;
        }
    }

    setSize(size) {
        size = size < 1 ? 1 : size;
        this.sizeInput.querySelector('input').value = size;
    }
}