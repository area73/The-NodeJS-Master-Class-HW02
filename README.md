# The-NodeJS-Master-Class-HW02
Home Work 02 for The NodeJS Master Class

## Installation
These series of work are intended to be 0 module dependant , that means that no NPM or any other 
module manager are needed in order to run the program, just plain NodeJS :)

To run the server just open your terminal and from the root of this project run:

    node index.js 

To do hot reload you can try:

    node watcher index.js

To run test

Additionally you can pass NODE_ENV = <dev || staging || prod> to get different servers config    
     

## Homework Assignment #2 description

You are building the API for a pizza-delivery company. Don't worry about a frontend, just build the API. Here's the spec from your project manager: 
1. New users can be created, their information can be edited, and they can be deleted. 
We should store their name, email address, and street address.
2. Users can log in and log out by creating or destroying a token.
3. When a user is logged in, they should be able to GET all the possible menu items 
(these items can be hardcoded into the system). 
4. A logged-in user should be able to fill a shopping cart with menu items
5. A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.
com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and 
click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration
 is working: https://stripe.com/docs/testing#cards
6. When an order is placed, you should email the user a receipt. 
You should integrate with the sandbox of Mailgun.com for this. 

Note: Every Mailgun account comes with a sandbox email account domain 
(whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup 
any DNS for your domain for this task 
https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account
This is an open-ended assignment. You may take any direction you'd like to go with it, as long as 
your project includes the requirements. It can include anything else you wish as well. 

