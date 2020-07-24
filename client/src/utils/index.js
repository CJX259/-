
export const deepClone = (origin) => {
    var newObj = origin instanceof Array ? [] : {};
    for (var item in origin) {
        var temple = typeof origin[item] == 'object' ? deepClone(origin[item]) : origin[item];
        newObj[item] = temple;
    }
    return newObj;
}