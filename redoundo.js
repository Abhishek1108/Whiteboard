let redo=document.querySelector('#redo');
let undo=document.querySelector('#undo');

redo.addEventListener('click',redoLine);
undo.addEventListener('click',undoLine);


function undoLine(){
   let redoLine=db.pop();
   redoDB.push(redoLine);


   ctx.clearRect(0,0,canvas.clientWidth,canvas.height);

   redrawLine();
}
function redrawLine(){
    ctx.lineCap="round";
    for(let i=0;i<db.length;i++){
        let line=db[i];

        for(let j=0;j<line.length;j++){

            let pointObj=line[j];
            if(pointObj.type=='md'){
                ctx.strokeStyle=pointObj.color;
                ctx.lineWidth=pointObj.width;
                ctx.beginPath();
                ctx.moveTo(pointObj.x,pointObj.y);
            }else{
                ctx.lineTo(pointObj.x,pointObj.y);
                ctx.stroke();
            }
        }
    }

 }
function redoLine(){
 

    if(redoDB.length>=1){

        let line=redoDB.pop();

        for(let j=0;j<line.length;j++){
            let pointObj=line[j];
            if(pointObj.type=='md'){
                ctx.strokeStyle=pointObj.color;
                ctx.lineWidth=pointObj.width;
                ctx.beginPath();
                ctx.moveTo(pointObj.x,pointObj.y);
            }else{
                ctx.lineTo(pointObj.x,pointObj.y);
                ctx.stroke();
            }
        }
        db.push(line);
    }

 }



