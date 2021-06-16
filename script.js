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
  

})

let ctx=canvas.getContext("2d");
ismouseDown=false;

canvas.addEventListener("mousedown",function(e){
      if(addingSticky=="false"){
        ismouseDown=true;
        let x=e.clientX;
        let y=e.clientY-canvasTop;
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
      }
    }
    else{
        if(ismouseDown){
            if(erasing=="true"){
                let x=e.clientX;
                let y=e.clientY-canvasTop;
                ctx.clearRect(x,y,currentEraserThickness,currentEraserThickness);
            }
            
      } 
    }
      
});
canvas.addEventListener("mouseup",function(e){
 
   ismouseDown=false;

});

