var total = 12;
var totalc = 50;
var tread = 5;
var treadc = 12;
var ec = 3;
var freee= 10;
var free = 2;
var freec = 15;
var machine = 2;
var machinec = 13;


$(function(){
    $.ajax({
  url: "https://gymhero.herokuapp.com/api/currentData",
  type: "GET",
  dataType: "json",
  success: function( data ) {
    generateData(data);
  },
  error: function(error){
    console.log("Error: ");
    console.log(error);
  }
})}
    );

function generateData(data){
    var avalibleEquipment = ['Treadmill',  'Free Weights', 'Elliptical', 'Bench Press'];
    //Variable to count the number of element retrive from server
    var pc = 0;
    var tm = 0;
    var wt = 0;
    var el = 0;
    var bp = 0;
    total = data.length;

    for (var i = 0; i < data.length; i++){
         var data= data[i];
         var eq = data.get("equipment");
         var Actual = avalibleEquipment[ec];
         if (Actual == 'Treadmill'){
            tm += 1;
         } else if (Actual == "FreeWeights"){
            wt += 1;
         } else if (Actual == "Elliptical"){
            el += 1;
         } else {
            bp += 1;
         }
        }
    tread = tm;
    ec = el;
    free = wt;
    machine = bt;

    }

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);



function drawChart() {
    
    var data1 = google.visualization.arrayToDataTable([
        ['Category', 'People'],
        ['Occupancy',     total],
        ['Free',      totalc - total]
    ]);

var options1 = {
    title: 'TOTAL PATRONS',
    pieHole: 0.4,
};

var data2 = google.visualization.arrayToDataTable([
        ['Category', 'People'],
        ['Occupied',     tread],
        ['Free',      treadc - tread]
    ]);

var options2 = {
    title: 'TREADMILLS',
    pieHole: 0.4,
    };

var data3 = google.visualization.arrayToDataTable([
        ['Category', 'People'],
        ['Occupied',     free],
        ['Free',      freec - free]
    ]);

    var options3 = {
        title: 'WEIGHTS',
        pieHole: 0.4,
    };

var data4 = google.visualization.arrayToDataTable([
        ['Category', 'People'],
        ['Occupied',     ec],
        ['Free',      freee - ec]
    ]);

    var options4 = {
        title: 'Elliptical',
        pieHole: 0.4,
    };


var data5 = google.visualization.arrayToDataTable([
    ['Category', 'People'],
    ['Occupied',     machine],
    ['Free',      machinec-machine]
    ]);

    var options5 = {
        title: 'Bench Press',
        pieHole: 0.4,
    };
        
    var chart1 = new google.visualization.PieChart(document.getElementById('donutchart1'));
    var chart2 = new google.visualization.PieChart(document.getElementById('donutchart2'));
    var chart3 = new google.visualization.PieChart(document.getElementById('donutchart3'));
    var chart4 = new google.visualization.PieChart(document.getElementById('donutchart4'));
    var chart5 = new google.visualization.PieChart(document.getElementById('donutchart5'));

    chart1.draw(data1, options1);
    chart2.draw(data2, options2);
    chart3.draw(data3, options3);
    chart4.draw(data4, options4);
    chart5.draw(data5, options5);

};
