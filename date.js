exports.getDate = function () {
    const today = new Date();
    const currentDay = today.getDay();
    const options = {
        weekday: "long",
        month: "long",
        year: "numeric"
    }
    return today.toLocaleDateString("tr-TR", options);
}

module.exports.getDay = function () {
    const today = new Date();
    const options = {
        weekday: "long"
    }
    return today.toLocaleDateString("tr-TR", options);
}