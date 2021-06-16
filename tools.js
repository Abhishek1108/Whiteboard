let pencil=document.querySelector("#pencil");
let pencilModal=document.querySelector(".pencil-modal");
let eraser=document.querySelector("#eraser");
let allTools=document.querySelectorAll(".tools div");
let sticky=document.querySelector("#sticky");

//  let eraserModal=document.querySelector(".eraser-modal");

let colorObj={blue:"#3498db",green:"#2ecc71",yellow:"#f1c40f",
red:"#e74c3c",brown:"#cd6133",grey:"#95a5a6",black:"#1e272e",
orange:"#fa8231",purple:"#8e44ad",pink:"#FDA7DF",skyblue:"#45aaf2",white:"#f7f1e3"}

let currentPencilThickness=1;
let currentPencilColor="black";
let erasing="false";
let addingSticky="false";
let stickyAdded="false";
let stickyNote;
let stickyId=1;
let selectedStickyID;
let currentEraserThickness=10;
pencil.addEventListener("click",openPencilModal);

function openPencilModal(){
  
  for(let i=0;i<allTools.length;i++){
    if(allTools[i].classList.contains("active")){
      allTools[i].classList.remove("active");
    }
    pencil.classList.add("active");
    
  }
  if(document.querySelector(".eraser-modal")){
    
    document.querySelector(".eraser-modal").remove();
  }
     erasing="false";
    let pencilModal=document.createElement("div");
    pencilModal.classList.add("pencil-modal");
    pencilModal.innerHTML=` <div class="pencil-shades">
    <div class="shade" >
    <div class="shade-thickness"><span class="iconify" data-icon="openmoji:ecg-waves" data-inline="false" data-width="30px" data-height="30px"></span></div>
    <div class="icon" ><i class="fas fa-pen" value="5"></i></div>
    </div>
    <div class="shade" >
    <div class="shade-thickness"><span class="iconify" data-icon="openmoji:ecg-waves" data-inline="false" data-width="30px" data-height="30px"></span></div>
    <div class="icon" ><i class="fas fa-highlighter" value="10"></i></div>
    </div>
    <div class="shade" >
    <div class="shade-thickness"><span class="iconify" data-icon="openmoji:ecg-waves" data-inline="false" data-width="30px" data-height="30px"></span></div>
    <div class="icon" ><i class="fas fa-paint-brush" value="20"></i></div>
    </div>
    <div class="shade" >
    <div class="shade-thickness"><span class="iconify" data-icon="openmoji:ecg-waves" data-inline="false" data-width="30px" data-height="30px"></span></div>
    <div class="icon"><i class="fas fa-paint-roller"  value="30"></i></div>
    </div>
</div>
<div class="pencil-colors">
  <div class="color" id="blue"></div>
  <div class="color" id="green"></div>
    <div class="color" id="yellow"></div>
    <div class="color" id="red"></div>
    <div class="color" id="brown"></div>
  <div class="color" id="grey"></div>
  <div class="color" id="black"></div>
  <div class="color" id="orange"></div>
  <div class="color" id="purple"></div>
  <div class="color" id="pink"></div>
  <div class="color" id="skyblue"></div>
  <div class="color" id="white"></div>
</div>`
let left =pencil.getBoundingClientRect().left;  
pencilModal.style.left=(left-(50))+"px";


    if(document.querySelector(".pencil-modal")){
        
        document.querySelector(".pencil-modal").remove();
        pencil.classList.remove("active");
    }else{
       
        drawingArea.append(pencilModal);
    }

    let color=document.querySelectorAll(".pencil-colors div");
    for(let i=0;i<color.length;i++){
          color[i].addEventListener("click",changePencilColor);
    }
       
    let pencilShade=document.querySelectorAll(".icon");
    
    for(let i=0;i<pencilShade.length;i++){
     
      pencilShade[i].addEventListener("click",changePencilThickness);
    }
   

}

function changePencilColor(e){
 let colorcode=colorObj[e.target.id];
 ctx.strokeStyle=colorcode;
 currentPencilColor=colorcode;

}
function changePencilThickness(e){

  let changedThickness=e.target.getAttribute("value");
  ctx.lineWidth=changedThickness;
  currentPencilThickness=changedThickness;
  
}

eraser.addEventListener("click",openEraserModal);

 function  openEraserModal(){
  for(let i=0;i<allTools.length;i++){
    if(allTools[i].classList.contains("active")){
      allTools[i].classList.remove("active");
    }
    eraser.classList.add("active");
    
  }
   if(document.querySelector(".pencil-modal")){
     document.querySelector(".pencil-modal").remove();
   }

   erasing="true";

  let eraserModal=document.createElement("div");
  eraserModal.classList.add("eraser-modal");
  eraserModal.innerHTML=` <div class="eraser1-size" ><i class="fas fa-eraser" size="10"></i></div>
                          <div class="eraser2-size" ><i class="fas fa-eraser" size="30"></i></div>
                          <div class="eraser3-size" ><i class="fas fa-eraser" size="50"></i></div>`

  let eraserLeft=eraser.getBoundingClientRect().left;
  eraserModal.style.left=(eraserLeft-40)+"px";
  if(document.querySelector(".eraser-modal")){
        
    document.querySelector(".eraser-modal").remove();
    eraser.classList.remove("active");
   }else{
   
    drawingArea.append(eraserModal);
   } 
  let eraserSize=document.querySelectorAll(".eraser-modal div");
  for(let i=0;i<eraserSize.length;i++){
    eraserSize[i].addEventListener("click",changeEraserThickness);
  }

 }

 function changeEraserThickness(e){
   let size=e.target.getAttribute("size");
   currentEraserThickness=size;
    
 }

 sticky.addEventListener("click",addSticky);
 
 function addSticky(e){
  for(let i=0;i<allTools.length;i++){
    if(allTools[i].classList.contains("active")){
      allTools[i].classList.remove("active");
    }
    sticky.classList.add("active");
    
  }
   addingSticky="true";
   stickyNote=document.createElement("div");
  stickyNote.classList.add("sticky-note");
 stickyNote.id=stickyId;
//  stickyNote.setAttribute("draggable","true");
 stickyId++;
  stickyNote.innerHTML=`<div class="sticky-menu">
  <div class="change-color">
  <div class="stickyBackgound-color " id="yellow"></div>
  <div class="stickyBackgound-color " id="green"></div>
  <div class="stickyBackgound-color " id="pink"></div>
  <div class="stickyBackgound-color " id="purple"></div>
  <div class="stickyBackgound-color " id="skyblue"></div>
  <div class="stickyBackgound-color " id="grey"></div>
  <div class="stickyBackgound-color " id="black"></div>
  </div>
  <div class="delete">
  <div class="delete-stickynote"></div>
  <div class="delete-text"></div>
  </div>
                         </div>

                        <div class="sticky-header">
                        <div class="sticky-minimise" ><i class="fas fa-ellipsis-h" ></i></div>
                        <div class="close-sticky"><i class="fas fa-minus"></i></i></div>
                        </div>
                        <div class="sticky-content" contentEditable=true ></div>`
   
                        

 }



function openStickyMenu(e){

   let selectedSticky=e.path[3];
   let stickyMenu=selectedSticky.querySelector(".sticky-menu");
  let deleteSticky=stickyMenu.querySelector(".delete-stickynote");
  let deleleText=stickyMenu.querySelector(".delete-text");
  deleleText.textContent="Delete note";
  deleteSticky.innerHTML=`<i class="far fa-trash-alt"></i>`;
  // deleteSticky.textContent="Delete Note";
 stickyMenu.classList.add("show-menu");


}
function changeStickyBackgroundColor(allColorDiv){
  
  for(let i=0;i<allColorDiv.length;i++){
    allColorDiv[i].addEventListener("click",function(e){
      let changedColor=e.target.id;
      
      //  console.log(e);
      let stickyContent=(e.path[3]).children[2];
      stickyContent.style.background=colorObj[changedColor];
      let menu=e.path[2];
      let deleteSticky=menu.querySelector(".delete-stickynote");
       let deleleText=menu.querySelector(".delete-text");
      deleleText.textContent=" ";
      deleteSticky.innerHTML="";
      menu.classList.remove("show-menu");
    })
  }
}
var initialx = 0,
initialy = 0,
currentx = 0,
currenty = 0;
isDraggingStart="false";
function dragStart(e){
 isDraggingStart="true";
 e = e || window.event;
 e.preventDefault();
 currentx = e.clientX;
 currenty = e.clientY;
 document.onmouseup = dragEnd;
 document.onmousemove = drag;

}

function drag(e){
  if(isDraggingStart=="true"){
    // console.log(e);
    // e = e || window.event;
    e.preventDefault();
    initialx = currentx - e.clientX;
    initialy = currenty - e.clientY;
    currentx = e.clientX;
    currenty = e.clientY;
    e.path[1].style.top = e.path[1].offsetTop - initialy + "px";
    e.path[1].style.left = e.path[1].offsetLeft - initialx + "px";

  }
 
}
function dragEnd(e){
  
  isDraggingStart="false";
}
function minimiseStickyContent(e){
console.log(e);
let note=e.path[3];
 let stickyContent=e.path[3].children[2];
 if(stickyContent.classList.contains("hide")){
  stickyContent.classList.remove("hide");
  note.classList.remove("remove-shadow");
 }else{
  stickyContent.classList.add("hide");
  note.classList.add("remove-shadow");
 }
 
 

}

{/* <i class="far fa-trash-alt"></i> */}