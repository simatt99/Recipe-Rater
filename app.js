// 1 # Citation for the following code:
// 2 # Date: 2/15/24
// 3 # Copied from nodejs-starter-app
// 4 # copied from github, changed a few things to match my implementation
// 5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

/*
    SETUP
*/
const { engine } = require('express-handlebars');
var express = require('express');
var app     = express();            
var db = require('./database/db-connector.js');       
var exphbs  = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
PORT        = 4239; 


/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('index')      
    });                                         
app.get('/Reviews', function(req, res)                 
    {
        res.render('index')      
    });   
     
app.get('/Recipes', function(req, res)                 
    {
        res.render('index')      
    });  
      
app.get('/Users', function(req, res)                
    {
        res.render('index')      
    });        

app.get('/RecipeCategories', function(req, res)                
    {
        res.render('index')      
    });      
app.get('/RecipeIngredients', function(req, res)                
    {
        res.render('index')      
    });    

app.get('/Ingredients', function(req, res)                
    {
        res.render('index')      
    });   

app.get('/Categories', function(req, res)                
    {
        res.render('index')      
    });      
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});