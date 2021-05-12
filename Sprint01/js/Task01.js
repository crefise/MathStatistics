function task01 (set) {
    console.log("Starting task1...");
    console.log("set that took task01: " + set);
   
    let VariesNear = get_varies_near(set.slice());
    VariesNear.push(get_accumulated_frequencies(VariesNear[1]));
    VariesNear.push(get_relative_frequencies(VariesNear[1], set.length))
    VariesNear.push(get_accumulated_frequencies(VariesNear[3]));

    remove_elemelts_with_class("task01_result")
    print_varies_near(VariesNear);


    console.log("Ending task1...");
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