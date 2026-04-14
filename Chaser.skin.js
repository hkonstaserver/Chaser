// -------------------------------------
//       6502 Protoboard skin
//         November 19, 2015
//           Harry Konstas
// -------------------------------------


/*
[ADDRESS SPACE]

0x0000-0x0fff: RAM
0x00: Zero page RAM
0x100-0x1FF: Stack

0x1000-0xffff: ROM
0x1000-0xefff: Code space 
0xf000-0xffff: IRQ space

0xE0-0xEF: Matrix LEDs space
0xF0: Bargraph
0xF1-0xF6: Digits
0xFD: Timer register
0xFE: Random Register
0xFF: KEY Register

*/


// screen size
var screenW = 846;
var screenH = 280;

// Global canvas context
var ctx = 0; 


// -------------------------
//     Graphics functions 
// -------------------------

function createCanvas(width,height){

  var canvas;

  canvas = document.getElementById( "canvas" );
  canvas.width = screenW;
  canvas.height = screenH;
  canvas.style.backgroundColor = "white";
  canvas.style.marginBottom = 0;
  canvas.style.marginLeft=0;
  canvas.addEventListener('mousedown',tapEvent,false);

  document.body.appendChild(canvas);

  // Get canvas context
  ctx = canvas.getContext("2d");

  ctx.globalAlpha=1.0;
  //ctx.strokeOpacity=50;

  // clear canvas area 
  ctx.clearRect(0, 0, width,height);

}


function setPenColor(r,g,b) {
  s="rgb("+r+","+g+","+b+")";
  ctx.strokeStyle = s;
}


function setFillColor(r,g,b) {
  s="rgb("+r+","+g+","+b+")";
  ctx.fillStyle = s;
}


function setPenWidth(size) {
  ctx.lineWidth = size;
}


function drawDot(x, y, size) {
  ctx.fillRect(x, y, size, size);
}


function drawLine(x,y,dx,dy) {

  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(dx,dy);
  ctx.stroke();
  ctx.closePath();

}


function drawRectangle(x,y,w,h) {
  ctx.strokeRect (x, y, w, h);
}


function fillRectangle(x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}


function drawCircle(x, y, r) {
 
  var endAngle = Math.PI*2;

 // setPenWidth(2);
  ctx.beginPath();
  ctx.arc(x,y,r,0,endAngle,true);
  ctx.stroke();
 // setPenWidth(1);

}


// ----------------------------
//   HANDLE COMPILER MESSAGES 
// ----------------------------


function message(text) {

  return;

}


// --------------------------------
//       DISPLAY SEGMENT
// -------------------------------


function segment(id, value) {


  var xpos, gray=50;
  var y1=52, y2=77, y3=101;

  switch(id) {

    case 0: xpos=483; break;
    case 1: xpos=531; break;
    case 2: xpos=607; break;
    case 3: xpos=654; break;
    case 4: xpos=729; break;
    case 5: xpos=777; break;
    default: return;
  } 

  // clear digit
  setPenColor(100,gray,gray);
  setFillColor(100,gray,gray);
  setPenWidth(5);

  drawLine(xpos+29, y1,xpos+25, y2); // a 
  drawLine(xpos+25, y2,xpos+21, y3); // b
  drawLine(xpos-6,  y3,xpos+20, y3); // c
  drawLine(xpos-2,  y2,xpos-6,  y3); // d
  drawLine(xpos+3,  y1,xpos-2,  y2); // e
  drawLine(xpos+3,  y1,xpos+28, y1); // f
  drawLine(xpos-4,  y2,xpos+23, y2); // g
  drawLine(xpos+25, y3,xpos+30, y3); // h

  // red digits
  setPenColor(255,0,0);
  setFillColor(255,0,0);
  setPenWidth(4);

  if (((value >> 0) & 1) != 0) drawLine(xpos+29, y1,xpos+25, y2); // a 
  if (((value >> 1) & 1) != 0) drawLine(xpos+25, y2,xpos+21, y3); // b 
  if (((value >> 2) & 1) != 0) drawLine(xpos-6,  y3,xpos+20, y3); // c 
  if (((value >> 3) & 1) != 0) drawLine(xpos-2,  y2,xpos-6,  y3); // d  
  if (((value >> 4) & 1) != 0) drawLine(xpos+3,  y1,xpos-2,  y2); // e    
  if (((value >> 5) & 1) != 0) drawLine(xpos+3,  y1,xpos+28, y1); // f    
  if (((value >> 6) & 1) != 0) drawLine(xpos-4,  y2,xpos+23, y2); // g
  if (((value >> 7) & 1) != 0) drawLine(xpos+25, y3,xpos+30, y3); // h    
  

}



// --------------------------------
//       DISPLAY bargraph
// -------------------------------


function bargraph(value) {


  var xpos = 344, gray=160;
  var ypos=305, ypos2=375, spc=38;


  // clear digit
  setPenColor(gray,gray,gray);
  setFillColor(gray,gray,gray);
  setPenWidth(26);

  drawLine(xpos,ypos,xpos,ypos2); // a 
  drawLine(xpos+spc,ypos,xpos+spc,ypos2); // b
  drawLine(xpos+(spc*2),ypos,xpos+(spc*2),ypos2); // c
  drawLine(xpos+(spc*3),ypos,xpos+(spc*3),ypos2); // d
  drawLine(xpos+(spc*4),ypos,xpos+(spc*4),ypos2); // e
  drawLine(xpos+(spc*5),ypos,xpos+(spc*5),ypos2); // f
  drawLine(xpos+(spc*6),ypos,xpos+(spc*6),ypos2); // g
  drawLine(xpos+(spc*7),ypos,xpos+(spc*7),ypos2); // h

  // red digits
  setPenColor(210,0,0);
  setFillColor(255,0,0);
  setPenWidth(25);

  if (((value >> 7) & 1) != 0) drawLine(xpos,ypos,xpos,ypos2); // a 
  if (((value >> 6) & 1) != 0) drawLine(xpos+spc,ypos,xpos+spc,ypos2); // b
  if (((value >> 5) & 1) != 0) drawLine(xpos+(spc*2),ypos,xpos+(spc*2),ypos2); // c
  if (((value >> 4) & 1) != 0) drawLine(xpos+(spc*3),ypos,xpos+(spc*3),ypos2); // d
  if (((value >> 3) & 1) != 0) drawLine(xpos+(spc*4),ypos,xpos+(spc*4),ypos2); // e
  if (((value >> 2) & 1) != 0) drawLine(xpos+(spc*5),ypos,xpos+(spc*5),ypos2); // f
  if (((value >> 1) & 1) != 0) drawLine(xpos+(spc*6),ypos,xpos+(spc*6),ypos2); // g
  if (((value >> 0) & 1) != 0) drawLine(xpos+(spc*7),ypos,xpos+(spc*7),ypos2); // h
  

}

// --------------------------------
//        CLEAR LED MATRIX
// -------------------------------


function clearMatrix() {

  var x, y, gray=5, r=5, vs=30, hs=30;


  // clear digit
  setPenColor(60,gray,gray);
  setFillColor(60,gray,gray);
  setPenWidth(10);


  for(y=30;y<250;y+=vs) {
    
    for(x=150;x<370;x+=hs) {  
      drawCircle(x,y,r);
    }

  }


}




// --------------------------------
//     ANIMATE MATRIX COLUMN
// -------------------------------


function ledMatrix(col, value) {

  var y=0, gray=5, r=5, vs=30, hs=30;

  // clear row
  setPenColor(60,gray,gray);
  setFillColor(60,gray,gray);
  setPenWidth(10);
  
  for(y=0;y<8;y++)
    drawCircle((col*hs)+150,(y*vs)+30,r); 

  
  // light led
  setPenColor(200,gray,gray);
  setFillColor(200,gray,gray);
  setPenWidth(10);

  y=0;
  if (((value >> 0) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 1) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 2) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 3) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 4) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 5) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 6) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;
  if (((value >> 7) & 1) != 0) drawCircle((col*hs)+150,(y*vs)+30,r); y++;

}

// --------------------------------
//        CLEAR SEGMENTS
// -------------------------------


function clearSegments() {

  message("Ready.");
  segment(3,0);
  segment(4,0);
  segment(5,0);
  segment(6,0);
  segment(7,0);
  segment(8,0);

 // bargraph(0);
  clearMatrix();

}


// -------------------------
//      Handle buttons
// -------------------------


function scanButtons(x,y) {

  var keyboard = 0;

  var y1=144, y2=200, y3=250;

  // first row
  if(x>470 && x<530  && y>y1 && y<y2) keyboard=1;
  if(x>530 && x<588 && y>y1 && y<y2) keyboard=2;
  if(x>588 && x<645 && y>y1 && y<y2) keyboard=3;
  if(x>645 && x<705 && y>y1 && y<y2) keyboard=4;
  if(x>705 && x<762 && y>y1 && y<y2) keyboard=5;
  if(x>762 && x<820 && y>y1 && y<y2) keyboard=11;

  // second row
  if(x>470 && x<530 && y>y2 && y<y3) keyboard=6;
  if(x>530 && x<588 && y>y2 && y<y3) keyboard=7;
  if(x>588 && x<645 && y>y2 && y<y3) keyboard=8;
  if(x>645 && x<705 && y>y2 && y<y3) keyboard=9;
  if(x>705 && x<762 && y>y2 && y<y3) keyboard=10;
  if(x>762 && x<820 && y>y2 && y<y3) keyboard=12;

  memory[KEYREG] = keyboard;

  // RESET
  if(x>25 && x<50 && y>595 && y<625) {buttonFlag=1; return;}

  // IRQ
  if(x>3 && x<24 && y>25 && y<45) {
    buttonFlag=2; 
    //message("[EXT-IRQ]");
    return;
  }

  // Pause
  if(y>490 && y<575 && codeRunning) {
    codeRunning=false;
    message("Paused..");
  }
  else {
    if(y>490 && y<575 && !codeRunning) codeRunning=true;
    message("Running...");
  }


}


// -------------------------
//      Handle Events 
// -------------------------


function tapEvent(e){

  var flip = 0;


  var x=e.pageX-12;
  var y=e.pageY-12;
   
  y=y+5; // v-shift fix

  scanButtons(x,y);

  // DEBUG - TESTING
  //setFillColor(255,0,0);
  //drawDot(x,y,10);
  //alert("x:"+x+" y:"+y+" k:"+memory[KEYREG]); 

}


// --------------------------
//     REFRESH HARDWARE
// --------------------------


function refreshHardware(addr) {

  var s;

  if(addr<0xE0 || addr>0xFF) return;

  if(addr==TIMER) timerCounter = memory[TIMER];

  // 8x8 matrix
  if(addr>0xDF && addr<0xF0) {
    s = addr-0xE0;
    ledMatrix(s, memory[addr]);
  }

  // DIGITS
  if(addr>0xF0 && addr<0xF7) {
     s = addr-0xF1;
     segment(s, memory[addr]);
     return;
  }

  // BARGRAPH
  if(addr==0xf0) {
    bargraph(memory[addr]);
    return;
  }


}


// --------------------------
//   LOAD & RUN CHASER 
// --------------------------


function load() {

  var img, data = "";

  createCanvas(screenW, screenH);
    
  img = document.createElement("img");
  img.src = "Chaser.skin.jpg";

  img.addEventListener("load", function() {    


    // Draw board  
    ctx.drawImage(img, 0, 0 ,screenW,screenH);

    // Clear segments
    clearSegments();

    run();

  });

}


