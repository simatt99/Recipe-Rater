// 1 # Citation for the following code:
// 2 # Date: 2/15/24
// 3 # base on nodejs-starter-app
// 4 # based on this code, but changed and edited for my implementation
// 5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

/*
    SETUP
*/

// Express
const express = require('express')
const app = express()
PORT = 6543

// Handlebars
const { engine } = require('express-handlebars')    
var exphbs  = require('express-handlebars')
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')

// Misc
var db = require('./database/db-connector.js')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

const corsOptions = {
    methods: "GET,POST,PUT,DELETE",
    origin: "*",
    allowedHeaders: "*"
}

app.use(cors(corsOptions))

/*
    GET ROUTES
*/

app.get('/', function(req, res) {
    // Select query
    let query = "SELECT Recipes.recipeID as 'Recipe ID', Recipes.name as 'Recipe', Recipes.description as 'Description', CONCAT(Users.firstName, ' ', Users.lastName) as 'Author', Recipes.datePosted as 'Date Posted', Recipes.instructionList as 'Instruction List', Recipes.cookTime as 'Cook Time', Recipes.servingSize as 'Serving Size' \
    FROM Recipes \
    JOIN Users ON Recipes.userID = Users.userID \
    ORDER BY Recipes.recipeID ASC;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            // Select query for user dropdown
            let query2 = "SELECT userID, CONCAT(Users.firstName, ' ', Users.lastName) as 'Author' FROM Users;"

            db.pool.query(query2, function(error, rows2, fields2) {
                if(error) {
                    console.log(error)
                    res.status(500).send('Server error')
                } else {
                    res.render('Recipes', {data: rows, users: rows2})
                }
            })
        }
    })
})

app.get('/Ingredients', function(req, res) {
    // Select query
    let query = "SELECT ingredientID as 'Ingredient ID', name as 'Ingredient', description as 'Description', allergen as 'Allergen?' \
    FROM Ingredients \
    ORDER BY Ingredients.ingredientID;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            res.render('Ingredients', {data: rows})
        }
    })
})

app.get('/Categories', function(req, res) {
    // Select query
    let query = "SELECT categoryID as 'Category ID', name as 'Category' \
    FROM Categories \
    ORDER BY Categories.categoryID;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            res.render('Categories', {data: rows})
        }
    })
})

app.get('/Users', function(req, res) {
    // Select query
    let query = "SELECT userID as 'User ID', Users.firstName as 'First Name', Users.lastName as 'Last Name', email as 'Email', joinDate as 'Join Date' \
    FROM Users \
    ORDER BY Users.userID;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            res.render('Users', {data: rows})
        }
    })
})

app.get('/Recipes', function(req, res) {
    // Select query
    let query = "SELECT Recipes.recipeID as 'Recipe ID', Recipes.name as 'Recipe', Recipes.description as 'Description', CONCAT(Users.firstName, ' ', Users.lastName) as 'Author', Recipes.datePosted as 'Date Posted', Recipes.instructionList as 'Instruction List', Recipes.cookTime as 'Cook Time', Recipes.servingSize as 'Serving Size' \
    FROM Recipes \
    JOIN Users ON Recipes.userID = Users.userID \
    ORDER BY Recipes.recipeID ASC;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            // Select query2 for user dropdown
            let query2 = "SELECT userID, CONCAT(Users.firstName, ' ', Users.lastName) as 'Author' FROM Users;"

            // Run query2
            db.pool.query(query2, function(error, rows2, fields2) {
                if(error) {
                    console.log(error)
                    res.status(500).send('Server error')
                } else {
                    res.render('Recipes', {data: rows, users: rows2})
                }
            })
        }
    })
})

app.get('/Reviews', function(req, res) {
    // Select query
    let query = "SELECT Reviews.reviewID as 'Review ID', Recipes.name as 'Recipe Name', CONCAT(Users.firstName, ' ', Users.lastName) as 'Author', Reviews.datePosted as 'Date Posted', Reviews.rating as 'Rating', Reviews.comment as 'Comment' \
    FROM Reviews \
    JOIN Recipes ON Reviews.recipeID = Recipes.recipeID \
    JOIN Users ON Reviews.userID = Users.userID \
    ORDER BY Reviews.reviewID ASC;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            // Select query2 for recipe dropdown
            let query2 = "SELECT recipeID, name FROM Recipes;"

            // Run query2
            db.pool.query(query2, function(error, rows2, fields) {
                if(error) {
                    console.log(error)
                    res.status(500).send('Server error')
                } else {
                    // Select query3 for user dropdown
                    let query3 = "SELECT userID, CONCAT(Users.firstName, ' ', Users.lastName) as 'Author' FROM Users;"

                    // Run query3
                    db.pool.query(query3, function(error, rows3, fields) {
                        if(error) {
                            console.log(error)
                            res.status(500).send('Server error')
                        } else {
                            res.render('Reviews', {data: rows, recipes: rows2, users: rows3})
                        }
                    })
                }
            })
        }
    })
})

app.get('/RecipeCategories', function(req, res) {
    // Select query
    let query = "SELECT RecipeCategories.recipeCategoryID as 'RecipeCategory ID', Recipes.name AS 'Recipe Name', Categories.name AS 'Category Name' \
    FROM RecipeCategories \
    JOIN Recipes ON RecipeCategories.recipeID = Recipes.recipeID \
    JOIN Categories ON RecipeCategories.categoryID = Categories.categoryID \
    ORDER BY RecipeCategories.recipeCategoryID ASC;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            // Select query2 for recipe dropdown
            let query2 = "SELECT recipeID, name FROM Recipes;"

            // Run query2
            db.pool.query(query2, function(error, rows2, fields) {
                if(error) {
                    console.log(error)
                    res.status(500).send('Server error')
                } else {
                    // Select query3 for categories dropdown
                    let query3 = "SELECT categoryID, name FROM Categories;"

                    // Run query3
                    db.pool.query(query3, function(error, rows3, fields) {
                        if(error) {

                        } else {
                            res.render('RecipeCategories', {data: rows, recipes: rows2, categories: rows3})
                        }
                    })
                }
            })
        }
    })
})

app.get('/RecipeIngredients', function(req, res) {
    // Select query
    let query = "SELECT RecipeIngredients.recipeIngredientID as 'RecipeIngredient ID', Recipes.name AS 'Recipe Name', Ingredients.name AS 'Ingredient Name' \
    FROM RecipeIngredients \
    JOIN Recipes ON RecipeIngredients.recipeID = Recipes.recipeID \
    JOIN Ingredients ON RecipeIngredients.ingredientID = Ingredients.ingredientID \
    ORDER BY RecipeIngredients.recipeIngredientID ASC;"

    // Run query
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.status(500).send('Server error')
        } else {
            // Select query2 for recipes dropdown
            let query2 = "SELECT recipeID, name FROM Recipes;"

            // Run query2
            db.pool.query(query2, function(error, rows2, fields) {
                if(error) {
                    console.log(error)
                    res.status(500).send('Server error')
                } else {
                    // Select query3 for ingredients dropdown
                    let query3 = "SELECT ingredientID, name FROM Ingredients;"

                    // Run query3
                    db.pool.query(query3, function(error, rows3, fields) {
                        if(error) {
                            console.log(error)
                            res.status(500).send('Server error')
                        } else {
                            res.render('RecipeIngredients', {data: rows, recipes: rows2, ingredients: rows3})
                        }
                    })
                }
            })
        }
    })
})

/*
    POST ROUTES
*/

app.post('/post-ingredient', function(req, res) {
    // Grab data
    let data = req.body

    let name = data.name
    let description = data.description
    let allergen = data.allergen
    
    if(isNaN(allergen)) {
        allergen = 0
    } else {
        allergen = parseInt(data.allergen)
    }

    // Insert query
    let query = `INSERT INTO Ingredients (name, description, allergen) VALUES ('${name}', '${description}', '${allergen}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Ingredients')
        }
    })
})

app.post('/post-category', function(req, res) {
    // Grab data
    let data = req.body

    let name = data.name

    // Insert query
    let query = `INSERT INTO Categories (name) VALUES ('${name}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Categories')
        }
    })
})
    
app.post('/post-user', function(req, res) {
    // Grab data
    let data = req.body

    let firstName = data.firstName
    let lastName = data.lastName
    let email = data.email
    let joinDate = data.joinDate    

    // Insert query
    let query = `INSERT INTO Users (firstName, lastName, email, joinDate) VALUES ('${firstName}', '${lastName}', '${email}', '${joinDate}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Users')
        }
    })
})

app.post('/post-recipe', function(req, res) {
    // Grab data
    let data = req.body

    let name = data.name
    let description = data.description
    let userID = parseInt(data.userID)
    let datePosted = data.datePosted
    let instructionList = data.instructionList
    let cookTime = data.cookTime
    let servingSize = parseInt(data.servingSize)

    // Insert query
    let query = `INSERT INTO Recipes (name, description, userID, datePosted, instructionList, cookTime, servingSize) VALUES ('${name}', '${description}', '${userID}', '${datePosted}', '${instructionList}', '${cookTime}', '${servingSize}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Recipes')
        }
    })
})

app.post('/post-review', function(req, res) {
    // Grab data
    let data = req.body

    let recipeID = parseInt(data.recipeID)
    let userID = parseInt(data.userID)
    let datePosted = data.datePotsed
    let rating = parseInt(data.rating)
    let comment = data.comment

    // Insert query
    let query = `INSERT INTO Reviews (recipeID, userID, datePosted, rating, comment) VALUES ('${recipeID}', '${userID}', '${datePosted}', '${rating}', '${comment}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Reviews')
        }
    })
})

app.post('/post-recipeCategory', function(req, res) {
    // Grab data
    let data = req.body

    let recipeID = parseInt(data.recipeID)
    let categoryID = parseInt(data.categoryID)

    // Insert query
    let query = `INSERT INTO RecipeCategories (recipeID, categoryID) VALUES ('${recipeID}', '${categoryID}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/RecipeCategories')
        }
    })
})

app.post('/post-recipeIngredient', function(req, res) {
    // Grab data
    let data = req.body

    let recipeID = parseInt(data.recipeID)
    let ingredientID = parseInt(data.ingredientID)

    // Insert query
    let query = `INSERT INTO RecipeIngredients (recipeID, ingredientID) VALUES ('${recipeID}', '${ingredientID}');`

    // Run query 1
    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/RecipeIngredients')
        }
    })
})

/*
    UPDATE ROUTES
*/

app.post('/put-ingredient', function(req, res) {
    let data = req.body

    let id = parseInt(data.ingredientID)
    let name = data.name
    let description = data.description
    let allergen = data.allergen

    if(isNaN(allergen)) {
        allergen = 0
    } else {
        allergen = parseInt(data.allergen)
    }

    query = `UPDATE Ingredients SET name = ?, description = ?, allergen = ? WHERE ingredientID = ?;`

    db.pool.query(query, [name, description, allergen, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Ingredients')
        }
    })
})

app.post('/put-category', function(req, res) {
    let data = req.body

    let id = parseInt(data.categoryID)
    let name = data.name

    query = `UPDATE Categories SET name = ? WHERE categoryID = ?;`

    db.pool.query(query, [name, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Categories')
        }
    })
})

app.post('/put-user', function(req, res) {
    let data = req.body;

    let id = parseInt(data.userID)
    let firstName = data.firstName
    let lastName = data.lastName
    let email = data.email
    let joinDate = data.joinDate

    query = `UPDATE Users SET firstName = ?, lastName = ?, email = ?, joinDate = ? WHERE userID = ?;`

    db.pool.query(query, [firstName, lastName, email, joinDate, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Users')
        }
    })
})

app.post('/put-recipe', function(req, res) {
    let data = req.body;

    let id = parseInt(data.recipeID)
    let name = data.name
    let description = data.description
    let userID = parseInt(data.userID)
    let datePosted = data.datePosted
    let instructionList = data.instructionList
    let cookTime = data.cookTime
    let servingSize = parseInt(data.servingSize)

    query = `UPDATE Recipes SET name = ?, description = ?, userID = ?, datePosted = ?, instructionList = ?, cookTime = ?, servingSize = ? WHERE recipeID = ?;`

    db.pool.query(query, [name, description, userID, datePosted, instructionList, cookTime, servingSize, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Recipes')
        }
    })
})

app.post('/put-review', function(req, res) {
    let data = req.body;

    let id = parseInt(data.reviewID)
    let recipeID = parseInt(data.recipeID)
    let userID = parseInt(data.userID)
    let datePosted = data.datePosted
    let rating = parseInt(data.rating)
    let comment = data.comment

    query = `UPDATE Reviews SET recipeID = ?, userID = ?, datePosted = ?, rating = ?, comment = ? WHERE reviewID = ?;`

    db.pool.query(query, [recipeID, userID, datePosted, rating, comment, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Reviews')
        }
    })
})

app.post('/put-recipeCategory', function(req, res) {
    let data = req.body

    let id = parseInt(data.recipeCategoryID)
    let recipeID = parseInt(data.recipeID)
    let categoryID = parseInt(data.categoryID)

    query = `UPDATE RecipeCategories SET recipeID = ?, categoryID = ? WHERE recipeCategoryID = ?;`

    db.pool.query(query, [recipeID, categoryID, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/RecipeCategories')
        }
    })
})

app.post('/put-recipeIngredient', function(req, res) {
    let data = req.body;

    let id = parseInt(data.recipeIngredientID)
    let recipeID = parseInt(data.recipeID)
    let ingredientID = parseInt(data.ingredientID)

    query = `UPDATE RecipeIngredients SET recipeID = ?, ingredientID = ? WHERE recipeIngredientID = ?;`

    db.pool.query(query, [recipeID, ingredientID, id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/RecipeIngredients')
        }
    })
})

/*
    DELETE ROUTES
*/

app.post('/delete-ingredient', function(req, res) {
    // let data = req.body

    let id = req.body.ingredientID

    let query = `DELETE FROM RecipeIngredients WHERE ingredientID = ?;`
    let query2 = `DELETE FROM Ingredients WHERE ingredientID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            db.pool.query(query2, [id], function(error, rows, fields) {
                if(error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.redirect('/Ingredients')
                }
            })
        }
    })
})

app.post('/delete-category', function(req, res) {


    let id = req.body.categoryID

    let query = `DELETE FROM RecipeCategories WHERE categoryID = ?;`
    let query2 = `DELETE FROM Categories WHERE categoryID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            db.pool.query(query2, [id], function(error, rows, fields) {
                if(error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.redirect('/Categories')
                }
            })
        }
    })
})

app.post('/delete-user', function(req, res) {


    let id = req.body.userID

    let query = `DELETE FROM Reviews WHERE userID = ?;`
    let query2 = `DELETE FROM Recipes WHERE userID = ?;`
    let query3 = `DELETE FROM Users WHERE userID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            db.pool.query(query2, [id], function(error, rows, fields) {
                if(error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    db.pool.query(query3, [id], function(error, rows, fields) {
                        if(error) {
                            console.log(error)
                            res.sendStatus(400)
                        } else {
                            res.redirect('/Users')
                        }
                    })
                }
            })
        }
    })
})

app.post('/delete-recipe', function(req, res) {
    let data = req.body

    let id = req.body.recipeID

    let query = `DELETE FROM RecipeCategories WHERE recipeID = ?;`
    let query2 = `DELETE FROM RecipeIngredients WHERE recipeID = ?;`
    let query3 = `DELETE FROM Reviews WHERE recipeID = ?;`
    let query4 = `DELETE FROM Recipes WHERE recipeID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            db.pool.query(query2, [id], function(error, rows, fields) {
                if(error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    db.pool.query(query3, [id], function(error, rows, fields) {
                        if(error) {
                            console.log(error)
                            res.sendStatus(400)
                        } else {
                            db.pool.query(query4, [id], function(error, rows, fields) {
                                if(error) {
                                    console.log(error)
                                    res.sendStatus(400)
                                } else {
                                    res.redirect('/Recipes')
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

app.post('/delete-review', function(req, res) {

    let id = req.body.reviewID
    let query = `DELETE FROM Reviews WHERE reviewID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/Reviews')
        }
    })
})

app.post('/delete-recipeCategory', function(req, res) {

    let id = req.body.recipeCategoryID
    let query = `DELETE FROM RecipeCategories WHERE recipeCategoryID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/RecipeCategories')
        }
    })
})

app.post('/delete-recipeIngredient', function(req, res) {
    let data = req.body
    let id = parseInt(data.id)
    let query = `DELETE FROM RecipeIngredients WHERE recipeIngredientID = ?;`

    db.pool.query(query, [id], function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.redirect('/RecipeIngredients')
        }
    })
})

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
