/*
    Ingredients Table Functionality
*/
// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postIngredientButton = document.getElementById('post-ingredient-submit')
var putIngredientButton = document.getElementById('put-ingredient-submit')
var deleteIngredientButton = document.getElementById('delete-ingredient-submit')

// posts to the server to add ingredients, returns 1 if required fields are empty
async function postIngredient(name2, description2, allergen2) {
    if (allergen2 && name2) {
        let allergenNum = parseInt(allergen2)

        if (allergenNum != 1 && allergenNum != 0) {
            return 1
        }

        try {
            const response = await fetch(`/post-ingredient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    name: name2, 
                                    description: description2, 
                                    allergen: allergenNum 
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/Ingredients";
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit ingredients, returns 1 if required fields are empty
async function putIngredient(id, name2, description2, allergen2) {
    if (allergen2 && name2) {
        let allergenNum = parseInt(allergen2)

        if (allergenNum != 1 && allergenNum != 0) {
            return 1
        }

        try {
            const response = await fetch(`/put-ingredient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    ingredientID: id,
                                    name: name2, 
                                    description: description2, 
                                    allergen: allergenNum
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/Ingredients";
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete ingredients
async function deleteIngredient(id) {
    try {
        const response = await fetch(`/delete-ingredient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                ingredientID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        window.location.href = "/Ingredients"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add ingredient functionality
postIngredientButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let name = document.getElementById('post-ingredient-name').value
    let description = document.getElementById('post-ingredient-description').value
    let allergen = document.getElementById('post-ingredient-allergen').value

    if (await postIngredient(name, description, allergen)) {
        alert("Please fill out all required fields - Allergen must also be 1 or 0")
    }
})

//edit ingredient functionality
putIngredientButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('put-ingredient-id').value
    let name = document.getElementById('put-ingredient-name').value
    let description = document.getElementById('put-ingredient-description').value
    let allergen = document.getElementById('put-ingredient-allergen').value
    
    id = parseInt(id)
    console.log(id)

    if (await putIngredient(id, name, description, allergen)) {
        alert("Please fill out all required fields - Allergen must also be 1 or 0")
    }
})

//delete ingredient functionality
deleteIngredientButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('delete-ingredient-id').value

    id = parseInt(id)
    console.log(id)

    await deleteIngredient(id)
})