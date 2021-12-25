var lastKeyClicked = -1;
var mouseHold = false;
var ctrlClicked = false;
var ShiftClicked = false;

function onToolSizeChange(){
    const size =  toolSelected.size * canvasContainer.getScaleRatio();
    document.getElementById('cursor').style.width = size + 'px';
    document.getElementById('cursor').style.height = size + 'px';
}

function mouseEnter_workplace(event){
    const element = event.currentTarget;

    if (toolSelected.cursor == 'draw'){
        element.style.cursor = 'none';
        const cursor = document.getElementById('cursor');
        cursor.style.display = 'block';

    }else {
        element.style.cursor = toolSelected.cursor;
    }
}

function mouseLeave_workplace(event){
    const element = event.currentTarget;
    element.style.cursor = 'auto';
    const cursor = document.getElementById('cursor');
    cursor.style.display = 'none';
}

function mouseMove_workplace(event){
    const rect = canvasControler.getRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    x = (x * 1920) / canvasContainer.getWidth();
    y = (y * 1080) / canvasContainer.getHeight();

    const coordinates = document.getElementById('coordinates').innerText = parseInt(x) + '/' + parseInt(y);

    if (toolSelected.cursor == 'draw'){
        const cursor = document.getElementById('cursor');
        const size =  toolSelected.size * canvasContainer.getScaleRatio();
        cursor.style.top =  (event.clientY - size / 2) + 'px';
        cursor.style.left =  (event.clientX  - size / 2) + 'px';
    }

}


function keyClicked(key){
    if (key == "Control"){
        ctrlClicked = true;
    }else if (key == "Shift"){
        ShiftClicked = true;
    }else if (ctrlClicked && key == "z"){

        canvasControler.back();
    }else if (ctrlClicked && key == "y"){
        canvasControler.front();
    }
}

function keyUp(key){
    if (key == "Control"){
        ctrlClicked = false;
    }else if (key == "Shift"){
        ShiftClicked = false;
    }
}

function onWheel(delta){
    if (toolSelected.sizeSelect){
        if (delta > 0){
            toolSelected.size++;
            document.querySelector('#size').querySelector('input').value = toolSelected.size;

        }else if(delta < 0 && toolSelected.size > 1){
            toolSelected.size--;
            document.querySelector('#size').querySelector('input').value = toolSelected.size;
        }
        canvasControler.setData(toolSelected);

    }else{
        canvasContainer.scale(delta);
    }
}

function onMouseClick_workplace(event){
    mouseHold = true;
    lastKeyClicked = event.button;

    if (lastKeyClicked == 0){

    }else if (lastKeyClicked == 1){
        
        canvasContainer.onClick(event);
    }
}

function onMouseClick_canvas(event){
    mouseHold = true;
    lastKeyClicked = event.button;

    if (lastKeyClicked == 0){
        if (toolSelected.type == 'none'){
            canvasContainer.onClick(event);
        }else{
            const rect = canvasControler.getRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
        
            x = (x * 1920) / canvasContainer.getWidth();
            y = (y * 1080) / canvasContainer.getHeight();
            
            canvasControler.onClick(new Point(x, y));
        }
    }else if (lastKeyClicked == 1){

    }
}

function onMouseRelese(event){
    if (mouseHold){
        canvasControler.onRelese();
        canvasContainer.onRelese(event);
    }
    mouseHold = false;
}


function onMouseHold(event){
    
    if (lastKeyClicked == 0){
        const rect = canvasControler.getRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
    
        x = (x * 1920) / canvasContainer.getWidth();
        y = (y * 1080) / canvasContainer.getHeight();
        
        canvasControler.onHold(new Point(x, y), ctrlClicked, ShiftClicked);
    }

    canvasContainer.onHold(event);
}