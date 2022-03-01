const searchPhoon = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
    `;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top w-30" alt="...">
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
const loadPhoneDetails = phoneId => {
    console.log(phoneId);
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(phoneData => displayPhoneDetails(phoneData.data));
}
const displayPhoneDetails = phoneDtails => {
    console.log(phoneDtails);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src='${phoneDtails.image}' class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phoneDtails.name}</h5>
        <p class="card-text">${phoneDtails.releaseDate}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
    </ul>
    `;
    phoneDetails.appendChild(div);
}