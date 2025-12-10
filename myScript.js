/* ========================================
   navbar-hamburger MENU
   ======================================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

//array indexed as follows: [0]name, [1]color, [2]price, [3]stock [4]image-src, [5]desc.
const tshirts = [
['Legacy T-Shirt','Red','£7.99','good-stock','images/tshirts/tshirt1.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Green','£7.99','last-few','images/tshirts/tshirt2.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Blue','£7.99','out-of-stock','images/tshirts/tshirt3.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Cyan','£7.99','good-stock','images/tshirts/tshirt4.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Magenta','£7.99','out-of-stock','images/tshirts/tshirt5.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Yellow','£7.99','last-few','images/tshirts/tshirt6.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
['Legacy T-Shirt','Black','£7.99','out-of-stock','images/tshirts/tshirt7.jpg','Sadly we are sold out of this legendary item. Keep an eye out for future stock.'],
['Legacy T-Shirt','Grey','£7.99','good-stock','images/tshirts/tshirt8.jpg','Perfect for those graduating this year. Get a bargain whilst we have the stock.'],
['Legacy T-Shirt','Burgundy','£7.99','last-few','images/tshirts/tshirt9.jpg','Limited stock. Grab these nostalgic items before they make their way onto eBay.'],
];

/* ========================================
    PRODUCT PAGE
   ======================================== */
const productList= document.getElementById('product-list');
const stockFilter= document.getElementById('stock-filter');
if(productList){
//Render products based on filter
function renderProducts(filter){
productList.innerHTML=' ';

//Then we wil loop through the items and give each a div and a class
tshirts.forEach(([name,color,price,stock,imgSrc,desc],index)=>{
if(filter!=='all' && stock !== filter)return;
const card = document.createElement('div');
card.className='product-itself';

//Apply styles using a template litteral
card.innerHTML=`
<img src = "${imgSrc}" alt= "${name} - ${color}">
<h3>${name} - ${color}</h3>
<p>${desc}</p>
<p><strong>${price}</strong></p>
<p class="stock-status ${stock}">${stock.replace(/-/g, ' ')}</p>
<a href="item.html" class= "view-button" onclick="sessionStorage.setItem('selectedProduct', ${index})">View More</a>
<button class ="product-page-button"onclick="addToCart(${index})">Add to Cart</button>
`;

productList.appendChild(card)
});
}
//Initial load Show all
renderProducts('all');

//Add eventListener for changes
if(stockFilter){
stockFilter.addEventListener('change', (e) =>
{renderProducts(e.target.value);
});
}
}
/* ========================================
    ITEM PAGE
   ======================================== */
//Use the saved index
const selectedIndex = sessionStorage.getItem('selectedProduct');

//Use the container
const detailContainer = document.getElementById('product-detail');
if(detailContainer){
	if(selectedIndex !== null){
	//Destructure product data
	const[name,color,price,stock,imgSrc,desc] = tshirts[selectedIndex];
	//Load the Product 
	detailContainer.innerHTML=`
	<div class="product-detail-card">
	<img src="${imgSrc}" alt="${name} - ${color}">
	<h2>${name} - ${color}</h2>
	<p>${desc}</p>
	<p><strong>${price}</strong></p>
	<p class="stock-status ${stock}"> ${stock.replace(/-/g, ' ')}</p>
	<button onclick="addToCart(${selectedIndex})">Add to Cart</button>
	</div>
	`;
	}
	else	{
	detailContainer.innerHTML = '<p> No product selected</p>';
	}}
/* ========================================
    ADD TO CART BUTTONS FUNCTION
   ======================================== */
function addToCart(index){
	//Access the product data from the array
	const[name,color,price,stock,imgSrc,desc]=tshirts[index];
	//Create an object to store the product's data
	const item={name,color,price,stock,imgSrc,desc};
	//check if the item is already stored, if not store it
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	//If its not already stored, store it 
	cart.push(item);
	//Update the saved Cart
	localStorage.setItem('cart',JSON.stringify(cart));
	//Create alert box
	alert(`${name} - ${color} has been added to your Cart!`);
}
