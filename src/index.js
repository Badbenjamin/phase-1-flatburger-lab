// index.js

// Click event is fired and displayBurgerDetails is invoked
// the info burger contains is different depending on which element is clicked
const displayBurgerDetails = (burger) => {
    const imageElement = document.getElementById('image');
    imageElement.src = burger.image

    const burgerName = document.getElementById('name')
    burgerName.textContent = burger.name;

    const numberInCartCountElement = document.getElementById('number-in-cart-count')
    numberInCartCountElement.textContent = burger.number_in_cart;

};

const addToCart = () => {
  
   const addToCartForm = document.getElementById('add-to-cart-form')
   addToCartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const numberInCartCountElement = document.getElementById('number-in-cart-count')
    const numberToAddElement = document.getElementById('number-to-add');
    
    numberInCartCountElement.textContent = Number(numberToAddElement.value) + Number(numberInCartCountElement.textContent);
    



   })
}

const addBurgerNamesToMenu = () => {
    // find restaraunt menu div and grab with binding
    const restarauntMenu = document.getElementById('restaurant-menu');
    // make server call to the db.json
    fetch("http://localhost:3000/burgers")
    // recive raw data, parse json
    .then(response => response.json())
    // once promise obj is returned, execute function
    .then(burgers => {
        // data returns a json list of burgers, burgers.ForEach loops through individual elements
        burgers.forEach(burger => {
            // for each element (burger) the forEach creates a span element and adds the name attribute to the text content
            const spanElement = document.createElement('span');
            spanElement.textContent = burger.name
            // add the span element to the restarauntMenu div
            restarauntMenu.appendChild(spanElement);
        
            // add an event listener to each span element
            spanElement.addEventListener("click", () => {
                // when fired, the displayBurgerDetails function fires, and it has been populated with 
                // the information from the individual burger object
                displayBurgerDetails(burger);
                console.log("burger", burger)
            });
    })
});
}

const main = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addBurgerNamesToMenu()
        addToCart()
    })
}

main()

