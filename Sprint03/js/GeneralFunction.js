



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



