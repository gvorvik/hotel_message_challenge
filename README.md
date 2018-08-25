To run the application:

- Clone the folder down to your computer
- Run npm install
- Enter npm run server in one cli console to start server
- Enter npm run client in another cli console to start client
- Navigate to http://localhost:3000


Design Decisions:

Large scale I tried to keep functionality and data storage separate. My parent component houses most of
the data (there is one exception in the NewMessage component). I immediately fetch the json data from all
three json files, and house those separately in the app's state. I did this because it will be easier to
track where data lives if the application were to grow. The hardest part for me was figuring out how to
accurately replace the placeholders in the json messages, and I ended up using the replace method on
strings - it just worked out nicely. I built a function that uses recursion to go as deep into objects 
as needed so we can access all data that will be placed in each json string.


Application Language:

I wrote this application in javascript using nodejs on the backend and React on the front end.
I like how organized React is, using components to separate functionality and data in the application.
It is also what I am most familiar with (we wrote software in javascript at Prime).


Process for verifying correctness:

My most useful tool was the console.log statement. As I built out functions, I kept testing them and 
sending different types of data to see what the output would be. If I had more time I would build out
a test suite using Mocha with the expect library.

What I'd do with more time:

First I would build the test suite. I think it would be pretty cool to bring in an api to give more 
information that would be useful. My first thought is a weather api that checks out the day's weather 
and sends a text in the morning to all hotel guests on what that looks like. Also some type of 
interactivity would be cool, like depending on where the user texts back yes or no, that would prompt 
another message to go out.



