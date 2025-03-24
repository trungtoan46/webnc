document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');

        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, productName, price })
        });

        const result = await response.json();
        alert(result.message);
    });
});
