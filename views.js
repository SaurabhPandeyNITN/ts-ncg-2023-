let arrViews = JSON.parse(localStorage.getItem("arrViews"))
let arrTableData = [];
console.log(arrViews)
arrViews.map(view => {
    view = JSON.parse(view)
    arrTableData.push({
        "id":arrTableData.length,
        "name":view.name,
        "chartType":view.chartType,
        "country":view.country,
        "indicator":view.indicator,
        "startYear":view.startYear,
        "endYear":view.endYear,
        "timestamp":view.currentTime
    })
})
//initialize table
var table = new Tabulator("#example-table", {
    data:arrTableData, //assign data to table
    autoColumns:true, //create columns from data field names
});