function task01 (set) {
    remove_elemelts_with_class("task01_result");
    remove_elemelts_with_class("named_task01");
    let VariesNear = new Array(set.length);
    for (let i = 0; i < set.length; i++) {
        create_html_element(let_arr[i], "div", "named_task01", "task_01", "id");
        VariesNear[i] = get_varies_near(set[i].slice());
        VariesNear[i].push(get_accumulated_frequencies(VariesNear[i][1]));
        VariesNear[i].push(get_relative_frequencies(VariesNear[i][1], set[i].length))
        VariesNear[i].push(get_accumulated_frequencies(VariesNear[i][3]));
        VariesNear[i].push(set[i].length);
        VariesNear[i].push(set[i].slice());
        print_varies_near(VariesNear[i]);
        
    }

   
   
    return VariesNear;
}
function get_varies_near(set) {
    let arr =  _.countBy(set);

    let sample = [];
    let frequency = [];
    for (let key in arr) {
        sample.push(key);
        frequency.push(arr[key]);
    }

    for (let i = 0; i < sample.length-1; i++) {
        for (let z = 0; z < sample.length-1; z++) {
            if (parseFloat(sample[z]) > parseFloat(sample[z+1])) {
                let temp = sample[z];
                sample[z] = sample[z+1];
                sample[z+1] = temp;

                temp = frequency[z];
                frequency[z] = frequency[z+1];
                frequency[z+1] = temp;
            }
        }
    }

    return [sample, frequency];
}
function get_accumulated_frequencies(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let temp_sum = 0;

        for (let z = 0; z < arr.length; z++) {
           temp_sum += arr[z];
           if (z == i) {
               break;
           }
        }
        result.push(temp_sum.toFixed(5));
    }
    return result;
}
function get_relative_frequencies(arr, size) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let num = (arr[i] / size);
        result.push(parseFloat(num.toFixed(5)));
    }
    return result;
}
function print_varies_near(VariesNear) {
    let str = "<table>" +
        "<tr>" +
            "<td>" +
                "Sample"+
            "</td>" +
            "<td>" +
                "Frequency"+
            "</td>" +
            "<td>" +
                "Accumulated Frequencies"+
            "</td>" +
            "<td>" +
                "Relative Frequencies"+
            "</td>" +
            "<td>" +
                "Comulative-Relative Frequencies"+
            "</td>" +
        "</tr>";
    

    for(let i = 0; i < VariesNear[0].length; i++) {

        str += "<tr>";

        str += "<td>";
        str += VariesNear[0][i];
        str += "</td>";

        str += "<td>";
        str += VariesNear[1][i];
        str += "</td>";

        str += "<td>";
        str += VariesNear[2][i];
        str += "</td>";

        str += "<td>";
        str += VariesNear[3][i];
        str += "</td>";

        str += "<td>";
        str += VariesNear[4][i];
        str += "</td>";
        str += "</tr>";
    }
    str += "</table>";

//function create_html_element(str, type ,class_name, parrent , mode)
    create_html_element(str, "div", "task01_result", "task_01", "id");
}

//2.71 -1.2 -0.99 0.88 4.27 -0.56 0.47 -0.37 1.54 4.26 1.47 -0.68 0.65 1.43 1.47 1.75 3.95 2.07 1.96 4.06 2.99 0.33 2.92 1.59 0.74 -0.1 0.96 0.54 0.99 1.54