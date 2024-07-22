// index.js

// Click event is fired and displayBurgerDetails is invoked
// the info burger contains is different depending on which element is clicked
const displayBurgerDetails = (burger) => {
    
    // find element that will display image
    const imageElement = document.getElementById('image');
    // set src to image property of burger object
    imageElement.src = burger.image

    const burgerName = document.getElementById('name')
    burgerName.textContent = burger.name;

    const numberInCartCountElement = document.getElementById('number-in-cart-count')
    numberInCartCountElement.textContent = burger.number_in_cart;

};

const addToCart = () => {
    // find the form   
   const addToCartForm = document.getElementById('add-to-cart-form')
    // attatch an event listener to the form   
   addToCartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // this is the elment that our form submission number will be added to.
    const numberInCartCountElement = document.getElementById('number-in-cart-count')
    // input element that has id 'number-to-add' numberToAddElement.value will return the form input
    const numberToAddInputElement = document.getElementById('number-to-add');
    // console.log(numberInCartCountElement.textContent)
    numberInCartCountElement.textContent = Number(numberToAddInputElement.value) + Number(numberInCartCountElement.textContent);
    console.log(numberInCartCountElement.textContent)



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
            // restarauntMenu.appendChild(spanElement);

            // DELETE BUTTON 
            const divElement = document.createElement('div')
            const deleteButton = document.createElement('button')
            deleteButton.textContent = "Delete"

            divElement.appendChild(spanElement)
            divElement.appendChild(deleteButton)
            restarauntMenu.appendChild(divElement);

            deleteButton.addEventListener("click", () => {
                divElement.remove();
            })
        
            // add an event listener to each span element
            spanElement.addEventListener("click", () => {
                // when fired, the displayBurgerDetails function fires, and it has been populated with 
                // the information from the individual burger object
                displayBurgerDetails(burger);
            });
    })
    // this code grabs the first burger in our json object and sets it as the default display when the page loads
    displayBurgerDetails(burgers[0]);
});
}

const main = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addBurgerNamesToMenu()
        addToCart()
    })
}

main()

