document.getElementById("set_size").onchange = () => {

    remove_elemelts_with_class("input_set_box");

    let set_count = document.getElementById("set_size").value;
    
    let str = "";
    for (let i = 0; i < set_count; i++) {
        str += "<div class = 'solo_data_set'><div>" +  let_arr[i] + ": </div><input class = 'input_set_data' set = '"+ let_arr[i] +"'><div>" + 
                                        "<button class = 'randomize_button' set = '"+ let_arr[i] +"'>rand</button></div></div>";
    }
    
    create_html_element(str, "div", "input_set_box", "input_box", "id");

    set_randomize_buttons();
}

function set_randomize_buttons (){
    let randomize_buttons = document.getElementsByClassName("randomize_button");
        for (let index = 0; index < randomize_buttons.length; index++) {
            randomize_buttons[index].onclick = () => {
                let set_name = randomize_buttons[index].getAttribute("set");
                let rand_arr = randomize_to_str(0,0,15);
                console.log(rand_arr);

                let set_html = document.querySelector("input[set = '" + set_name + "']");
                set_html.value = rand_arr[1];
             }
            
        }
}


document.getElementById("calculate_button").onclick = () => {
    let set_count = document.getElementById("set_size").value;
    
    let res_set = [];

    for (let i = 0; i < set_count; i++) {
        let new_set = document.querySelector("input[set = '" + let_arr[i] + "']").value.split(" ");
        new_set = del_empty_element_in_arr(new_set);
        res_set.push(new_set);
    }

    for (let i = 0; i < res_set.length; i++) {
        for (let z = 0; z < res_set[i].length; z++) {
            res_set[i][z] = parseFloat(res_set[i][z]);
        }

    }

    let res_task01 = task01(res_set);
    task02(res_task01);
    task03(res_task01);
    task04(res_task01);
    task05(res_task01);

}