function sort(arr, compareFn = (a, b) => a <= b) {

    if (!arr instanceof Array || arr.length === 0) {
        return arr;
    }

    if (typeof compareFn !== 'function') {
        throw new Error('compareFn is not a function!');
    }

    const partition = (arr, low, high) => {
        const pivot = arr[low];
        while (low < high) {
            while (low < high && compareFn(pivot, arr[high])) {
                --high;
            }
            arr[low] = arr[high];
            while (low < high && compareFn(arr[low], pivot)) {
                ++low;
            }
            arr[high] = arr[low];
        }
        arr[low] = pivot;
        return low;
    };

    const quickSort = (arr, low, high) => {
        if (low < high) {
            let pivot = partition(arr, low, high);
            quickSort(arr, low, pivot - 1);
            quickSort(arr, pivot + 1, high);
        }
        return arr;
    };

    return quickSort(arr, 0, arr.length - 1);
}

module.exports = sort