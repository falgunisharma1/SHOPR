<H1>SHOPR </H1>
It's a high end online furniture store application. 
<br />

<h2>Description</h2>
It's an app for buying all kinds of limited edition luxiours furniture. Consumers are more than welcome to leave a review about the products they bought.

[SHOPR](https://shopr-name-ef2a29e1cae1.herokuapp.com/products) ◀️ ◀️ ◀️ Take a tour!
<br />

<h2>Technologies Used</h2>
<ul>
<li> JavaScript</li>
<li>CSS</li>
<LI>HTML</LI>
<LI>Mongoose</LI>
<li>Express</li>
<li>MongoDB</li>
<li>EJS</li>
<li>Node.js</li>
 </ul>
<br/>

<h2>Approach</h2>
This app is focused on product and their respective reviews. All 7 RESTful routes along with CRUD functionality are present in this app. Data model for this app has some additional branches because each product has it's own set of reviews and each review has seperate data which I intended to create/edit/update/delete, this led to a lot of dependency and added slight more complexity. User data was a stretch goal including login/logout, and after a lot of consideration, I realised that it's more efficient to do it with react as writing JS in EJS format might bring a lot of additional complexity. Moreover, since its a luxury brand, styling has been done very thoughtfully keeping in mind the goal of providing a great User experience on this app. 
<br/>

<h2>User Stories</h2>
<ul>
<li>As a user, I would like to view all the best seller furniture along with their prices.</li>
<li>As a user, I want to click on a furniture listed and be directed to that product's page with more images in Carousel, Description, Ratings and ofcourse Reviews.</li>
<li> As a user, I want to be able to Add New Review button on a products page and be directed to a new page with a functionality of leaving a new Review for that product.</li>
<li>As a user, I want to be able to click on edit buttons on each review and be directed to the edit page for that review. </li>
<li>As a user, I want to be able to click on delete button on each review and delete that review data. </li>
<li>As a user, I want to go back to my home page any time I like by just clicking the brand name on top.</li>
</ul>
<br />

<h2>Unsolved problems</h2>
<ul>
 <li>Joining products and reviews data with NOSQL database was a small challenge and would like to find a more efficient way of finding it.</li>
 <li>MongoDB had some issues while deployment as it was not accepting schemas and led to more problems while rendering data. Fixed it as of now but need to find the real issue soon</li>
 <li>Accessing some data passed to ejs file through an HTTPS request, in a script is a nightmare. Parsing and reformatting is the only way I could find. </li>
</ul>
<br />

<h2>Future Goals</h2>
<ul>
 <li>Buying functionality</li>
 <li>Sorting products and reviews</li>
 <li>Login/logout functionality</li>
 </ul>
 <br />

Check out the app 😊 - [SHOPR](https://shopr-name-ef2a29e1cae1.herokuapp.com/products)
