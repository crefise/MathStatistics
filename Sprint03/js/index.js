let user_data = new Map();

document.getElementById("set_default").onclick = () => {
    user_data.set("B1A1", [14.85, 11.94, 10.5, 12.35, 15.62, 13.2, 10.62, 12.82, 11.48, 13.5]);
    user_data.set("B1A2", [6.42, 5.23, 4.96, 5.6, 9.82, 10.23, 12.44, 16.5, 5.41, 6.32]);
    user_data.set("B1A3", [7.82, 9.63, 12.92, 10.82, 9.36, 5.11, 13.52, 14.2, 8.96, 9.92]);

    user_data.set("B2A1", [12.5, 13.8, 14.9, 12.6, 10.85, 11.96, 12.6, 13.42, 16, 17.2]);
    user_data.set("B2A2", [10.2, 10.85, 12.34, 11.95, 12.4, 14.92, 9.86, 9.62, 8.36, 13.62]);
    user_data.set("B2A3", [13.62, 12.55, 14.7, 13.25, 14.66, 8.35, 10.96, 11.62, 6.12, 15.66]);


    let input_data_html = document.getElementsByClassName("data");
    input_data_html[0].value = user_data.get("B1A1");
    input_data_html[1].value = user_data.get("B1A2");
    input_data_html[2].value = user_data.get("B1A3");
    input_data_html[3].value = user_data.get("B2A1");
    input_data_html[4].value = user_data.get("B2A2");
    input_data_html[5].value = user_data.get("B2A3");
    console.log(user_data.get("B1A1"));

}

document.getElementById("calculate").onclick = () => { 
    document.getElementById("B1A1_result_table").innerHTML = user_data.get("B1A1");
    document.getElementById("B1A2_result_table").innerHTML = user_data.get("B1A2");
    document.getElementById("B1A3_result_table").innerHTML = user_data.get("B1A3");

    document.getElementById("B2A1_result_table").innerHTML = user_data.get("B2A1");
    document.getElementById("B2A2_result_table").innerHTML = user_data.get("B2A2");
    document.getElementById("B2A3_result_table").innerHTML = user_data.get("B2A3");


    let block_mean_html = document.getElementsByClassName("block_mean");

    block_mean_html[0].innerHTML  = get_mean_from_array(user_data.get("B1A1"));
    block_mean_html[1].innerHTML  = get_mean_from_array(user_data.get("B1A2"));
    block_mean_html[2].innerHTML  = get_mean_from_array(user_data.get("B1A3"));
    block_mean_html[3].innerHTML  = get_mean_from_array(user_data.get("B2A1"));
    block_mean_html[4].innerHTML  = get_mean_from_array(user_data.get("B2A2"));
    block_mean_html[5].innerHTML  = get_mean_from_array(user_data.get("B2A3"));

    let rows_mean_html = document.getElementsByClassName("rows_mean");

    let arr = [
        
    ]
    rows_mean_html[0].innerHTML = get_mean_from_array([ 
        get_mean_from_array(user_data.get("B1A1")),
        get_mean_from_array(user_data.get("B1A2")),
        get_mean_from_array(user_data.get("B1A3"))
    ]);

    rows_mean_html[1].innerHTML = get_mean_from_array([ 
        get_mean_from_array(user_data.get("B2A1")),
        get_mean_from_array(user_data.get("B2A2")),
        get_mean_from_array(user_data.get("B2A3"))
    ]);
    
    let columns_mean_html = document.getElementsByClassName("columns_mean");

    columns_mean_html[0].innerHTML = get_mean_from_array([
        get_mean_from_array(user_data.get("B1A1")),
        get_mean_from_array(user_data.get("B2A1"))
    ]);

    columns_mean_html[1].innerHTML = get_mean_from_array([
        get_mean_from_array(user_data.get("B1A2")),
        get_mean_from_array(user_data.get("B2A2"))
    ]);

    columns_mean_html[2].innerHTML = get_mean_from_array([
        get_mean_from_array(user_data.get("B1A3")),
        get_mean_from_array(user_data.get("B2A3"))
    ]);
    
    let general_mean_html = document.getElementsByClassName("general_mean");
    general_mean_html[0].innerHTML = get_mean_from_array([
        rows_mean_html[0].innerHTML,
        rows_mean_html[1].innerHTML,
        columns_mean_html[0].innerHTML,
        columns_mean_html[1].innerHTML,
        columns_mean_html[2].innerHTML
    ]);



    let sum_of_square_means_html = document.getElementsByClassName("sum_of_square_means");

   // let temp = user_data.get("B2A1").length * 2;
    let temp = 0;
    for (let i = 0; i < 3; i++) {
       temp += (parseFloat(columns_mean_html[i].innerHTML) - parseFloat(general_mean_html[0].innerHTML))**2;
    }
    let Q1 = temp * user_data.get("B2A1").length * 2;


    temp = 0;
    for (let i = 0; i < 2; i++) {
       temp += (parseFloat(rows_mean_html[i].innerHTML) - parseFloat(general_mean_html[0].innerHTML))**2;
    }
    let Q2 = temp * user_data.get("B2A1").length * 3;




    temp = 0;

    for (let i = 1; i <= 3; i++) {
        for (let z = 1; z <= 2; z++) {
            temp += (parseFloat(block_mean_html[i*z-1].innerHTML) - parseFloat(columns_mean_html[i-1].innerHTML) - parseFloat(rows_mean_html[z-1].innerHTML) + parseFloat(general_mean_html[0].innerHTML))**2
        }
    }
    let Q3 = temp;



    temp = 0;

    for (let n = 0; n < 10; n++) {
        for (let i = 1; i <= 3; i++) {
            for (let z = 1; z <= 2; z++) {
                let temp_2;
                if (i == 0) {
                    if (z == 0) {
                        temp_2 = user_data.get("B1A1")[n];
                    } else {
                        temp_2 = user_data.get("B2A2")[n];
                    }
                } else if (i == 1) {
                    if (z == 0) {
                        temp_2 = user_data.get("B1A2")[n];
                    } else {
                        temp_2 = user_data.get("B2A2")[n];
                    }
                } else {
                    if (z == 0) {
                        temp_2 = user_data.get("B1A3")[n];
                    } else {
                        temp_2 = user_data.get("B2A3")[n];
                    }
                }
                temp += (temp_2 - parseFloat(block_mean_html[i*z-1].innerHTML))**2;
            }
        }
    }
    let Q4 = temp;



    temp = 0;

    for (let n = 0; n < 10; n++) {
        for (let i = 1; i <= 3; i++) {
            for (let z = 1; z <= 2; z++) {
                let temp_2;
                if (i == 0) {
                    if (z == 0) {
                        temp_2 = user_data.get("B1A1")[n];
                    } else {
                        temp_2 = user_data.get("B2A2")[n];
                    }
                } else if (i == 1) {
                    if (z == 0) {
                        temp_2 = user_data.get("B1A2")[n];
                    } else {
                        temp_2 = user_data.get("B2A2")[n];
                    }
                } else {
                    if (z == 0) {
                        temp_2 = user_data.get("B1A3")[n];
                    } else {
                        temp_2 = user_data.get("B2A3")[n];
                    }
                }
                temp += (temp_2 - parseFloat(general_mean_html[0].innerHTML))**2;
            }
        }
    }
    let Q = temp;


    let q_html = document.getElementsByClassName("sum_of_square_means");
    q_html[0].innerHTML = Q1.toFixed(3);
    q_html[1].innerHTML = Q2.toFixed(3);
    q_html[2].innerHTML = Q3.toFixed(3);
    q_html[3].innerHTML = Q4.toFixed(3);
    q_html[4].innerHTML = Q.toFixed(3);

    let degree_of_freedomhtml = document.getElementsByClassName("degree_of_freedom");
    degree_of_freedomhtml[0].innerHTML = 2;
    degree_of_freedomhtml[1].innerHTML = 1;
    degree_of_freedomhtml[2].innerHTML = 2;
    degree_of_freedomhtml[3].innerHTML = 54;
    degree_of_freedomhtml[4].innerHTML = 59;


    let general_variation_html = document.getElementsByClassName("general_variation");
    general_variation_html[0].innerHTML = (Q1 / 2).toFixed(2);
    general_variation_html[1].innerHTML = (Q2 / 1).toFixed(2);
    general_variation_html[2].innerHTML = (Q3 / 2).toFixed(2);
    general_variation_html[3].innerHTML = (Q4 / 54).toFixed(2);
    general_variation_html[4].innerHTML = (Q / 59).toFixed(2);


    let F1 =    ((Q1 / 2).toFixed(2)) / (Q4 / 54).toFixed(2);
    let F2 =    (Q2 / 1).toFixed(2) / (Q4 / 54).toFixed(2);
    let F3 =    (Q3 / 2).toFixed(2) / (Q4 / 54).toFixed(2);




    create_html_element("H0: Influences of factor A", "div", "gipotez", "result_html", "id");
    create_html_element("F(A) - " + F1.toFixed(3), "div", "text", "result_html", "id");
    create_html_element("F(table) - " + 4.023, "div", "text", "result_html", "id");
    if (F1 > 4.023) {
        create_html_element("TRUE", "div", "result", "result_html", "id"); 
    }
    else {
        create_html_element("FALSE", "div", "result", "result_html", "id"); 
    }

    create_html_element("H0: Influences of factor B", "div", "gipotez", "result_html", "id");
    create_html_element("F(B) - " + F2.toFixed(3), "div", "text", "result_html", "id");
    create_html_element("F(table) - " + 4.023, "div", "text", "result_html", "id");
    if (F2 > 4.023) {
        create_html_element("TRUE", "div", "result", "result_html", "id"); 
    }
    else {
        create_html_element("FALSE", "div", "result", "result_html", "id"); 
    }

    create_html_element("H0: Influences of factor A&B", "div", "gipotez", "result_html", "id");
    create_html_element("F(A&B) - " + F3.toFixed(3), "div", "text", "result_html", "id");
    create_html_element("F(table) - " + 4.023, "div", "text", "result_html", "id");
    if (F3 > 4.023) {
        create_html_element("TRUE", "div", "result", "result_html", "id"); 
    }
    else {
        create_html_element("FALSE", "div", "result", "result_html", "id"); 
    }
}

function get_mean_from_array(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += parseFloat(array[i]);
    }
    return (sum / array.length).toFixed(2);
}