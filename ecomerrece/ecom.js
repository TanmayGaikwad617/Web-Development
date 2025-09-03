document.addEventListener('DOMContentLoaded',()=>{
    const productList =document.getElementById('product-list');
    const cartitemsDisplay =document.getElementById('cart-items');
    const emptycartmessage =document.getElementById('empty-cart');
    const totalcartMessagse =document.getElementById('cart-total');
    const totalpricedisplay =document.getElementById('total-price');
    const checkoutButton =document.getElementById('checkout-btn');

    const cart=[];

    const products=[
        {id:123,name:"Product 1",price:29.99},
        {id:212,name:"Product 3",price:19.99},
        {id:146,name:"Product 2",price:39.99},
    ];

    products.forEach((product) => {
        const productDiv=document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML=`
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        <button class="btndelete">Delete</button>
        `;
        
        const deleteBtn = productDiv.querySelector(".btndelete");

        // style it
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.padding = "6px 12px";
        productDiv.style.padding="5px";

        productList.appendChild(productDiv);
    });

        productList.addEventListener("click",(e)=>{
                if(e.target.tagName ==="BUTTON"){
                 const productID=parseInt(e.target.getAttribute("data-id"));
                 const product=products.find(p=>p.id===productID);
                 addtocart(product);
                }
        });


    function addtocart(product){
        cart.push(product);
        rendercart();
    }

    function rendercart(){
        let totalprice=0;
        cartitemsDisplay.innerText="";
       
        if (cart.length>0) {
            emptycartmessage.classList.add("hidden");
            totalcartMessagse.classList.remove('hidden');
            
            cart.forEach((item,index)=>{
                totalprice+=item.price;
                
                const cartItem= document.createElement('div');
                 
                cartItem.innerHTML=`
                    ${item.name}-$${item.price.toFixed(2)}
                `;
                cartitemsDisplay.appendChild(cartItem);  
                totalpricedisplay.textContent=`${totalprice.toFixed(2)}` ; 
            });
            
        } else {
            emptycartmessage.classList.remove("hidden");
            totalpricedisplay.textContent=`0.00` ; 

        }
        
    }

     checkoutButton.addEventListener('click',()=>{
        cart.length=0;
        alert("Checkout Succesful");
        rendercart();

     })


});