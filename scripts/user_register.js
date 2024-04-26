// Parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    const data = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};

        for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = values[j];
        }

        data.push(entry);
    }

    return data;
}

function populateDropdown(data) {
    const select = document.querySelector('#country');

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.Code;
        option.textContent = item.Name;
        select.appendChild(option);
    });
}

// Fetch CSV data
fetch('countries_code.csv')
    .then(response => response.text())
    .then(csv => {
        const data = parseCSV(csv);
        populateDropdown(data);
    })
    .catch(error => console.error('Error fetching CSV data:', error));


const storeOwnerRadio = document.querySelector('#storeOwner');
const storeFieldsDiv = document.querySelector('#storeFields');

storeOwnerRadio.addEventListener('change', function () {
    if (this.checked) {
        storeFieldsDiv.style.display = 'block';
    } else {
        storeFieldsDiv.style.display = 'none';
    }
});