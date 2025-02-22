

---


![Home Page](src/assets/images/readmeimages/landingreadme.jpeg)
![Login Page](src/assets/images/readmeimages/loginreadme.jpeg)
![Profile](src/assets/images/readmeimages/topprofilereadme.jpeg)
![Your Bookings Page](src/assets/images/readmeimages/yourbookingsreadme.jpeg)

![All Venues](src/assets/images/readmeimages/allvenuesreadme.jpeg)
![Venue Details](src/assets/images/readmeimages/venuedetailsreadme.jpeg)
![Calendar](src/assets/images/readmeimages/calendarreadme.jpeg)

![See Bookings](src/assets/images/readmeimages/seebookingstopreadme.jpeg)
![See Bookings You Manage](src/assets/images/readmeimages/seebookingsbottomreadme.jpeg)

![Venues You Manage](src/assets/images/readmeimages/venuesyoumanagereadme.jpeg)

![Create Venue](src/assets/images/readmeimages/createvenuereadme.jpeg)










---

# project-exam-2-final-kitty-alice-case year 2
---

This was the final project before the Christmas break, and the last before our final exam.




## Goal
To apply knowledge of React to build an eCom store.

## Brief
The API you are using for this brief is: https://v2.api.noroff.dev/online-shop

You can find individual items by appending a product ID at the end of the API URL e.g. https://v2.api.noroff.dev/online-shop/f99cafd2-bd40-4694-8b33-a6052f36b435

You are tasked with build out the following pages for an eCom store:

Homepage
Individual product page
Cart page
Checkout success page
Contact page
The Homepage should have a list of all the products. There should be a look-ahead search bar that filters products when typing in a product name. Clicking on a product should take a user to an individual product page.

You pages should use a <Layout> component that contains a header and footer. The header should contain a nav bar as well as a Cart icon component that acts as a button as well as displays the current number of items in the cart.

The individual product page should display data for a single product. There should be an Add to cart button which, upon clicking, adds the product to the cart. The product page should display the title of the product, the description and the image. There should also be reviews listed for the product, if there are any. You should use the discountedPrice property to display the price of the product. If there is a difference between the discountedPrice and price properties then that means there is a discount for that product. Calculate what this discount is and display it on the page.

Clicking on the Cart icon will load the Cart page, which will list all of the products as well as a total. The Cart page will have a Checkout button. Clicking this Checkout button then goes to a Checkout success page.

The Checkout success page will display a message to the user notifying them that their order was successful. There should also be a link that lets a user go back to the store. The cart must be cleared if the user gets to the Checkout success page.

There will be a contact page which will contain a contact form with the following fields. There must be form validation:

Full name (Minimum number of characters is 3, required)
Subject (Minimum number of characters is 3, required)
Email (Must be a valid email address, required)
Body (Minimum number of characters is 3, required)
You will be using React Router to switch between pages.

Your design should be responsive. You are welcome to use a CSS Framework, however, you’re encouraged to design from scratch and use styled-components or CSS Modules.

You are not required to use TypeScript.

Your code is expected to be clean and well-formatted.

## Process
Create a new CRA app.
Create a Header that has a Nav.
Create a Cart Icon component and position this next to your Nav. This Cart Icon component will have an overlay that displays the number of items in the cart.
Create a Footer component.
Create a Layout component that has your Header and Footer.
Create the other pages:

6.1 ContactPage

6.2 ProductPage

6.3 CheckoutPage

6.4 CheckoutSuccessPage

Add React Router and route to each of the pages. The ProductPage page will be using a dynamic segment.
Fetch the list of products on the Homepage and store this as a state.
On the homepage, loop through the products and display a Product component for each of the values. This Product component should look like a product card. Each Product component will have a View product button which will link to the ProductPage page.
The homepage should have a lookahead/auto-complete Search bar component. Typing values in the search bar should display products where the title matches the search input. Clicking on an item should take the user to the ProductPage page. Tip: Filter the user input and then display products that match the input.
On the ProductPage, use the ID of the product as the params for the dynamic segment. Add the product details as mentioned in the brief.
Create a cart state. When the Add to cart button on the ProductPage is clicked, add the product to the cart.
Clicking on the Cart Icon component will take the user to the CheckoutPage page.
The CheckoutPage must list all of the products in the cart, show a total at the bottom and a Checkout button.
Clicking the Checkout button will take the user to the CheckoutSuccessPage.
The CheckoutSuccessPage should display that the order was successful and clear the cart. There should be a link to go back to the store.
On the ContactPage, create the following inputs with the following requirements.

16.1 Full name (Minimum number of characters is 3, required)

16.2 Subject (Minimum number of characters is 3, required)

16.3 Email (Must be a valid email address, required)

16.4 Body (Minimum number of characters is 3, required)

16.5 Submit button

console.log the data from the form once validation requirements are met.
Once your project is done, deploy it to Netlify.




## Site purpose:


Our goal was to complete an ecommerce site and build on our knowledge of react and JavaScript frameworks- This project should exemplify all that we have learned in the past few weeks.
(See the specs we had to follow and achieve above.)





** Note **

## React was used for building this project

<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/HTML.svg" width="50" height="50"> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CSS.svg" width="50" height="50"> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg" width="50" height="50"> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/VSCode-Dark.svg" width="50" height="50">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=font-awesome&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)





#### Getting Started

Installing

Clone the repo:

    git clone git@github.com:  https://github.com/AutopsyTurvy/e-commerce-store-front-end-frameworks.git
   

Install the dependencies: N/A

    npm install

Running

To run the app, run the following commands:

    npm run start


(You may also choose to add to/ clone this code in another way than through the command line or terminal, and you may do this by opening it in your chosen code editor, via GitHub desktop, and subsequently, VScode. )



## You will need to install and use React to contribute to this project 
---

Contributing


Contributions are welcome, but I would request that the invidicual that does so, clones the code and adds notes so that I can review any changes before they are comitted to the project permanently. Thank you! 

---

Contact:


Email me: 
autopsyturvycoding@gmail.com

<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Gmail-Dark.svg" width="50" height="50"> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Discord.svg" width="50" height="50">



Find me on Discord:
(Kitty Alice Case
kittyalicerayworth)

---




































# React App Automatic README Additions:


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)











# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
