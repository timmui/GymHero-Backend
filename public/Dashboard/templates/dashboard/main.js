var total = 70;
var totalc = 150;
var tread = 32;
var treadc = 70;
var free = 24;
var freec = 40;
var machine = 14;
var machinec = 40;

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
    ['Occupied',     machine],
    ['Free',      machinec-machine]
    ]);

    var options4 = {
        title: 'MACHINES',
        pieHole: 0.4,
    };
        
    var chart1 = new google.visualization.PieChart(document.getElementById('donutchart1'));
    var chart2 = new google.visualization.PieChart(document.getElementById('donutchart2'));
    var chart3 = new google.visualization.PieChart(document.getElementById('donutchart3'));
    var chart4 = new google.visualization.PieChart(document.getElementById('donutchart4'));

    chart1.draw(data1, options1);
    chart2.draw(data2, options2);
    chart3.draw(data3, options3);
    chart4.draw(data4, options4);

};
