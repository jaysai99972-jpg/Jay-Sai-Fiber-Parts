// Product data
const products = [
  { id:1, name:"Front Body Panel", price:749, img:"body kit.jpg" },
  { id:2, name:"Side Body Set", price:1299, img:"Side Panel.jpg" },
  { id:3, name:"Front Mudguard", price:499, img:"body kit.jpg" },
  { id:4, name:"Headlight Cover", price:549, img:"Side Panel.jpg" },
  { id:5, name:"Tail Panel", price:699, img:"body kit.jpg" }
];

let cart = [];

const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItemsDiv = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

const phoneNumber = "919049103072"; // ← YOUR NUMBER

// Render products
function renderProducts(){
  productGrid.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₹ ${p.price}</p>
      <div class="actions">
        <button onclick="addToCart(${p.id})">Add to Cart</button>

        <!-- WhatsApp Order Button -->
        <a class="btn outline" 
           href="https://wa.me/${phoneNumber}?text=I%20want%20to%20buy%20${encodeURIComponent(p.name)}" 
           target="_blank">
          Order WhatsApp
        </a>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

window.addToCart = function(productId){
  const p = products.find(x=>x.id===productId);
  if(!p) return;
  const exist = cart.find(i=>i.id===p.id);
  if(exist) exist.qty++;
  else cart.push({...p, qty:1});
  updateCartUI();
}

function updateCartUI(){
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);

  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item=>{
    total += item.price * item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <img src="${item.img}" alt="">
      <div style="flex:1">
        <strong>${item.name}</strong>
        <div>₹ ${item.price} x ${item.qty}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button onclick="changeQty(${item.id},1)" class="btn">+</button>
        <button onclick="changeQty(${item.id},-1)" class="btn outline">-</button>
      </div>
    `;

    cartItemsDiv.appendChild(div);
  });

  cartTotalEl.textContent = total;
}

window.changeQty = function(id, delta){
  const it = cart.find(x=>x.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty <= 0) cart = cart.filter(x=>x.id!==id);
  updateCartUI();
}

cartBtn.addEventListener('click', ()=>{ 
  cartModal.style.display='flex'; 
  updateCartUI();
});

closeCart.addEventListener('click', ()=>{ 
  cartModal.style.display='none'; 
});

clearCartBtn.addEventListener('click', ()=>{
  cart = [];
  updateCartUI();
});

// Checkout WhatsApp
checkoutBtn.addEventListener('click', ()=>{
  if(cart.length === 0){ 
    alert('Cart empty'); 
    return; 
  }

  let msg = 'नमस्ते JAY SAI, मैं ये ऑर्डर करना चाहता हूँ:%0A';

  cart.forEach(it=>{
    msg += `${it.name} - ${it.qty} x ₹${it.price} = ₹${it.qty*it.price}%0A`;
  });

  msg += `Total: ₹${cart.reduce((s,i)=>s+i.qty*i.price,0)}%0A`;
  msg += 'नाम: __%0Aफोन: __%0Aपता: __';

  const url = `https://wa.me/${phoneNumber}?text=${msg}`;
  window.open(url, '_blank');
});

// Contact Form (demo)
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('धन्यवाद! आपका संदेश मिला।');
  this.reset();
});

// initial
renderProducts();
updateCartUI();
