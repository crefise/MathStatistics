document.getElementById("set_size_task").onchange = () => {
    let set_count = document.getElementById("set_size_task").value;
    
    remove_elemelts_with_class("input_set_box");
    let str = input_table_to_str(set_count);
    create_html_element(str, "div", "input_set_box", "input_box", "id");

}

document.getElementById("set_size_task_other_task").onchange = () => {
    let set_count = document.getElementById("set_size_task_other_task").value;
    
    remove_elemelts_with_class("input_set_box_other_task");
    let str = input_table_to_str(set_count);
    create_html_element(str, "div", "input_set_box_other_task", "input_box_other_task", "id");

}

document.getElementById("set_default").onclick = () => {
    document.getElementById("set_size_task").value = 10;
    remove_elemelts_with_class("input_set_box");
    let str = input_table_to_str(10, "data");
    create_html_element(str, "div", "input_set_box", "input_box", "id");
    let input_data = document.getElementsByClassName("data");
    for (let i = 0, p = 0; i < 10; i++) {
        for (let z = 0; z < 3; z++, p++) {
            input_data[p].value = variant_5[i][z];
        }
    }
}

document.getElementById("set_default_other_task").onclick = () => {
    document.getElementById("set_size_task_other_task").value = 10;
    remove_elemelts_with_class("input_set_box_other_task");
    let str = input_table_to_str(10, "data_other_task");
    create_html_element(str, "div", "input_set_box_other_task", "input_box_other_task", "id");
    let input_data = document.getElementsByClassName("data_other_task");
    for (let i = 0, p = 0; i < 10; i++) {
        for (let z = 0; z < 3; z++, p++) {
            input_data[p].value = additional_variant_5[i][z];
        }
    }
}

document.getElementById("calculate_button").onclick = () => {
    // task01
    destroy_charts();
    remove_elemelts_with_class("result_task01");
    remove_elemelts_with_class("info_task01");
    remove_elemelts_with_class("result_chart");
    remove_elemelts_with_class("gipotez");
    remove_elemelts_with_class("result_task01_result");
    
    let data_arr = get_user_data_from_table("data");
    let VariesNear = get_varies_near_from_arr(data_arr);

    VariesNear.set("sample_average", get_sample_average(VariesNear.get("sample"), VariesNear.get("repeat"), VariesNear.get("size")));
    VariesNear.set("standard_deviation", get_sample_standard_deviation(
                                            VariesNear.get("sample"), 
                                            VariesNear.get("repeat"), 
                                            VariesNear.get("size"),
                                            VariesNear.get("sample_average"))
                                        );

    let temp = get_theoretical_frequencies(VariesNear);
    VariesNear.set("theoretical_frequencies", temp[0]);
    VariesNear.set("hit_chance", temp[1]);
    VariesNear.set("interval_str", interval_to_str(VariesNear.get("array")));
    
    console.log(VariesNear);


    let info_for_table = [];
    info_for_table.push(VariesNear.get("interval_str"));
    info_for_table.push(VariesNear.get("repeat"));
    info_for_table.push(VariesNear.get("hit_chance"));

    create_html_element("Interval statistical series", "h1", "result_task01", "task_01", "id");

    let table_str = print_table_in_str(info_for_table, 
                                    [
                                        "Interval",
                                        "Frequencies",
                                        "Hit chanse"
                                    ]);
    create_html_element(table_str, "div", "result_task01", "task_01", "id");



    print_chart(VariesNear.get("hit_chance"),VariesNear.get("interval_str"), "chart1","Interval statistical series", "result_chart", "task_01", "id",2);


    let table_str_2 = print_table_in_str([ VariesNear.get("theoretical_frequencies") ], 
        [
            "Theoretical frequencies"
        ]);
    create_html_element(table_str_2, "div", "result_task01", "task_01", "id");

    create_html_element("H0: Assume that is distributed according to the normal law of distribution", "div", "gipotez", "task_01", "id");


    VariesNear.set("freedom", VariesNear.get("repeat").length - 3);
    VariesNear.set("observed_value", get_observed_value(VariesNear));
    VariesNear.set("critical_point", 14.1);
    create_html_element("Power of freedom - " + VariesNear.get("freedom"), "div", "info_task01", "task_01", "id");
    create_html_element("Observed value P - " + VariesNear.get("observed_value"), "div", "info_task01", "task_01", "id");
    create_html_element("Critical point p - " + VariesNear.get("critical_point"), "div", "info_task01", "task_01", "id");

    let mode;
   if ( VariesNear.get("critical_point") < VariesNear.get("observed_value")) {
        mode = false;
   }
   else {
        mode = true;
   }

   create_html_element("Reuslt: " + mode, "div", "result_task01_result", "task_01", "id");





   
    let VariesNear_2 = get_varies_near_from_arr(get_user_data_from_table("data_other_task"));
    VariesNear_2.set("sample_average", get_sample_average(VariesNear_2.get("sample"), VariesNear_2.get("repeat"), VariesNear_2.get("size")));
    VariesNear_2.set("standard_deviation", get_sample_standard_deviation(
        VariesNear_2.get("sample"), 
        VariesNear_2.get("repeat"), 
        VariesNear_2.get("size"),
        VariesNear_2.get("sample_average"))
    );

    VariesNear.set("variance", get_selective_variance(
    VariesNear.get("sample"), 
    VariesNear.get("repeat"), 
    VariesNear.get("size"),
    VariesNear.get("sample_average"))
    );

    VariesNear_2.set("variance", get_selective_variance(
        VariesNear_2.get("sample"), 
        VariesNear_2.get("repeat"), 
        VariesNear_2.get("size"),
        VariesNear_2.get("sample_average"))
    );

    create_html_element("H0: Assume that D(X)=D(Y)", "div", "gipotez", "task_02", "id");
    create_html_element("Power of freedom(1) - " + (VariesNear.get("sample").length - 1), "div", "info_task01", "task_02", "id");
    create_html_element("Power of freedom(2) - " + (VariesNear_2.get("sample").length - 1), "div", "info_task01", "task_02", "id");

    create_html_element("Variance(1) - " + VariesNear.get("variance"), "div", "info_task01", "task_02", "id");
    create_html_element("Variance(2) - " + VariesNear_2.get("variance"), "div", "info_task01", "task_02", "id");


    let F;
    if ( VariesNear.get("variance") >  VariesNear_2.get("variance") ) {
        F =  VariesNear.get("variance")  /  VariesNear_2.get("variance");
    } else {
        F =  VariesNear_2.get("variance")  /  VariesNear.get("variance");
    }

    create_html_element("Observed value F - " + F, "div", "info_task01", "task_02", "id");
    create_html_element("Critical point f - 3.179" + F, "div", "info_task01", "task_02", "id");


    if (F > 3.179) {
        mode = false;
   }
   else {
        mode = true;
   }

   create_html_element("Reuslt: " + mode, "div", "result_task01_result", "task_02", "id");

}



