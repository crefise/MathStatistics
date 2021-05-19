function task05 (VariesNear) {
    remove_elemelts_with_class("named_task05");
    remove_elemelts_with_class("task_05_result");

    for (let i = 0; i < VariesNear.length; i++) {
        create_html_element(let_arr[i], "div", "named_task05", "task_05", "id");

        let res_1 = get_standard_deviation(VariesNear[i][0],VariesNear[i][1], VariesNear[i][5], 0.95);
        let res_2 = get_interval_expected_value(VariesNear[i][0],VariesNear[i][1], VariesNear[i][5], 0.95);
        create_html_element("Expected Value (Central interval): " +res_1[0], "div", "task_05_result", "task_05", "id");
        create_html_element("Expected Value (Lower interval): " + res_1[1], "div", "task_05_result", "task_05", "id");
        create_html_element("Expected Value (Upper interval): " + res_1[2], "div", "task_05_result", "task_05", "id");

        create_html_element("Standard deviation (Central interval): " +res_2[0], "div", "task_05_result", "task_05", "id");
        create_html_element("Standard deviation (Lower interval): " + res_2[1], "div", "task_05_result", "task_05", "id");
        create_html_element("Standard deviation (Upper interval): " + res_2[2], "div", "task_05_result", "task_05", "id");
    }
}

function get_interval_expected_value (arr1,arr2,size,p) {
    const x = get_sample_average(arr1,arr2,size);
    const z = get_zScore(p)
    const s = Math.sqrt(get_corrected_selective_variance(arr1,arr2,size));

    const upper = x - z * s / Math.sqrt(size)
    const lower = x + z * s / Math.sqrt(size)

    return [x, upper, lower]
}


function get_standard_deviation (arr1,arr2,size, p) {
    let x = get_sample_average(arr1,arr2,size);
    const z = get_zScore(p)
    const s = Math.sqrt(get_corrected_selective_variance(arr1,arr2,size));

    const upper = x - z * s / Math.sqrt(size);
    const lower = x + z * s / Math.sqrt(size);

    return [x, upper, lower];
}


function get_zScore(p) {
    if (p > 1) {
        p *= 0.01
    }
    if (p < 0.5) {
        return -1 * zScore(1 - p)
    }
    if (p > 0.92) {
        if (p === 1) {
            return Infinity
        }

        const temp = Math.sqrt(-1 * Math.log(1 - p))
        
        return (((2.3212128 * temp + 4.8501413) * temp - 2.2979648) * temp - 2.7871893) / ((1.6370678 * temp + 3.5438892) * temp + 1)
    }

    p -= 0.5

    const temp = Math.pow(p, 2)

    return p * (((-25.4410605 * temp + 41.3911977) * temp - 18.6150006) * temp + 2.5066282) / ((((3.1308291 * temp - 21.0622410) * temp + 23.0833674) * temp - 8.4735109) * temp + 1)
}