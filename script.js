const main = document.getElementById('main');
const add_user = document.getElementById('add_user');
const double = document.getElementById('double');
const show_millionaires = document.getElementById('show_millionaires');
const sort = document.getElementById('sort');
const calculate_wealth = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Data
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
