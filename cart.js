const save= document.getElementById('save')
        const cartItemsContainer = document.getElementById('cart-items');
        const subtotalElement = document.getElementById('subtotal');
        const applyCouponButton = document.getElementById('apply-coupon');
        const checkoutButton = document.getElementById('checkout-button');
        const continueShoppingButton = document.getElementById('continue-shopping-button');
        
        // Retrieve the cart from local storage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Function to render cart items
        function renderCart() {
          cartItemsContainer.innerHTML = '';
          let subtotal = 0;
          let totalQuantity = 0; // Initialize totalQuantity to count all items
        
          cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            totalQuantity += item.quantity; // Add to total quantity
            const row = document.createElement('tr');
            row.setAttribute('data-id', index);
            row.innerHTML = `
              <td class="product-info">
                <img alt="${item.name}" src="${item.imageUrl}" width="100" />
                <div>
                  <p>${item.name}</p>
                </div>
              </td>
              <td class="price">Rs. ${item.price}</td>
              <td class="quantValue">
                <div class="quantity-control">
                  <button class="decrease">-</button>
                  <input style="height: 25px;" type="number" value="${item.quantity}" class="quantity" min="1"/>
                  <button class="increase">+</button>
                </div>
              </td>
              <td class="total">Rs. ${itemTotal.toFixed(2)}</td>
              <td><button style="height: 25px;" class="remove">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
          });
        
          subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
          save.textContent = `Rs. ${subtotal.toFixed(2)*2-300}`;
          const productCountElement = document.getElementById('cart-count');
          productCountElement.textContent = `${totalQuantity} ${totalQuantity === 1 ? '' : ''}`;
        }
        
        // Function to update the cart storage
        function updateCartStorage() {
          localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        // Event listener for cart interactions (increase, decrease, remove)
        cartItemsContainer.addEventListener('click', function (event) {
          const target = event.target;
          const row = target.closest('tr');
          const index = row.getAttribute('data-id');
          const quantityInput = row.querySelector('.quantity');
          const price = parseFloat(row.querySelector('.price').textContent.replace('Rs. ', ''));
          let quantity = parseInt(quantityInput.value);
        
          if (target.classList.contains('increase')) {
            quantity++;
          } else if (target.classList.contains('decrease')) {
            quantity = Math.max(1, quantity - 1);
          } else if (target.classList.contains('remove')) {
            cart.splice(index, 1);
            updateCartStorage();
            renderCart();
            return;
          }
        
          cart[index].quantity = quantity;
          row.querySelector('.total').textContent = `Rs. ${(price * quantity).toFixed(2)}`;
          quantityInput.value = quantity;
          updateCartStorage();
          renderCart();
        });
        
        // Apply coupon functionality (simple implementation for now)
        applyCouponButton.addEventListener('click', function () {
          const couponCode = document.getElementById('coupon').value.trim();
          if (couponCode) {
            alert(`Coupon applied: ${couponCode}`);
            // Here you could implement coupon logic to update the subtotal
          }
        });
      
        // Checkout button
        checkoutButton.addEventListener('click', function () {
          alert('Proceeding to checkout...');
          // Here you would implement the checkout process (e.g., redirecting to a checkout page)
        });
        
        // Continue shopping button
        continueShoppingButton.addEventListener('click', function () {
          window.location.href = 'product.html'; // Redirect to product page
        });
      
        // Initial cart render
        renderCart();