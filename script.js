let canvas=document.querySelector("#canvas");
let drawingArea=document.querySelector(".drawing-area");

let {top:canvasTop}=canvas.getBoundingClientRect();

canvas.height=window.innerHeight-(canvasTop+5);
canvas.width=window.innerWidth;

window.addEventListener("resize",function(e){
    canvas.height=window.innerHeight-(canvasTop+5);
    canvas.width=window.innerWidth;

    if(document.querySelector(".pencil-modal")){
        let left =pencil.getBoundingClientRect().left;
        document.querySelector(".pencil-modal").style.left=(left-(50))+"px";
    }
    if(document.querySelector(".eraser-modal")){
        let eraserLeft=eraser.getBoundingClientRect().left;
        document.querySelector(".eraser-modal").style.left=(eraserLeft-40)+"px";
    }
  redrawLine();

})

let ctx=canvas.getContext("2d");


ismouseDown=false;
let db=[];
let redoDB=[];
let line=[];

canvas.addEventListener("mousedown",function(e){

    ismouseDown=true;
    if(redoDB.length){
        redoDB=[];
    }

    let x=e.clientX;
    let y=e.clientY-canvasTop;
    let pointObj={
       type:'md',
       x:x,
       y:y,
       color:ctx.strokeStyle,
       width:ctx.lineWidth,
    }
    line.push(pointObj);


      if(addingSticky=="false"){
        ismouseDown=true;
        
        ctx.beginPath();
        ctx.moveTo(x,y);
      }else{
        // ismouseDown=true;
        let x=e.clientX;
        let y=e.clientY-canvasTop;
        stickyNote.style.left=x+"px";
        stickyNote.style.top=y+"px";
        let stickyHeader=stickyNote.querySelector(".sticky-header");
        stickyHeader.addEventListener("mousedown",dragStart);
        stickyHeader.addEventListener("mousemove",drag);
        stickyHeader.addEventListener("mouseup",dragEnd);
        drawingArea.append(stickyNote);

        addingSticky="false";
        stickyAdded="true";
        let allColorDiv=stickyNote.querySelectorAll(".sticky-menu");
        changeStickyBackgroundColor(allColorDiv);
        let openstickyMenuBtn=stickyNote.querySelector(".sticky-minimise");
        let stickyMnimiseBtn=stickyNote.querySelector(".close-sticky");
        stickyMnimiseBtn.addEventListener("click",minimiseStickyContent);
        
        openstickyMenuBtn.addEventListener("click",openStickyMenu);
      }
        
    
        

    if(document.querySelector(".pencil-modal")){
        document.querySelector(".pencil-modal").remove();
    }
    if(document.querySelector(".eraser-modal")){
        document.querySelector(".eraser-modal").remove();
    }

});
canvas.addEventListener("mousemove",function(e){
      
    if(erasing=="false"){
        if(ismouseDown){
            let x=e.clientX;
            let y=e.clientY-canvasTop;
            ctx.lineTo(x,y);
              ctx.stroke();
              let pointObj={
                type:'mn',
                x:x,
                y:y,

            }
            line.push(pointObj);
      }
    }
    else{
        if(ismouseDown){
            if(erasing=="true"){
                let x=e.clientX;
                let y=e.clientY-canvasTop;
                ctx.clearRect(x,y,currentEraserThickness,currentEraserThickness);
            }
            let x=e.clientX;
            let y=e.clientY-canvasTop;
            let pointObj={
                type:'mn',
                x:x,
                y:y,

            }
            line.push(pointObj);
            
      } 
    }
      
});
canvas.addEventListener("mouseup",function(e){
 
   ismouseDown=false;
   db.push(line);
   line=[];
   

});

