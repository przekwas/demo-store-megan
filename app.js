store.forEach(item => {
    $('#main-list').append(`
        <li class="list-group-item list-group-item-action d-flex justify-content-between">
            <span class="font-weight-bold">${item.name}</span>
            <span class="font-italic">$${item.price} ea.</span>
            <button onclick="addItem(${item.id})" class="btn btn-sm btn-secondary shadow-sm">+</button>
        </li>
    `);
});

$('#feedback').hide();

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const updateTotal = () => {
    let total = 0;
    for (let key in cart) {
        total += cart[key].quantity * cart[key].price
    };
    $('#total').text(`${formatter.format(total)}`);
};

const addItem = id => {

    if ($(`#${id}`).length === 0) {

        cart[id] = {
            name: store[id - 1].name,
            price: store[id - 1].price,
            quantity: 1
        };

        let itemRow = $(`
        <tr id="${id}">
            <th scope="row">${cart[id].name}</th>
            <td class="font-italic" id="${id}-quantity">${cart[id].quantity}</td>
            <td class="text-monospace" id="${id}-price">${formatter.format(cart[id].quantity * cart[id].price)}</td>
        </tr>
        `);
        $('tbody').append(itemRow);

        updateTotal();

    } else {

        cart[id].quantity += 1;
        $(`#${id}-quantity`).text(cart[id].quantity);
        $(`#${id}-price`).text(formatter.format(cart[id].quantity * cart[id].price));

        updateTotal();

    }
};

const submitCart = () => {
    $('tbody').empty();
    $('#total').text('');
    $('#feedback').fadeIn(1000).delay(1500).fadeOut(1000);
};