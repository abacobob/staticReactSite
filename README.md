staticReactSite Readme document

##Introduction:

This site demonstrates the authors' competence with React and associated technlogies for front- and back-end web development.

##Project overview:

This site was created using NPX create-react-app and deployed on Heroku. The project takes the form of a restaurant site with an interactive menu, such that
customers could order their food from the menu without handling a physical document, in line with local COVID-19 advice.

When submitted, the food order would be sent to an express server whereupon it could be read by the kitchen, or sent on to a order management system.

##components:

There are 3 core components to this project:
-a static landing page with non-interactive menu
-a dynamic order management system, using react props to pass data between components
-an Express server to handle GET/POST requests (IN REVIEW*)

##Static landing page:

The static landing page is the basic website that users will encounter upon travelling to the URL. It is fully responsive and mobile-optimized using bootstrap (via the reactstrap NPM package) and derived technologies.

##order management system:
The order management system has 3 key sections:

1. A 'daily menu' display, including item descriptions and prices, with an option to add items to an order that will be sent to the kitchen.
This section contains 'add' buttons that push the desired item to an array.

2. An 'order management' section that allows the customer to remove unwanted items from their order, achieved using a simple .splice() function on the order array.

3. A 'submit order' button that sends the order as a POST request to an express server, and additionally shows an onscreen confirmation of the clients' order.
The onscreen confirmation is created with a combination of a sweetalert popup and JSX to structure the information.

##Express server (CURRENTLY IN REVIEW*):

The express server is queried by the React parent component on mount through a GET request, and sends the updated restaurant menu to the React components.

The server receives customer food orders through a POST request, and displays it in the console. This could easily then be sent to an order management system or a 
database.

*Note that this function is currently in review due to compatibility issues with the hosting service, so the menu is presently deployed from a vanilla JS module.
see 'future work' below.

##utilised tools and technologies:

-HTML, CSS and vanilla JS
-React
-Git BASH CLI
-Node.js and NPM
-Express
-Version control with Git
-Heroku hosting and deployment solution

##Principle node packages:

-Axios: used for handling HTTP requests (Axios behaves in a similar way to fetch(), but with broader cross-browser support).
-Reactstrap: react-compatible bootstrap library for mobile-ready responsive design.
-Sweetalert: used for a responsive 'window.alert' alternative, used in the 'order confirmation' section.

##Future work
-Resolve the express server compatibility issue.
