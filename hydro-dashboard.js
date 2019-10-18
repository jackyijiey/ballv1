
(function ($) {
  $.fn.hydroDashboard = function (project, clickedOn) {
    var defaultConfig = {
      "percentageRenewables": 0,
      "surplusRenewables": false,
      "chargeEvs": false,
      "zdo": false,
      "percentageCheck": 0,
      "message": null,
      "technologies": [
        {
          "direction": 0,
          "speed": 0,
          "id": "tech-1",
          "title": "wind",
          "value": 0,
          "max": 600,
          "unit": "kW",
          "percent": 0,
          "other": 0,
          "otherUnits": "m/s",
          "status": false
        },
        {
          "id": "tech-2",
          "title": "Solar",
          "irradiance": 0,
          "value": 0,
          "max": 600,
          "unit": "kW",
          "percent": 0,
          "other": 0,
          "otherUnits": "W/m^2",
          "status": false
        },
        {
          "id": "tech-4",
          "title": "Diesel",
          "value": 0,
          "max": 2100,
          "unit": "kW",
          "percent": 0,
          "status": false
        },
        {
          "id": "tech-5",
          "title": "Resistor",
          "value": 0,
          "max": 500,
          "unit": "kW",
          "percent": 0,
          "status": false
        },
        {
          "id": "tech-3",
          "title": "Battery",
          "value": 0,
          "max": 500,
          "unit": "kW",
          "percent": 0,
          "other": 0,
          "otherUnits": "%",
          "status": false
        },
        {
          "renewable": false,
          "capacity": 0,
          "id": "tech-6",
          "title": "Flywheel (D-UPS)",
          "value": 0,
          "other": 0,
          "otherUnits": "%",
          "max": 150,
          "unit": "kW",
          "percent": 0,
          "status": false
        }
      ],
      "output": {
        "generation": 0,
        "load": 0,
        "frequency": 50,
        "id": "output",
        "title": "Output",
        "value": 0,
        "max": 1600,
        "unit": "kW",
        "percent": 0,
        "status": false
      }
    };

    var maxGeneration = 1000;

    // Create HTML. True if it has a message area.
    var theTechnologies = {
      wind: { enabled: true, status: true },
      solar: { enabled: true, status: true },
      diesel: { enabled: true, status: false },
      resistor: { enabled: false, status: true },
      battery: { enabled: false, status: true },
      flywheel: { enabled: false, status: true }
    };

    var theTechnologies = {
      
      diesel: { enabled: true, status: false },
      resistor: { enabled: true, status: true },
      battery: { enabled: true, status: true },
      flywheel: { enabled: true, status: true },
      wind: { enabled: true, status: true },
      solar: { enabled: true, status: true }
    };
    
    //if enabled => true, show the Tech Block and Arrow
    //   color   => Arrow color, and ball color 
      var theTechnologies = {
      wind: { enabled: true, status: true, color:'#a6c600' },
      solar: { enabled: true, status: true, color:'#F28214' },
      diesel: { enabled: true , status: true, color:'#008b91' },
      resistor: { enabled: true, status: true,color:'#865FC5' },
      battery: { enabled: true, status: true, color:'#F28214' },
      flywheel: { enabled: true, status: true, color:'#4EC3EE' }
    };
      
      var labs = ["wind","solar","diesel","resistor","battery","flywheel"];
      
    var dhtml =  "<div class='hydro'>";
    



  var count = 0;
  for (tech in theTechnologies) {
      // tech   -- wind
      // theTechnologies[tech]  ---  { enabled: true, status: true }


    // if enabled - then add the tech
    if (theTechnologies[tech].enabled){
            count += 1;
    }
  }


    dhtml +=  "<div class='hydro-dashboard component-count-" + count + "'>";
        

    dhtml += buildHTML('div', { class: 'flag renewables' }, "100% Renewable");
    dhtml += buildHTML('div', { class: 'flag windspill' }, "Renewable Surplus");
      
      
    var techno = 1;
      
    for (tech in theTechnologies) {
      // if enabled - then add the tech
      if (theTechnologies[tech].enabled){
        dhtml += buildTech(tech, theTechnologies[tech], techno);
       
        techno += 1;
      }
    }
    
    
      var width;
      var height;
      var sizes=[];
      
   function getNowCanvasSize(){
      width = document.body.clientWidth;
      height = document.body.clientHeight;
      arisi = 45;

      /* 
      * Canvas Size 
      *   [ Width, Hight ]  , 
      *   based on the =>  hydro-dashboard.css
      *     grid-template-columns: 3% 12% 5% 14% 2% 10% 8% 10% 2% 14% 5% 12% 3%;
      *     grid-template-rows: 30px 5px 90px 5px 90px 10px 35px 0px 35px 5px 90px 10px 70px 170px 10px;
      */

      sizes = [
                   [195,0.12*height], //195px 12%  => arrow1
                   [195,0.12*height], //195px 12%  => arrow2
                   [arisi,0.05*height], //40px, 12%  => arrow3
                   [arisi,0.05*height], //40px, 12%  => arrow4
                   [arisi,0.05*height], //40px, 18%  => arrow5
                   [arisi,0.05*height]  //40px, 18%  => arrow6
                  ];
   }
      // Based on the Explorer's Size, to draw Canvas
      getNowCanvasSize();
      
     for(var i =1;i<techno;i++){
          //Draw Path . class="arrow techArrow1 arrow1"
          dhtml += buildHTML('canvas', { class: 'arrow path'+i ,height:sizes[i-1][0]+'px',width:sizes[i-1][1]+'px' }, "here");
          
          //Draw Arrow.  class="arrow path1" 
          dhtml += buildHTML('canvas', { class: 'arrow techArrow'+i+' arrow'+i ,height:sizes[i-1][0]+'px',width:sizes[i-1][1]+'px' }, "here");
          
         console.log(i);
         
      }
       
      
      
    dhtml += buildHTML('div', { class: 'item output active' },
        buildHTML('div', { class: 'header' }, 
        buildHTML('div', { class: 'title' }, "Island Generation")) +
        buildHTML('div', { class: 'other' }, "") +
        buildHTML('div', { class: 'body' },
        buildHTML('div', { class: 'total' },
          buildHTML('span', { class: 'value' }, "100") +
          buildHTML('span', { class: 'units' }, "kW"))));
    //dhtml += buildHTML('canvas', { class: 'arrow output-arrow arrow-top-bottom' }, "");
      
     

      dhtml += buildHTML('canvas', { class: 'arrow output-arrow outputA',height:'105px',width:'78px' }, "here");
      dhtml += buildHTML('canvas', { class: 'arrow output-arrow pathOutPut',height:'105px',width:'78px' }, "here");

      
    //dhtml += buildHTML('div', { class: 'arrow output-arrow active' }, " ");
    dhtml += buildHTML('div', { class: 'item customer-demand active' }, 
      buildHTML('div', { class: 'header' }, 
        buildHTML('div', { class: 'title' }, "Customer Demand")) +
      buildHTML('div', { class: 'body' },
        buildHTML('div', { class: 'total' },
          buildHTML('span', { class: 'value' }, "0") +
          buildHTML('span', { class: 'units' }, "kW")) +
        buildHTML('div', { class: 'other' },
          buildHTML('span', { class: 'name' }, "") +
          buildHTML('span', { class: 'value' }, "0") +
          buildHTML('span', { class: 'units' }, "% RE"))));
    dhtml += buildHTML('div', { class: 'item customer' },
      buildHTML('div', { class: 'chart' }, ""));

    dhtml += "</div>";
    dhtml += "</div>";

    this.html(dhtml);
      
      var times = [];
        
      // arrow number: [start, end, current_state, the state of positive direction]
      //  |
      //  |
      //  \
      //   `_ _ _\
      //         /        this is top - right, if this is positive
      //
      //
      //                  Then 
      //    /|\
      //     |
      //     \
      //      `_ _ _ _     this is negative 
      //
      //           
                                                // 1 - negative
                                                // 2 - stop
                                                // 3 - positive
       dictTF = [false, 0, true];
       dicts = {1:['left','bottom',2,3], //Arrow1 direction
                2:['right','bottom',2,3],
                3:['right','bottom',2,1],
                4:['left','bottom',2,1],
                5:['top','right',2,3],
                6:['top','left',2,3]
               };
  
           for( var i =1; i<techno;i++){
            var lab = theTechnologies[labs[i-1]];
          
            if( lab.enabled){
                // time[i] is the clock of setInterval, because once the aimeeArrows() begin, then it will enter Loop.
                // only can use time[i] to stop the loop.
                
                // Draw Arrow   times[]  1 2 3 4 5 6
                times[i] = $('.arrow'+i).aimeeArrows(dicts[i][0], dicts[i][1], dictTF[dicts[i][2]-1], false,false, lab["color"]);
                // Draw Path    times[]  11 12 13 14 15 16
                times[i+10] = $('.path'+i).aimeeArrows(dicts[i][0], dicts[i][1], dictTF[dicts[i][2]-1], false,true, lab["color"]);
             }
       
          
          }
    
      // Draw the line from "Island Generation" to "Customer Demand" Block
      var aaa = $('.outputA').aimeeArrows('top','bottom',true, true,false, "green");
      var aaa = $('.pathOutPut').aimeeArrows('top','bottom',true, true,true, "green");
           
    $('.tech').click(function(){
      if (clickedOn){
        // fetch the tech name
        var name = $(this).attr('technology');
        clickedOn(name);
          
          
             //clearInterval(aaa);
          
            // var ctx = $('.outputA')[0].getContext("2d");
            // ctx.clearRect(0,0,78,105);
            
            // $('.outputA').aimeeArrows('top','bottom',false);
            
          
          
          //alert(aaa);
      }
    });
      
      

    loadData(defaultConfig);
     // loadData(theTechnologies);

    this.on('stop', function () {
      $.hogs.pause();
      console.log('Dashboard paused.');
    });
    this.on('start', function () {
      console.log('Dashboard started: ' + project);
      if ($.hogs.loaded) {
          console.log('Dashboard already loaded');
          resizeChart();
      } else {
        $.hogs.onChange(loadData, project); // onchange data
        loadChart();
      }
    }); // On start
      
     
      document.body.onresize=function(){
         
       getNowCanvasSize();
        
       loadData(defaultConfig);
    };

    //Check if there is a statement change of line.
    //If change =>  stop || reverse
    
    function chag(v,i,c){
        var pro = dicts[i][3];  //get the positive state direction
        var negtive = dicts[i][3]==3?1:3;   // get the negative state direction
        var now = dicts[i][2];   // get Now state direction
        var stop = 2;            // get Stop state 

       
        
        //Value of the Tech
        // v < 0 ===> next direction is negative direction 
        if(v<0){
            next = negtive;
        }else if(v==0){
            next = stop;
        }else{
            next = pro;
        }
        
        //Having changes
        if(now != next){
           // stop the loop of draw arraw and path.
            clearInterval(times[i]);
            clearInterval(times[i+10]);
            
            if(next == stop){
                times[i] = $('.arrow'+i).aimeeArrows(dicts[i][0],dicts[i][1],dictTF[next-1], false,false,  c);
                times[i+10] = $('.path'+i).aimeeArrows(dicts[i][0],dicts[i][1],dictTF[next-1], false,true,  c);
                
            }else{
                times[i] = $('.arrow'+i).aimeeArrows(dicts[i][0],dicts[i][1],dictTF[next-1], true,false, c);
                times[i+10] = $('.path'+i).aimeeArrows(dicts[i][0],dicts[i][1],dictTF[next-1], true,true, c);
             
            }
            
            dicts[i][2] = next;
             
            
        }
    

    }

    
      
    function loadData(data) {
     
       // console.log(theTechnologies);
      //console.log(data);
      var arrownum=0;
        
      for (var i = 0; i < data.technologies.length; i++) {
        var technology = data.technologies[i];
        var tech = $('.' + technology.id);
        var arrow = $('.' + technology.id + '-arrow');
        // Populate title and value
          

          
          
        
        var lab = theTechnologies[labs[i]];
          
        if( lab.enabled){
             chag(technology.value,arrownum+1,lab["color"]);
             arrownum++;
         }
        
          
          
          
        $('.body .value', tech).html(technology.value);
        $('.body .units', tech).html(technology.units);
        $('.percentage .value', tech).html(technology.percent);
        $('.header .status', tech).html(technology.status ? "ON" : "OFF");
        if (technology.otherUnits && technology.other > 0){
          if (technology.id != "battery"){
            $('.other .value', tech).html(technology.other);
            $('.other .name', tech).html(technology.otherName);
            $('.other .units', tech).html(technology.otherUnits);
          }else{
            //console.log(technology.other);
            if (technology.other > 80){
              $('.tech-icon.battery-icon').addClass('battery-icon-5');
              $('.tech-icon.battery-icon').removeClass('battery-icon-4');
              $('.tech-icon.battery-icon').removeClass('battery-icon-3');
              $('.tech-icon.battery-icon').removeClass('battery-icon-2');
              $('.tech-icon.battery-icon').removeClass('battery-icon-1');
            } else if (technology.other > 60){
              $('.tech-icon.battery-icon').removeClass('battery-icon-5');
              $('.tech-icon.battery-icon').addClass('battery-icon-4');
              $('.tech-icon.battery-icon').removeClass('battery-icon-3');
              $('.tech-icon.battery-icon').removeClass('battery-icon-2');
              $('.tech-icon.battery-icon').removeClass('battery-icon-1');
            } else if (technology.other > 40){
              $('.tech-icon.battery-icon').removeClass('battery-icon-5');
              $('.tech-icon.battery-icon').removeClass('battery-icon-4');
              $('.tech-icon.battery-icon').addClass('battery-icon-3');
              $('.tech-icon.battery-icon').removeClass('battery-icon-2');
              $('.tech-icon.battery-icon').removeClass('battery-icon-1');
            } else if (technology.other > 20){
              $('.tech-icon.battery-icon').removeClass('battery-icon-5');
              $('.tech-icon.battery-icon').removeClass('battery-icon-4');
              $('.tech-icon.battery-icon').removeClass('battery-icon-3');
              $('.tech-icon.battery-icon').addClass('battery-icon-2');
              $('.tech-icon.battery-icon').removeClass('battery-icon-1');
            } else {
              $('.tech-icon.battery-icon').removeClass('battery-icon-5');
              $('.tech-icon.battery-icon').removeClass('battery-icon-4');
              $('.tech-icon.battery-icon').removeClass('battery-icon-3');
              $('.tech-icon.battery-icon').removeClass('battery-icon-2');
              $('.tech-icon.battery-icon').addClass('battery-icon-1');
            }
          }
        }else{
            $('.other .value', tech).html("");
            $('.other .name', tech).html("");
            $('.other .units', tech).html("");
        }
        if (technology.status) {
          $(tech).addClass('active');
          //$(arrow).addClass('active');
          /*if (technology.value > 0) {
            $(arrow).addClass('positive');
            $(arrow).removeClass('negative');
          } else if (technology.value < 0) {
            $(arrow).removeClass('positive');
            $(arrow).addClass('negative');
          } else {
            $(arrow).removeClass('positive');
            $(arrow).removeClass('negative');
            $(arrow).removeClass('active');
            $(tech).removeClass('active');
          }*/
        } else {
          //$(arrow).removeClass('positive');
          //$(arrow).removeClass('negative');
          //$(arrow).removeClass('active');
          $(tech).removeClass('active');
        }

      }
      $('.output .total .value').html(data.output.generation);
            
      //$('.output .other .value').html(data.outp'ut.frequency);
      $('.customer-demand .other .value').html(data.percentageRenewables);

      //$('.customer-demand .other').html(data.percentageRenewables + "%");
      //$('.customer .graph-bar.r2 .value').css('width', data.percentageRenewables + "%");

      var output = 0;
      //data.output.max  = 2000;
      output = (data.output.value / data.output.max) * 100;
      //$('.customer .graph-bar.r1 .value').css('width', output + "%");
      $('.customer-demand .body .total .value').html(data.output.value);
      //$('.customer .max.r1').html(data.output.max + " kW");
      
      if (data.zdo) {
        $('.flag.renewables').addClass("active");
      } else {
        $('.flag.renewables').removeClass("active");
      }
      //data.zdoTime = "1:00";
      $('.zdotime .time').html(data.zdoTime);
      if (data.zdoTime) {
        $('.zdotime').show();
        $('.zdotime').addClass("active");
      } else {
        $('.zdotime').hide();
      }
      if (data.surplusRenewables) {
        $('.flag.windspill').addClass("active");
      } else {
        $('.flag.windspill').removeClass("active");
      }

      // update chart
      //updateChart(new Date().getTime() + 10*60*60*1000, data.output.value-600);
      //updateChart(new Date().getTime() + 10*60*60*1000, data.percentageRenewables);
    }


    // tech = wind
    // detail ={ enabled: true, status: true }
    function buildTech(tech, detail, techno) {
      var status = "";

      if (detail.status) {
        status = buildHTML('div', { class: 'status' }, "off");
      }

      var html = buildHTML('div', { class: "item tech " + tech + " tech-" + techno, technology: tech },
      //var html = buildHTML('div', { class: "item tech " + tech, technology: tech },
        buildHTML('div', { class: "header" },
          buildHTML('div', { class: 'title' }, tech) +
          status) +
        buildHTML('div', { class: "body" },
          buildHTML('span', { class: 'value' }, "0") +
          buildHTML('span', { class: 'units' }, "kW")) +
        buildHTML('div', { class: "footer" },
          buildHTML('span', { class: 'percentage' },
            buildHTML('span', { class: 'value' }, "0") +
            buildHTML('span', { class: 'units' }, "%")) +
          buildHTML('span', { class: 'other' },
            addOther(tech)) +
          addZdoTime(tech)
          ));
      html += buildHTML('div', { class: "arrow " + tech + "-arrow" }, ' ');
      html += buildHTML('div', { class: "tech-icon " + tech + "-icon" }, ' ');
      return html;
    }

    function addOther(tech) {
      //if (tech != 'battery'){
        return buildHTML('span', { class: 'name' }, "") +
          buildHTML('span', { class: 'value' }, "") +
          buildHTML('span', { class: 'units' }, "");
      //}
    }

    function addZdoTime(tech){
      if (tech === 'diesel') {
        return buildHTML('span', { class: 'zdotime' }, 
            buildHTML('span', { class:'icon ion-clock' }, "") + 
            buildHTML('span', { class:'time' }, "")
          );
      }
      return "";
    }

    function buildHTML(tag, attrs, html) {
      // you can skip html param
      if (typeof (html) !== 'string') {
        attrs = html;
        html = null;
      }
      var h = '<' + tag;
      for (var attr in attrs) {
        if (attrs[attr] === false)
          continue;
        h += ' ' + attr + '="' + attrs[attr] + '"';
      }
      return h += html ? ">" + html + "</" + tag + ">" : "/>";
    }

    function resetChart(time){
      chart.xAxis[0].update({ min: time });
      chart.xAxis[0].update({ max: time + window });
      chart.series[0].setData([]);
    }

    function updateChart(time, value) {
      if (chart == null){
        return;
      }
      // do we need to shift the window?
      if (chart.xAxis[0].max < time) {
          resetChart(time);
      }
      chart.series[0].addPoint({
          x: time,
          y: value
      }, true, false);
    }

    var window = (10 * 60 * 1000);
    var chart;

    function resizeChart(){
      console.log('hydro-dashboard.resizeChart()');
    }
    function loadChart(){
      console.log('hydro-dashboard.loadChart()');
      if (chart) {
        resetChart(new Date().getTime());
      }
      else {
        console.log('hydro-dashboard.loadChart() - creating for first time...');
        var container = $('.customer .chart');
        chart = new Highcharts.Chart({
          chart: {
              renderTo: container[0],
              backgroundColor:'rgba(255, 255, 255, 0.0)',
              type: 'area',
              /*spacingTop: 15,*/
              /*marginTop: 10,*/
              /*marginLeft: 34,
              marginBottom: 15    */        
          },
          plotOptions: {
            area: {
              lineWidth: 2,
              lineColor: '#8DC63F',
              marker: {
                enabled: false,
                fillColor: '#FFF',
                lineColor: '#8DC63F',
                lineWidth: 1,
                radius: 1
              },
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.Color('#8DC63F').setOpacity(0.5).get('rgba')],
                  [1, Highcharts.Color('#8DC63F').setOpacity(0).get('rgba')]
                ]
              },
              opacity: 1
            },
          },
          xAxis: {
              //categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16', '17', '18','19','20','21','22','23','24'],
              type: 'datetime',
              lineWidth: 2,
              lineColor: '#FFF',
              tickLength: 0,
              minTickInterval: 1,
              labels: {
                y: 10,
                margin: 0,
                style: { color: '#FFF', fontSize: '8' },
                autoRotation: 0
              },
              min: new Date().getTime(),
              max: new Date().getTime() + window
          },
          yAxis: {
            lineWidth: 2,
            lineColor: '#FFF',
            gridLineColor: '#395563',
            gridLineWidth: 1,
            minTickInterval: 10,
            tickInterval: 20,
            tickLength: 0,
            min: 0,
            max: 100,
            labels: {
              x: -5,
              zIndex: 10,
              style: { color: '#FFF', fontSize: '10' }
            },
            title: {
              text: '',
              margin: 10,
              style: { color: '#FFF', fontSize: '13' }
            }
          },
          credits: { enabled: false },
          legend: { 
            enabled:true,
            itemStyle:{
              fontSize : '8px',
              color: '#FFFFFF'
            },
            itemDistance: 10,
            maxHeight: '10px'
          },
          title: { enabled:false, text:'' },
          series: [{
            color:'#8DC63F',
            name: 'Renewable Energy %'
            //data: [10, 15, 10, 20, 25, 39, 60, 100, 100, 50, 40, 80, 100, 90, 90, 50, null, null, null, null, null, null, null, null]
          }]
      });
      }
    }

    return this;
  }; // hydroDashboard


})(jQuery);
