let let_arr = ["A", "B", "C", "D", "E"]; // later for  set name



function remove_elemelts_with_class(class_name) {

    let elements = document.getElementsByClassName(class_name);
    let count = elements.length;

    for (let i = 0; i < count; i++) {
        elements[0].remove();
    }
}


function create_html_element(str, type ,class_name, parrent , mode) {
    let input_box = document.createElement(type);
    input_box.classList.add(class_name);
    input_box.innerHTML = str;

    if (mode == "id") {
        document.getElementById(parrent).appendChild(input_box); 
    } else if (mode == "class") {
        document.getElementsByClassName(parrent)[0].appendChild(input_box); 
    } else if (mode == "body") {
        document.body.appendChild(input_box); 
    } else {
        console.log("Error creating element");
        return NaN;
    }
    return input_box;
}

function randomize_to_str(size = 0, min = -100, max = 100) {
    let count = size;    
    if (count == 0) {
         count = parseInt(Math.random() * 100);
    }
    console.log(count)
    
    let result_arr = new Array(count);
    let result_str = "";

    for (let i = 0; i < count; i++) {
        let num = Math.floor(Math.random() * (max - min) ) + min;
        result_arr[i] = num;
        result_str += num + " ";
    }

    return [result_arr, result_str];
}

function del_empty_element_in_arr(arr) {
    let temp_arr = arr.slice();
    let res_arr = [];
    for (let i = 0; i < temp_arr.length; i++) {
        if (temp_arr[i] == "" || !temp_arr[i]) {
            continue;
        }
        res_arr.push(temp_arr[i]);
    }
    return res_arr;
}


function del_repetitive_element(arr) {
    let temp_arr = arr.slice();
    temp_arr = temp_arr.filter(function(item, pos) {
        return temp_arr.indexOf(item) == pos;
    })
    return temp_arr;
}


function print_chart(x_arr,y_arr,id,  label,class_name, parent, mode, chart_mode) {
    let chart_div = document.createElement("div");
    chart_div.innerHTML = '<canvas id="' + id +'" class = "'+ class_name +'"></canvas>';
    
    
    if (mode == "id") {
        document.getElementById(parent).appendChild(chart_div); 
    } else if (mode == "class") {
        document.getElementsByClassName(parent)[0].appendChild(chart_div); 
    } else if (mode == "body") {
        document.body.appendChild(chart_div); 
    } else {
        console.log("Error creating element");
        return NaN;
    }

    var speedCanvas = document.getElementById(id);

    //Chart.defaults.global.defaultFontFamily = "Lato";
   // Chart.defaults.global.defaultFontSize = 18;


   if (chart_mode == 1) {
        var data_chart = {
        labels: x_arr,
        datasets: [{
            label: label,
            data: y_arr,
            lineTension: 0,
            fill: false,
            borderColor: 'black',
            backgroundColor: "white"
        },
    ]
        };

        var chartOptions = {
        legend: {
            display: true,
            position: 'top',

        }};

        var lineChart = new Chart(speedCanvas, {
            type: 'line',
            data: data_chart,
            options: chartOptions
        });
        charts.push(lineChart);
    }
    if (chart_mode == 2) {
        var densityData = {
            label: label,
            data: x_arr,
            backgroundColor: [
                'rgba(0, 99, 132, 0.6)'
            ]
          };
           
          var barChart = new Chart(speedCanvas, {
            type: 'bar',
            data: {
              labels: y_arr,
              datasets: [densityData]
            }
          })
          charts.push(barChart);
    }


}
    

function destroy_charts() {
    let size = charts.length;
    console.log(charts);
    for (let i = 0; i < size; i++) {
        charts[i].destroy();
    }
}

