$(document).ready(function() {
    Plotly.plot('plots', data, layout);
    var plot = document.getElementById('plots');
    plot.on('plotly_hover', function(data) {
        if (data.points[0].data.type == "contour") {
            var x_data = data.points[0].data.z[ data.points[0].x ];
            var y_data = getColumnarData( 
                            data.points[0].data.z,
                            data.points[0].y
                    );
            plot.data[1].y = y_data;
            plot.data[2].x = x_data;
            Plotly.redraw(plot);
        }
    });
});



function getColumnarData(arr, j) {
    var data = [];
    for (var i=0; i<arr.length; i++) {
        data.push(arr[i][j]);
    }
    return data;
}
