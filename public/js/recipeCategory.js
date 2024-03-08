/*
    RecipeCategories Table Functionality
*/
// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postRecipeCategoryButton = document.getElementById('post-recipeCategory-submit')
var putRecipeCategoryButton = document.getElementById('put-recipeCategory-submit')
var deleteRecipeCategoryButton = document.getElementById('delete-recipeCategory-submit')

// posts to the server to add recipeCategories, returns 1 if required fields are empty
async function postRecipeCategory(recipeID2, categoryID2) {
    if (recipeID2 && categoryID2) {
        try {
            const response = await fetch(`/post-recipeCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    recipeID: recipeID2,
                                    categoryID: categoryID2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            window.location.href = "/RecipeCategories"
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit recipeCategories, returns 1 if required fields are empty
async function putRecipeCategory(id, recipeID2, categoryID2) {
    if(recipeID2 && categoryID2) {
        try {
            const response = await fetch(`/put-recipeCategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    recipeCategoryID: id,
                                    recipeID: recipeID2,
                                    categoryID: categoryID2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            window.location.href = "/RecipeCategories"
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete recipeCategories
async function deleteRecipeCategory(id) {
    try {
        const response = await fetch(`/delete-recipeCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                recipeCategoryID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        window.location.href = "/RecipeCategories"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add recipeCategory functionality
postRecipeCategoryButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let recipeID = document.getElementById('post-recipeCategory-recipe').value
    let categoryID = document.getElementById('post-recipeCategory-category').value

    if (await postRecipeCategory(recipeID, categoryID)) {
        alert("Please fill out all required fields")
    }
})

//edit recipeCategory functionality
putRecipeCategoryButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('put-recipeCategory-id').value
    let recipeID = document.getElementById('post-recipeCategory-recipe').value
    let categoryID = document.getElementById('post-recipeCategory-category').value
    
    id = parseInt(id)
    console.log(id)

    if (await putRecipeCategory(id, recipeID, categoryID)) {
        alert("Please fill out all required fields")
    }
})

//delete recipeCategory functionality
deleteRecipeCategoryButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('delete-recipeCategory-id').value

    id = parseInt(id)
    console.log(id)

    await deleteRecipeCategory(id)
})