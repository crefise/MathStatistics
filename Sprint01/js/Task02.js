function task02 (varies_near) {
    console.log("task02_take");
    console.log(varies_near);
    destroy_charts();
    remove_elemelts_with_class("result_chart");
    remove_elemelts_with_class("function_result");
    remove_elemelts_with_class("named_task02");

    for (let i = 0; i < varies_near.length; i++) {
        create_html_element(let_arr[i], "div", "named_task02", "task_02", "id");

        print_chart(varies_near[i][0],varies_near[i][1], "chart" + i,"Polygon of transmission frequencies", "result_chart", "task_02", "id",1);


        h = Math.abs(varies_near[i][0][0] - varies_near[i][0][varies_near[i][0].length-1]);
        let h_arr = new Array(varies_near[i][0].length);
        h_arr.fill(h);
    
    
        xh_arr = new Array(varies_near[i][1].length);
        for (let z = 0; z < varies_near[i][1].length; z++) {
           xh_arr[z] = varies_near[i][1][z] / h;
        }
        print_chart(xh_arr, h_arr, "chart_" + i,"Histogram of frequencies", "result_chart", "task_02", "id",2);
    
    
    
        print_function(varies_near[i]);
    
    
        print_chart(varies_near[i][0], varies_near[i][4], "chart3" + i,"Histogram of frequencies", "result_chart", "task_02", "id",2); 
        
    }
} 



function print_function(varies_near) {
    let str = "<pre><fieldset><legend>Empirical function</legend>        ";
    str += varies_near[4][0] + ", x <= " + varies_near[0][0] + "<br>"; 
    for (let i = 1; i < varies_near[0].length; i++) {
        if (i == parseInt(varies_near[0].length / 2)) {
            str += "F*(x) = "
        } else {
            str += "        ";
        }
        if (i == varies_near[0].length-1) {
            str += varies_near[4][i] + ", x => " + varies_near[0][i] + "<br>";
        }
        else {
            str += varies_near[4][i] + ", " + varies_near[0][i-1] + " < x =< " + varies_near[0][i] + "<br>";
        }

    }
    str += "</fieldset></pre>";
    create_html_element(str, "div" ,"function_result", "task_02" , "id");
}


