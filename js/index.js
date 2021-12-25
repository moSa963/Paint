var toolSelected = tools["select"];
var canvasControler = null;
var canvasContainer = null;

window.onload = ()=>{
    canvasControler = new CanvasControler(document.getElementById("mainCanv"), document.getElementById("bufferCanv"));
    canvasContainer = new ElementControler(document.getElementById('canvasContainer'));

    //show/hide the tool bar
    document.getElementById('toolBarControler')
    .onclick = ()=>{
        var toolbar = document.getElementById("toolBar");
        var state = toolbar.style.display;

        if (state == "none"){
            toolbar.style.display = "flex";
        }else{
            toolbar.style.display = "none";
        }
    };

    //user click on a tool
    document.querySelector(".tools")
    .querySelectorAll("li").forEach(tool=>{
        tool.onclick = (event)=>{
            var target = event.currentTarget;
            unselectAllTools();
            target.classList.add("selected");
            toolSelected = tools[target.id];
            newToolSelected();
        };
    });

    //user select a color
    document.querySelector("#colorPicker").querySelector('input')
        .oninput = (event)=>{

            if (toolSelected.colorSelect){
                toolSelected.color = event.currentTarget.value;
                canvasControler.setData(toolSelected);
            }
        };

    //user change the tool size
    document.querySelector("#size").querySelector('input')
        .onchange = (event)=>{
            if (event.currentTarget.value >= 0 && toolSelected.sizeSelect){
                toolSelected.size = event.currentTarget.value;

                canvasControler.setData(toolSelected);
            }
        };

    //user reset the canvas
    document.querySelector("#reset")
        .onclick = ()=>{
            canvasControler.reset();
        };


    //user download the canvas as image
    document.querySelector("#save").onclick = (event)=>{
            var img = canvasControler.getImg();
            event.currentTarget.querySelector('a').href = img;
        };


    document.querySelector('#info')
        .onclick = ()=>{
            document.querySelector('#information').style.display = 'flex';
        };

    document.getElementById('modeRange')
        .onchange = (event)=>{
            var cssMode = document.getElementById('cssMode');
            if (event.currentTarget.value == 1){
                cssMode.href = 'stylesheet/darkTheme.css';
            }else{
                cssMode.href = 'stylesheet/lightTheme.css';   
            }
        };


    document.getElementById("canvasContainer").onmousedown = onMouseClick_canvas;
    document.getElementById("workplace").onmousedown = onMouseClick_workplace;
    document.getElementById("workplace").onmouseenter = mouseEnter_workplace;
    document.getElementById("workplace").onmouseleave = mouseLeave_workplace;
    document.getElementById("workplace").onmousemove = mouseMove_workplace;
    document.getElementById('workplace').onwheel = (event) => onWheel(Math.floor(event.deltaY));
    window.addEventListener('mouseup', onMouseRelese);

    window.addEventListener('mousemove', (event)=>{
        if (mouseHold){
            onMouseHold(event);
        }
    });


    window.onkeydown = (event) => keyClicked(event.key);
    window.onkeyup = (event) => keyUp(event.key);


    document.querySelector('.cardExit').onclick = () => document.querySelector('.layer').style.display = 'none';




    newToolSelected();
};


function unselectAllTools(){
    var selected = document.getElementById("toolBar")
    .querySelectorAll(".selected");

    selected.forEach(element=>{
        element.classList.remove("selected");
    });
}


function newToolSelected(){
    const size = document.querySelector('#size');

    //if the tool resizable show the resize option
    if (toolSelected.sizeSelect){
        size.style.display = "flex";
        size.querySelector('input').value = toolSelected.size;

    }else{
        size.style.display = "none";
    }

    const colorPicker = document.querySelector('#colorPicker');

    if (toolSelected.colorSelect){
        colorPicker.style.display = "flex";
        colorPicker.querySelector('input').value = toolSelected.color;
    }else{
        colorPicker.style.display = "none";
    }

    canvasControler.setData(toolSelected);
}