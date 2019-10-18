//myfun1(canvas1, "left","right");
//$("#test").aimeeArrows();

(function ($) {
    
    //start direction :['left', 'top', 'right'.....]
    //end direction :['left', 'top', 'right'.....]
    //sequence : [true - positive direction, false - reverse direction ] 
    //no_stop : [true - stop,then no ball, only a grey path 
    //         , false - draw all]
    //path : [ true - this is a path, then give a color path
    //         false - draw ball ]
    //lcolor : the color of ball and arrow
    $.fn.aimeeArrows = function (start, end,seq, no_stop, path, lcolor) {

    lcolor = lcolor ||  "#1ab374" ;
  
      var cxt=this.get(0).getContext('2d');
      
     /* if(cxt=this.get(0).getContext('2d')){}
      else{
          console.log('Error: Canvas not found with selector');
      }  */
      
  
      var h = this.get(0).height;
      var w = this.get(0).width;
      var pathw = 3;
      
      //the x,y of ball position
      var x=0;
      var y=0;
      
      var states = [];
      var state = -1;
      var stateindex = 0; 
      var stateindexNow = stateindex;
      var time1=0;
      var time2=0;
      //var seq = false;
   
      getStates();
      console.log(states);
        
      inifunction(states[stateindexNow],true);
   
         var i = setInterval(function(){

             if(no_stop==true){
                 if(path==false){
                    run(cxt,start,end,seq, lcolor);
                 }else{
                    drawPathOnly(cxt,lcolor);
                 }
                  
              
                 
             }else{
                if(path==false){
                    drawPathOnly(cxt,'grey');
                 }else{
                    
                    drawPathOnly(cxt,'grey');
                 }
                  
                  
             }
             
          
       }, 10);
        
        return i;
      
      //var dhtml = "Hello World";
      //this.html(dhtml);
  
      function getStates(){
          if(start=="left" && end =="right"){
              
              if(h<2*w){
                  x = 0;
                  y = h/2;
                  states = [8];
              }else if(h == 2*w){
                  states = [1,7];
              }else if(h > 2*w){
                  states = [1,4,7];
              }
          }else if(start=="right" && end =="left"){
              if(h<2*w){
                  x = w;
                  y = h/2;
                  states = [9];
              }else if(h == 2*w){
                  states = [3,5];
              }else if(h > 2*w){
                  states = [3,4,5];
              }
          }else if(start == "right" && end == "bottom"){
              if(h<w){
                  states = [3];
              }else{
                  states = [3,11];
              }
          }else if(start == "left" && end == "bottom"){
              
              if(h<w){
                  states = [1];
              }else{
                  states = [1,11];
              }
          }else if(start=="top"){
              x = w/2;
              if(end == "bottom"){
                  if(h<=w){
                      states = [6];
                  }else{
                      states = [10,6];
                  }
                  
              }else if(end == "left"){
                  if(h<=w){
                      states = [5];
                  }else{
                      states = [10,5];
                  }
                  
              }else if(end == "right"){
                  if(h<=w){
                      states = [7];
                  }else{
                      states = [10,7];
                  }
              }
              
      
          }
         
      }
      function inifunction(index,seq){
          if(seq){
              if(index == 1){
                 // console.log(1);
                  time1 = 0;
              }
  
              if(index == 2){
                //  console.log(2);
                  y = 0;
                  x = w/2;
              }
  
              if(index == 3){
               //   console.log(3);
                  time1 = 0;
              }
  
              if(index == 4){
                //  console.log(4);
                  y = w;
                  x = w/2;
              }
  
              if(index == 5){
                 time2 = 0;
              }
  
              if(index == 6){
  
                 y =h-w;
                 x = w/2;
  
              }
  
              if(index == 7){
                //  console.log(7);
                 time2 = 0;
              }
  
              if(index == 8){
                 x = 0;
                 y = h/2;
              }
  
              if(index == 9){
                 x = w;
                 y = h/2;
              }
  
              if(index == 10){
                 x = w/2;
                 y = 0;
              }
  
              if(index == 11){
                 x = w/2;
                 y = w;
              }
          }else{
              if(index == 1 ){
                  
                  time1 = 90;
              }
  
              if(index == 2){
                  y = 0;
                  x = w/2;
              }
              
              if(index == 3 ){
                 
                  time1 = 90;
              }
             
              if(index == 4){
                  
                  y = h-w;
                  x = w/2;
              }
  
              if(index == 5 ){
                 
                 time2 = 90;
              }
  
              if(index == 6){
  
                 y = h;
                 x = w/2;
  
              }
              
              if(index == 7){
                  
                 time2 = 90;
              }
  
              if(index == 8){
                 x = w;
                 y = h/2;
              }
  
              if(index == 9){
                 x = 0;
                 y = h/2;
              }
  
              if(index == 10){
                 
                 x = w/2;
                 y = h-w;
              }
  
              if(index == 11){
                 x = w/2;
                 y = h;
              }
              
              
          }
              
          
      }
     
      //state = 1
      function drawPathCircleleftState1(cxt){
          //draw half path
          
          cxt.beginPath();
          cxt.arc(0,w,w/2,0,1.5*Math.PI,1);
          cxt.strokeStyle = LineColor;
          cxt.lineWidth = pathw;
          cxt.stroke();
          cxt.closePath();
      }
      
      //state = 3
      function drawPathCirclerightState3(cxt){
          //draw half path
          cxt.beginPath();
          cxt.arc(w,w,w/2,0,Math.PI,1);
          cxt.strokeStyle = LineColor;
          cxt.lineWidth = pathw;
          cxt.stroke();
          cxt.closePath();
      }
      
      //state = 4
      function drawPathtopdownState4(cxt){
            drawLine(w/2,w,w/2,h-w,LineColor);
            cxt.lineWidth = pathw; 
      }
      
      //state = 5
      function drawPathCircleleftState5(cxt){
          //draw half path
          cxt.beginPath();
          cxt.arc(0,h-w,w/2,0,Math.PI,0);
          cxt.strokeStyle = LineColor;
          cxt.lineWidth = pathw;
          cxt.stroke();
          cxt.closePath();
      }
      
      //state = 6
        function drawPathtopdownState6(cxt){
            drawLine(w/2,h-w,w/2,h,LineColor);
            cxt.lineWidth = pathw; 
        }
        
      //state = 7
      function drawPathCirclerightState7(cxt){
          //draw half path
          cxt.beginPath();
          cxt.arc(w,h-w,w/2,0,Math.PI,0);
          cxt.strokeStyle = LineColor;
          cxt.lineWidth = pathw;
          cxt.stroke();
          cxt.closePath();
      }
        
      //state = 8 & 9
        function drawPathLeftToRightState8State9(cxt){
            drawLine(0,h/2,w,h/2,LineColor);
            cxt.lineWidth = pathw;  
        }
        
      //state = 10
        function drawPathtopdownState10(cxt){
            drawLine(w/2,0,w/2,h-w,LineColor);
            cxt.lineWidth = pathw;  
        }
        
        //state = 11
        function drawPathtopdownState11(cxt){
            drawLine(w/2,w,w/2,h, LineColor);
            cxt.lineWidth = pathw;  
        }
        
        
        


        
        
      function leftCircleStart(cxt){
          //cxt.save();
          cxt.fillStyle='white';
          cxt.beginPath();
          
          r = w/2;
          
          degree = time1* Math.PI/180 ;

          x = r*Math.sin(degree);
          y = w-r*Math.cos(degree);
          
  
         // cxt.arc(x,y,5,0,2*Math.PI,false);
         
          cxt.closePath();
          cxt.fill();
         // cxt.restore();
        }
        
        
        
        function topDown(cxt){
          cxt.fillStyle='white';
          cxt.beginPath();
          
          //cxt.arc(x,y,5,0,2*Math.PI,false);
          
          cxt.closePath();
          cxt.fill();
        }
            
        function rightCircleStart(cxt){
         
          cxt.fillStyle='white';
          cxt.beginPath();
        
         r = w/2;
          
          degree = time1* Math.PI/180 ;
          

          x = w - r*Math.sin(degree);
          y = w - r*Math.cos(degree);
          
          cxt.closePath();
          cxt.fill();
         
        }
    
            
        function leftCircleEnd(cxt){
           
          r = w/2;
          
          degree = time2* Math.PI/180 ;
          

          x = r*Math.cos(degree);
          y = h-w + r*Math.sin(degree);

          
         cxt.fillStyle='white';
          cxt.beginPath();
          cxt.closePath();
          cxt.fill();
         
     
        }
            
        function rightCircleEnd(cxt){
                   
          cxt.fillStyle='white';
          cxt.beginPath();

          r = w/2;
          
           degree = time2* Math.PI/180 ; 

          x = w-r*Math.cos(degree);
          y = h-w+ r*Math.sin(degree);

          cxt.closePath();
          cxt.fill();
     
        }
        
        function drawLine(x1,y1,x2,y2,Linecolor){
              cxt.save();
              cxt.strokeStyle = Linecolor;
              cxt.linewidth = '4';    
              cxt.beginPath();
              cxt.moveTo(x1,y1);
              cxt.lineTo(x2,y2);
              cxt.closePath();
              cxt.stroke();
              cxt.restore();
            }
        function drawEmptyCircle(x,y,radius,color){
          cxt.save();
          cxt.strokeStyle = color;
          cxt.beginPath();
          cxt.arc(x,y,radius,0,Math.PI * 2);
          cxt.closePath();
          cxt.stroke();
          cxt.restore();    
        }
        
        function drawPath(cxt){
           
              
              states.forEach(function(element) {
                  
                  
                   switch(element){
                       case 1:drawPathCircleleftState1(cxt); break;
                       case 3:drawPathCirclerightState3(cxt);break;
                       case 4:drawPathtopdownState4(cxt);break;
                       case 5:drawPathCircleleftState5(cxt);break;
                       case 6:drawPathtopdownState6(cxt);break;
                       case 7:drawPathCirclerightState7(cxt);break;
                       case 8: case 9: drawPathLeftToRightState8State9(cxt);break;
                       case 10:drawPathtopdownState10(cxt);break;
                       case 11:drawPathtopdownState11(cxt);break;
                       default:console.log("error");
                           
                   }
              });    
        }
        
        function drawPathOnly(cxt, lcolor){
          cxt.fillStyle = 'red';
          cxt.clearRect(0,0,w,h);
          
          state = states[stateindexNow];
          LineColor= lcolor;
          drawPath(cxt); 
        }
  
        function run(cxt,start, end,seq, lcolor){
          
          cxt.fillStyle = 'red';
          cxt.clearRect(0,0,w,h);
          
          state = states[stateindexNow];
          LineColor=lcolor;
          //drawPath(cxt); 
          
          function gof(){
                           stateindex++;
                           stateindexNow = stateindex%(states.length);
                           inifunction(states[stateindexNow],seq);      
          }
            
          function returnf(){
                           stateindex++;
                           stateindexNow = states.length-1-stateindex%(states.length);  
                           inifunction(states[stateindexNow],seq);           
          }
         
         //half circle
         if(state == 1 ){
            
             leftCircleStart(cxt);
           
              if(seq){
                  if(time1<90){
                       time1+=1;
                  }else{
                      
                          gof();    
                  }   
                  
              }else{
                  if(time1>0){
                       time1-=1;
                  }else{
                      
                          returnf();    
                  }  
              }
                  
  
         }
          
            
         if(state == 2 ){
             //console.log(time1);
          
             topDown(cxt);
     
             if(h<w){
                 if(y<h){
                     y+=1;
                 }else{
                     gof();
                 }
             }else{
                 if(y<w){
                     y+=1;
                 }else{
                     returnf();
                 }
                 
             }
         }
         
         if(state == 3 ){
             rightCircleStart(cxt);       
             //drawPathCirclerightState3(cxt);
             if(seq){
                 if(time1<90){
                       time1+=1;
                  }else{                  
                       gof();
      
                  }
                 
             }else{
                 if(time1>0){
                       time1-=1;
                  }else{                  
                       returnf();
      
                  }
             }
                 
         }
             
         if(state == 4 ){
             topDown(cxt);
             //drawPathtopdownState4(cxt);
             if(seq){
                 if(y<h-w){
                      y+=1;
                     
                  }else{
                      gof();
                  }
                 
             }else{
                 if(y>w){
                      y-=1;
                  }else{
                      
                      returnf();
                  }
                 
             }
         }
             
         if(state == 5 ){
             leftCircleEnd(cxt );       
            // drawPathCircleleftState5(cxt);
             if(seq){
                 if(time2<90){
                       time2+=1;
                  }else{                  
                       gof();
      
                  }
                 
             }else{
                 if(time2>0){
                       time2-=1;
                  }else{                  
                       returnf();
      
                  }
             }
             
         }
             
         if(state == 6 ){
             topDown(cxt); 
            // drawPathtopdownState6(cxt);
            //infoButtonClick(cxt,h,w,y,x);
            if(seq){
                 if(y<h){
                   y+=2;
                  }else{
                       gof();
                  }
                
            }else{
                if(y>h-w){
                   y-=1;
                  }else{
                       returnf();
                  }
               
            }
           
              
         }
             
         if(state == 7 ){
             rightCircleEnd(cxt);
            // infoButtonClick(cxt,h,w,y,x);
            
            // drawPathCirclerightState7(cxt);
            if(seq){
                 if(time2<90){
                       time2+=1;
                  }else{                  
                       gof();
      
                  }
                 
             }else{
                 if(time2>0){
                       time2-=1;
                  }else{                  
                       returnf();
      
                  }
             }
                
               
         }
             
         if(state == 8 ){
             
             topDown(cxt);
            // infoButtonClick(cxt,h,w,y,x);
            // drawPathLeftToRightState8State9(cxt);
             if(seq){
                 if(x<w){
                      x+=2;
                  }else{
                       gof();
                  }
             }else{
                 if(x>0){
                      x-=2;
                  }else{
                       returnf();
                  }
             }
              
         }
             
         if(state == 9 ){
             
             topDown(cxt);
           //  infoButtonClick(cxt,h,w,y,x);
            // drawPathLeftToRightState8State9(cxt);
             if(seq){
                 if(x>0){
                      x-=2;
                  }else{
                       gof();
                  }
             }else{
                 if(x<w){
                      x+=2;
                  }else{
                       returnf();
                  }
             }
          
         }
         
         //top-down
         if(state == 10 ){
            // drawPathtopdownState10(cxt);
             topDown(cxt);
            // infoButtonClick(cxt,h,w,y,x);
             if(seq){
                 if(y<h-w){
                       y+=1;
                  }else{
                       gof();
                  }
                 
             }else{
                 if(y>0){
                       y-=1;
                  }else{
                       returnf();
                  }
                 
             }
              
         }
             
         if(state == 11 ){
            // drawPathtopdownState11(cxt);
             topDown(cxt);
            // infoButtonClick(cxt,h,w,y,x);
             if(seq){
                 if(y<h){
                   y+=1;
                  }else{
                       gof();
                  }
                 
             }else{
                 if(y>w){
                   y-=1;
                  }else{
                       returnf();
                  }
                 
             }
             
         }
         infoButtonClick(cxt,h,w,y,x, lcolor);
         
         cxt.fillStyle='#d88d4e';
          cxt.beginPath();
          cxt.arc(x,y,2,0,2*Math.PI,false);
          cxt.closePath();
          cxt.fill();

             
             
       
     }
  
        return this;
  
      }
  })(jQuery);
  
   
  