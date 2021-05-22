let variant_5 = [
    [3.45, 3.55, 10],
    [3.55, 3.65, 16],
    [3.65, 3.75, 22],
    [3.75, 3.85, 30],
    [3.85, 3.95, 34],
    [3.95, 4.05, 20],
    [4.05, 4.15, 14],
    [4.15, 4.25, 10],
    [4.25, 4.35, 6],
    [4.35, 4.45, 4]
];
let additional_variant_5 = [
    [3.45, 3.55, 5],
    [3.55, 3.65, 25],
    [3.65, 3.75, 32],
    [3.75, 3.85, 60],
    [3.85, 3.95, 74],
    [3.95, 4.05, 50],
    [4.05, 4.15, 34],
    [4.15, 4.25, 20],
    [4.25, 4.35, 10],
    [4.35, 4.45, 5]
];

let charts = [];


function destroy_charts() {
    let size = charts.length;
    console.log(charts);
    for (let i = 0; i < size; i++) {
        charts[i].destroy();
    }
}
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
    


function input_table_to_str(set_count, class_name) {
    let str = "<table><tr><td>Start of interval</td><td>End of interval</td><td>Value of interval</td></tr>";
    for (let i = 0; i < set_count; i++) {
        str += "<tr><td><input class = '"+class_name+"'></td><td><input class = '"+class_name+"'></td><td><input class = '"+class_name+"'></td></tr>";
    }
    
     str += "</table>";
    return str;
} 

function get_user_data_from_table (class_name) {
    let data = document.getElementsByClassName(class_name);

    let size = parseInt(document.getElementById("set_size_task").value);

    let result = [];
    for (let i = 0, index=0; i < size; i++) {
        let temp = [];
        for (let z = 0; z < 3; z++, index++) {
            temp.push(data[index].value);
        }
        result.push(temp.slice());
        temp = [];
    }
    return result;
}

function get_varies_near_from_arr(array) {
    let VariesNear = new Map();

    let first = [];
    let second = [];
    for (let i = 0; i < array.length; i++) {
        let temp = (array[i][1]-array[i][0])/2;
        temp = parseFloat(temp) +  parseFloat(array[i][0]);
        first.push(temp);
        second.push(array[i][2]);
        
    }
    let size = 0;
    for (let i = 0; i < array.length; i++) {
        size += parseInt(array[i][2]);
        
    }
    VariesNear.set("sample", first);
    VariesNear.set("repeat", second);
    VariesNear.set("size",  size);
    VariesNear.set("array", array);

    return VariesNear;
}

function get_sample_average(set1,set2,size) {
    let sum = 0.0;
    for (let i = 0; i < set1.length; i++) {
       sum += set1[i]*set2[i];
    }
    sum = sum / size;
    return sum;
}

function get_selective_variance(arr1, arr2, size, sample) {
    let sample_average = sample;

    let result = 0.0;
    for (let index = 0; index < arr1.length; index++) {
        result += (arr2[index] * Math.pow(arr1[index] - sample_average, 2));
    }
    return result / size;
}

function get_sample_standard_deviation (arr1, arr2,size, sample){
    return Math.sqrt(get_selective_variance(arr1,arr2,size, sample));
}
/*
function laplase(x){
    x = x / 1.414213562
    a1 = 0.254829592
    a2 = -0.284496736
    a3 = 1.421413741
    a4 = -1.453152027
    a5 = 1.061405429
    p = 0.3275911
    s = 1
    t = 1 / (1 + s * p * x)
    b = Math.exp(-x * x)
    y = (s * s + s) / 2 - s * (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * b / 2
    return y;
}
*/

function method_parabol(func ,a, b, n) {
    let h=(b-a)/n;
    let k=0.0;
    let x=a + h
    for (let i = 1; i < n/2 + 1; i++) {
      k += 4*func(x);
      x += 2*h;
    }

    x = a + 2*h;
    for(let i = 1; i < n/2; i++) {
        k += 2*func(x)
        x += 2*h
    }
    return (h/3)*(func(a)+func(b)+k)
}


function func (z) {
    return Math.E ** (-1 * z ** 2 / 2);
}
function laplase(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * method_parabol(func, 0.0, x, 500) 
} 


function get_theoretical_frequencies(VariesNear) {
    let theoretical_frequencies = [];
    let hit_chance = [];
    for (let index = 0; index < VariesNear.get("sample").length; index++) {
        let x0 = VariesNear.get("array")[index][0];
        let x1 = VariesNear.get("array")[index][1];
        let n = VariesNear.get("size");

        let z0 = (x0 - VariesNear.get("sample_average")) / VariesNear.get("standard_deviation");
        let z1 = (x1 - VariesNear.get("sample_average")) / VariesNear.get("standard_deviation");
        let F0 = laplase(z0);
        let F1 = laplase(z1);
        hit_chance.push((F1 - F0).toFixed(5));
        theoretical_frequencies.push((n*(F1 - F0)).toFixed(5));
    }
    
    return [theoretical_frequencies, hit_chance];
}

function interval_to_str(array) {
    let result = [];
    for (let index = 0; index < array.length; index++) {
        let temp = "[";
        temp += array[index][0];
        temp += ";";
        temp += array[index][1];
        temp += ")";
        result.push(temp);
        temp = [];
    }
    return result;
}


function print_table_in_str(data_array, names_array) {
    let str = "<table>";
    console.log(data_array);
    str+="<tr>";
    for (let i = 0; i < names_array.length; i++) {
        str += "<td>"+ names_array[i] +"</td>"
    }
    str+="</tr>";

    for (let i = 0; i < data_array[0].length; i++) {
        str+="<tr>";
        for (let z = 0; z < data_array.length; z++) {
            str += "<td>"+ data_array[z][i] +"</td>";
        }
        str+="</tr>";
    }
    str += "</table>";

    return str;
}


function get_observed_value(VariesNear) {
    let result = 0;
    for (let i = 0; i < VariesNear.get("repeat").length; i++) {
        let temp = VariesNear.get("repeat")[i] - VariesNear.get("theoretical_frequencies")[i];
        temp = temp **2;
        result += temp /  VariesNear.get("theoretical_frequencies")[i];
    }
    return result;
}

