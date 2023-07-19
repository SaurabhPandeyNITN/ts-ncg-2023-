let arrCountryIsoCodes = []
let arrIndicatorIds = []

let searchUrl = ""
let selectedCountryIso2Code = ""
let selectedIndicatorId = ""
let startYear = 0, endYear = 2999;

let currentTime;

async function getCountryIsoCodes(pageNumber) {
    await fetch(`https://api.worldbank.org/v2/country?page=${pageNumber}&format=json`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result);
            result[1].map(country => arrCountryIsoCodes.push([country.iso2Code, country.name]))
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function getIndicators(pageNumber) {
    await fetch(`https://api.worldbank.org/v2/indicators?page=${pageNumber}&format=json`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result);
            result[1].map(indicator => arrIndicatorIds.push(indicator.id))
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function init() {
    for (let pageNo = 1; pageNo <= 6; pageNo++) {
        await getCountryIsoCodes(pageNo)
    }
    for (let pageNo = 1; pageNo <= 60; pageNo++) {
        await getIndicators(pageNo)
    }
    console.log(arrCountryIsoCodes)
    console.log(arrIndicatorIds)
    localStorage.setItem("arrCountryIsoCodes", arrCountryIsoCodes)
    localStorage.setItem("arrIndicatorIds", arrIndicatorIds)

    addOptionsToCountrySelect(arrCountryIsoCodes)
    addOptionsToIndicatorSelect(arrIndicatorIds)


    const btnCreateView = document.getElementById('btnCreateView');
    btnCreateView.addEventListener('click', handleCreateView);
}
init()


async function handleCreateView(e) {
    e.preventDefault();
    selectedCountryIso2Code = document.getElementById('country').value
    selectedIndicatorId = document.getElementById('indicator').value
    startYear = document.getElementById('startYear').value
    endYear = document.getElementById('endYear').value
    searchUrl = `https://api.worldbank.org/v2/country/${selectedCountryIso2Code}/indicator/${selectedIndicatorId}?date=${startYear}:${endYear}&format=json`
    await invoke(searchUrl)
}
function isCanvasInUse(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        // Canvas not found
        console.log("canvas not found")
        return false;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.log("canvas context not available")
        // Canvas context not available
        return false;
    }

    // Check if the canvas has an active drawing operation
    return ctx.getImageData(0, 0, 1, 1).data.some(channel => channel !== 0);
}

function drawColumnChart(data) {
    const ctx = document.getElementById('myChart');
    if (isCanvasInUse('myChart')) {
        console.log("in use")
        const canvCtx = ctx.getContext('2d');
        canvCtx.clearRect(0, 0, ctx.width, ctx.height);
    } else {
        console.log("not in use")
    }
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data[1].map(el => el.date),
            datasets: [{
                label: '# of Votes',
                data: data[1].map(el => el.value),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function invoke(searchUrl) {
    await fetch(searchUrl, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            drawColumnChart(result)
            saveViewInLocalStorage()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function saveViewInLocalStorage() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    let viewObject = {
        "name": "temp",
        "chartType": "column",
        "country": selectedCountryIso2Code,
        "indicator": selectedIndicatorId,
        "startYear": startYear,
        "endYear": endYear,
        "currentTime":currentTime
    }
    arrViews = localStorage.getItem("arrViews")
    if (arrViews) {
        arrViews = JSON.parse(arrViews)
    } else {
        arrViews = []
    }
    arrViews.push(JSON.stringify(viewObject))
    localStorage.setItem("arrViews", JSON.stringify(arrViews))
}



function addOptionsToIndicatorSelect(myArray) {
    const selectElement = document.getElementById('indicator');

    // Clear any existing options (optional, if needed)
    selectElement.innerHTML = '';

    // Loop through the array and create new option elements
    for (const option of myArray) {
        const newOption = document.createElement('option');
        newOption.value = option; // You can set the value attribute if needed
        newOption.textContent = option;
        selectElement.appendChild(newOption);
    }
}

function addOptionsToCountrySelect(myArray) {
    const selectElement = document.getElementById('country');

    // Clear any existing options (optional, if needed)
    selectElement.innerHTML = '';

    // Loop through the array and create new option elements
    for (const option of myArray) {
        const newOption = document.createElement('option');
        newOption.value = option[0]; // You can set the value attribute if needed
        newOption.textContent = option[1];
        selectElement.appendChild(newOption);
    }
}