const main = document.getElementById('main');
const add_user = document.getElementById('add_user');
const double = document.getElementById('double');
const show_millionaires = document.getElementById('show_millionaires');
const sortByMoney = document.getElementById('sort');
const calculate_wealth = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Data and get a random user
async function getRandomUser() {
    const res = await fetch(`https://randomuser.me/api/`);
    const data = await res.json();
    //console.log(data)

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000) 
    }

    addData(newUser);
}

// Double the moneyyy
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });

    updateDOM();
}

// Sort by richest
function richestFirst() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Filter only the millionaires
function onlyMillionaires() {
    data = data.filter(user => user.money > 1000000)

    updateDOM();
}

// Calculate Wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Add new obj to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const heading = document.createElement('div');
        heading.classList.add('person');
        heading.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(heading);
    })
}

// Format number as money
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listerners 
add_user.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
sortByMoney.addEventListener('click', richestFirst);
show_millionaires.addEventListener('click', onlyMillionaires);
calculate_wealth.addEventListener('click', calculateWealth);
