const searchPhoon = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data 
    searchField.value = '';
    if (searchText == '') {
        document.getElementById('error').style.display = 'block';
    }
    else {
        // load data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)));
    }

}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (phones.length == 0) {
        document.getElementById('error').style.display = 'block';
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                
                <div class="d-grid justify-content-end">
    
                  <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-dark text-white rounded-pill me-md-2" type="button">Details</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }

}
const loadPhoneDetails = phoneId => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(phoneData => displayPhoneDetails(phoneData.data));
}


const displayPhoneDetails = phoneDtails => {
    // console.log(phoneDtails);
    const phoneDetails = document.getElementById('phone-details');
    // phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src='${phoneDtails.image}' class="card-img-top w-50" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phoneDtails.name}</h5>
        <h5 class="card-title">${phoneDtails.brand}</h5>
        <p class="card-text">${phoneDtails.releaseDate || 'no release date fund'}</p>
        <h3>Main Features</h3>
        <p class="card-text">Chipset: ${phoneDtails?.mainFeatures.chipSet}</p>
        <p class="card-text">Display size: ${phoneDtails?.mainFeatures.displaySize}</p>
        <p>Memory: ${phoneDtails?.mainFeatures.memory}</p>
        <h3>Other Features</h3>
        <p>Bluetooth: ${phoneDtails?.others?.Bluetooth ?? "not fund"}</p>
        <p>GPS: ${phoneDtails?.others?.GPS ?? "not fund"}</p>
        <p>NFC: ${phoneDtails?.others?.NFC ?? "not fund"}</p>
        <p>Radio: ${phoneDtails?.others?.Radio ?? "not fund"}</p>
        <p>USB: ${phoneDtails?.others?.USB ?? "not fund"}</p>
        <p>WLAN: ${phoneDtails?.others?.WLAN ?? "not fund"}</p>
<h6>Sensors details</h6>
        <p>${phoneDtails?.mainFeatures.sensors}</p>

    </div>
    `;
    phoneDetails.appendChild(div);
}