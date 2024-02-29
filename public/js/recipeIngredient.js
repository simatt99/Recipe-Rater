/*
    RecipeIngredients Table Functionality
*/

// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postRecipeIngredientButton = document.getElementById('post-recipeIngredient-submit')
var putRecipeIngredientButton = document.getElementById('put-recipeIngredient-submit')
var deleteRecipeIngredientButton = document.getElementById('delete-recipeIngredient-submit')

// posts to the server to add recipeIngredients, returns 1 if required fields are empty
async function postRecipeIngredient(recipeID2, ingredientID2) {
    if (recipeID2 && ingredientID2) {
        try {
            const response = await fetch(`/post-recipeIngredient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    recipeID: recipeID2,
                                    ingredientID: ingredientID2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/RecipeIngredients";
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit recipeIngredients, returns 1 if required fields are empty
async function putRecipeIngredient(id, recipeID2, ingredientID2) {
    if (recipeID2 && ingredientID2) {
        try {
            const response = await fetch(`/put-recipeIngredient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    recipeIngredientID: id,
                                    recipeID: recipeID2,
                                    ingredientID: ingredientID2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/RecipeIngredients";
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete recipeIngredients
async function deleteRecipeIngredient(id) {
    try {
        const response = await fetch(`/delete-recipeIngredient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                recipeIngredientID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        // window.location.href = baseUrl + "/RecipeIngredients"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add recipeIngredient functionality
postRecipeIngredientButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let recipeID = document.getElementById('post-recipeIngredient-recipe').value
    let ingredientID = document.getElementById('post-recipeIngredient-ingredient').value

    if (await postRecipeIngredient(recipeID, ingredientID)) {
        alert("Please fill out all required fields")
    }
})

//edit recipeIngredient functionality
putRecipeIngredientButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('put-recipeIngredient-id').value
    let recipeID = document.getElementById('post-recipeIngredient-recipe').value
    let ingredientID = document.getElementById('post-recipeIngredient-ingredient').value
    
    id = parseInt(id)
    console.log(id)

    if (await putRecipeIngredient(id, recipeID, ingredientID)) {
        alert("Please fill out all required fields")
    }
})

//delete recipeIngredient functionality
deleteRecipeIngredientButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('delete-recipeIngredient-id').value

    id = parseInt(id)
    console.log(id)

    await deleteRecipeIngredient(id)
})