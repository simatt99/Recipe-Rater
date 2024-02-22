// 1 # Citation for the following code:
// 2 # Date: 2/15/24
// 3 # base on nodejs-starter-app
// 4 # based on this code, but changed and edited for my implementation
// 5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

/*
    SETUP
*/
const { engine } = require('express-handlebars');
var express = require('express');
var app     = express();            
var db = require('./database/db-connector.js');       
var exphbs  = require('express-handlebars');
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
PORT = 1234; 


/*
    ROUTES
*/
app.get('/', function(req, res) {
    let query = "SELECT * FROM Recipes;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(500).send('Server error');
            return;
        }
        res.render('Recipes', {data: rows});
    });
});
                                  
app.get('/Reviews', function(req, res) {
        let query = "SELECT * FROM Reviews;";
        db.pool.query(query, function(error, rows, fields) {
            if (error) {
                res.status(500).send('Server error');
                return;
            }
            res.render('Reviews', {data: rows});
        });
    });
    
   
app.get('/Recipes', function(req, res) {
        let query = "SELECT * FROM Recipes;";
        db.pool.query(query, function(error, rows, fields) {
            if (error) {
                res.status(500).send('Server error');
                return;
            }
            res.render('Recipes', {data: rows});
        });
    });
    
app.get('/Users', function(req, res) {
    let query = "SELECT * FROM Users;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(500).send('Server error');
            return;
        }
        res.render('Users', {data: rows});
        });
    });
    
app.get('/RecipeCategories', function(req, res) {
    let query = "SELECT rc.recipeCategoryID, r.name AS RecipeName, c.name AS CategoryName FROM RecipeCategories rc JOIN Recipes r ON rc.recipeID = r.recipeID JOIN Categories c ON rc.categoryID = c.categoryID;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(500).send('Server error');
            return;
        }
        // console.log(rows)
        res.render('RecipeCategories', {data: rows});
        });
    });
    
app.get('/RecipeIngredients', function(req, res) {
    let query = "SELECT ri.recipeIngredientID, r.name AS RecipeName, i.name AS IngredientName FROM RecipeIngredients ri JOIN Recipes r ON ri.recipeID = r.recipeID JOIN Ingredients i ON ri.ingredientID = i.ingredientID;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(500).send('Server error');
            return;
        }
        // console.log(rows)
        res.render('RecipeIngredients', {data: rows});
        });
    });
    
app.get('/Ingredients', function(req, res) {
    let query = "SELECT * FROM Ingredients;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(500).send('Server error');
            return;
        }
        res.render('Ingredients', {data: rows});
        });
    });
    
app.get('/Categories', function(req, res) {
    let query = "SELECT * FROM Categories;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            res.status(500).send('Server error');
            return;
        }
        res.render('Categories', {data: rows});
        });
    });
        
    
    


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});