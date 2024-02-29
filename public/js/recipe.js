/*
    Recipes Table Functionality
*/
// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postRecipeButton = document.getElementById('post-recipe-submit')
var putRecipeButton = document.getElementById('put-recipe-submit')
var deleteRecipeButton = document.getElementById('delete-recipe-submit')

// posts to the server to add recipes, returns 1 if required fields are empty
async function postRecipe(name2, description2, userID2, datePosted2, instructionList2, cookTime2, servingSize2) {
    if (name2 && userID2 && datePosted2 && instructionList2 && cookTime2 && servingSize2) {
        try {
            const response = await fetch(`/post-recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    name: name2, 
                                    description: description2,
                                    userID: userID2,
                                    datePosted: datePosted2,
                                    instructionList: instructionList2,
                                    cookTime: cookTime2,
                                    servingSize: servingSize2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/Recipes";
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit recipes, returns 1 if required fields are empty
async function putRecipe(id, name2, description2, userID2, datePosted2, instructionList2, cookTime2, servingSize2) {
    if (name2 && userID2 && datePosted2 && instructionList2 && cookTime2 && servingSize2) {
        try {
            const response = await fetch(`/put-recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    recipeID: id,
                                    name: name2, 
                                    description: description2,
                                    userID: userID2,
                                    datePosted: datePosted2,
                                    instructionList: instructionList2,
                                    cookTime: cookTime2,
                                    servingSize: servingSize2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/Recipes";
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete recipes
async function deleteRecipe(id) {
    try {
        const response = await fetch(`/delete-recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                recipeID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        // window.location.href = baseUrl + "/Recipes"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add recipe functionality
postRecipeButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let name = document.getElementById('post-recipe-name').value
    let description = document.getElementById('post-recipe-description').value
    let userID = document.getElementById('post-recipe-user').value
    let datePosted = document.getElementById('post-recipe-datePosted').value
    let instructionList = document.getElementById('post-recipe-instructionList').value
    let cookTime = document.getElementById('post-recipe-cookTime').value
    let servingSize = document.getElementById('post-recipe-servingSize').value

    if (await postRecipe(name, description, userID, datePosted, instructionList, cookTime, servingSize)) {
        alert("Please fill out all required fields")
    }
})

//edit recipe functionality
putRecipeButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('put-recipe-id').value
    let name = document.getElementById('put-recipe-name').value
    let description = document.getElementById('put-recipe-description').value
    let userID = document.getElementById('put-recipe-user').value
    let datePosted = document.getElementById('put-recipe-datePosted').value
    let instructionList = document.getElementById('put-recipe-instructionList').value
    let cookTime = document.getElementById('put-recipe-cookTime').value
    let servingSize = document.getElementById('put-recipe-servingSize').value
    
    id = parseInt(id)
    console.log(id)

    if (await putRecipe(id, name,description, userID, datePosted, instructionList, cookTime, servingSize)) {
        alert("Please fill out all required fields")
    }
})

//delete recipe functionality
deleteRecipeButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('delete-recipe-id').value

    id = parseInt(id)
    console.log(id)

    await deleteRecipe(id)
})