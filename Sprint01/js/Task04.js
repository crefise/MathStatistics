function task04 (VariesNear) {

    remove_elemelts_with_class("named_task04");
    remove_elemelts_with_class("task_04_result");
    for (let i = 0; i < VariesNear.length; i++) {

        create_html_element(let_arr[i], "div", "named_task04", "task_04", "id");

        let mean = get_sample_average(VariesNear[i][0],VariesNear[i][1], VariesNear[i][5]);
        let varianceValue = get_selective_variance(VariesNear[i][0], VariesNear[i][1], VariesNear[i][5]);
        let sqrt = Math.sqrt(varianceValue);
    
        create_html_element('Expected Value (Moment\'s method): ' + mean, "div" ,"task_04_result", "task_04" , "id");
        create_html_element('Variance Value (Moment\'s method): ' + varianceValue, "div" ,"task_04_result", "task_04" , "id");
        create_html_element('Deviation Value (Moment\'s method): ' + sqrt, "div" ,"task_04_result", "task_04" , "id");
    
        create_html_element('Expected Value (Likelihood\'s method):' + mean, "div" ,"task_04_result", "task_04" , "id");
        create_html_element('Variance Value (Likelihood\'s method):' + varianceValue, "div" ,"task_04_result", "task_04" , "id");
        create_html_element('Deviation Value (Likelihood\'s method):' + sqrt, "div" ,"task_04_result", "task_04" , "id");
        
    }




}