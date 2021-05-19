function task03 (VariesNear) {
    remove_elemelts_with_class("named_task03");
    remove_elemelts_with_class("task_03_result");

    for (let i = 0; i < VariesNear.length; i++) {
        create_html_element(let_arr[i], "div", "named_task03", "task_03", "id");

        print_sample_average(VariesNear[i][0].slice(), VariesNear[i][1].slice(), VariesNear[i][5]);
        print_median(VariesNear[i][6].slice());
        print_mode(VariesNear[i][0].slice(), VariesNear[i][1].slice());
        print_selective_variance(VariesNear[i]);
        print_sample_standard_deviation(VariesNear[i]);
        print_coefficient_of_variation(VariesNear[i]);
        print_central_moments_3(VariesNear[i]);
        print_central_moments_4(VariesNear[i]);
        print_asymmetry(VariesNear[i]);
        print_excess(VariesNear[i]);
        print_corrected_selective_variance(VariesNear[i]);
        print_corrected_sample_standard_deviation(VariesNear[i]);
        
    }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_sample_average(set1, set2, size) {
    let str = "Sample average - " + get_sample_average(set1,set2,size);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_sample_average(set1,set2,size) {
    let sum = 0.0;
    for (let i = 0; i < set1.length; i++) {
       sum += set1[i]*set2[i];
    }
    sum = sum / size;
    return sum;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_median (set) {
    let str = "Median - " + get_median(set);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_median(set) {
    let median;
    if (set.length % 2 == 0) {
        median = (set[set.length/2] + set[set.length/2 + 1]) / 2;
    } else {
        median = set[parseInt(set.length/2)];
    }
    return median;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_mode(arr1, arr2) {
    let str = "Mode - " + get_mode(arr1,arr2);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_mode(arr1,arr2) {
    let max_index = 0;
    let temp = arr2[0];

    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i] > temp) {
            max_index = i;
            temp = arr2[i];
        }
    }
    return arr1[max_index];
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_selective_variance(varies_near) {
    let str = "Selective variance - " + get_selective_variance(varies_near[0],varies_near[1],varies_near[5]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_selective_variance(arr1, arr2, size) {
    let sample_average = get_sample_average(arr1,arr2,size);

    let result = 0.0;
    for (let index = 0; index < arr1.length; index++) {
        result += (arr2[index] * Math.pow(arr1[index] - sample_average, 2));
    }
    return result / size;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_sample_standard_deviation (varies_near){
    let str = "Sample standard deviation  - " + get_sample_standard_deviation(varies_near[0],varies_near[1],varies_near[5]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_sample_standard_deviation (arr1, arr2,size){
    return Math.sqrt(get_selective_variance(arr1,arr2,size));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_coefficient_of_variation(varies_near) {
    let str = "Coefficient of variation  - " + get_coefficient_of_variation(varies_near[0],varies_near[1],varies_near[5]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_coefficient_of_variation(arr1,arr2,size) {
    return get_sample_standard_deviation(arr1,arr2,size) / get_sample_average(arr1,arr2,size) ;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_central_moments_3(varies_near) {
    console.log(varies_near);
    let str = "Central moments(3) - " + get_central_moments(varies_near[0],varies_near[1],varies_near[5],3,varies_near[6]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function print_central_moments_4(varies_near) {
    let str = "Central moments(4) - " + get_central_moments(varies_near[0],varies_near[1],varies_near[5],4, varies_near[6]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_central_moments(arr1,arr2,size,pow,set) {
    let average = get_sample_average(arr1,arr2,size);
    let result = 0.0;
    for (let i = 0; i < size; i++) {
        
        result += Math.pow((set[i] - average), pow);
    }
    return result/(size-1);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_asymmetry(varies_near) {
    let str = "Asymetry - " + get_asymmetry(varies_near[0],varies_near[1],varies_near[5],varies_near[6]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_asymmetry(arr1, arr2, size,set) {
    return ((size * get_central_moments(arr1,arr2,size,3, set) )/((size-1)*(size-2)*Math.pow(get_sample_standard_deviation(arr1,arr2,size),3)));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_excess(varies_near) {
    let str = "Excess - " + get_excess(varies_near[0],varies_near[1],varies_near[5],varies_near[6]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_excess(arr1, arr2, size,set) {
    return ((size*(size+1)*get_central_moments(arr1,arr2,size,4,set) - 3 *  get_central_moments(arr1,arr2,size,2,set)*(size-1))/( (size-1)*(size-2)*(size-3)*Math.pow(get_sample_standard_deviation(arr1,arr2,size),4)))
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_corrected_selective_variance(varies_near) {
    let str = "Corrected selective variance - " + get_corrected_selective_variance(varies_near[0],varies_near[1],varies_near[5]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_corrected_selective_variance(arr1, arr2, size) {
    return ((size - 1) / size) * get_selective_variance(arr1, arr2,size);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function print_corrected_sample_standard_deviation (varies_near){
    let str = "Sample corrected standard deviation  - " + get_sample_corrected_standard_deviation(varies_near[0],varies_near[1],varies_near[5]);
    create_html_element(str, "div" ,"task_03_result", "task_03" , "id");
}
function get_sample_corrected_standard_deviation (arr1, arr2,size){
    return Math.sqrt(get_corrected_selective_variance(arr1,arr2,size));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////