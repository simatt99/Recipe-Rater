/*
    Categories Table Functionality
*/
// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postCategoryButton = document.getElementById('post-category-submit')
var putCategoryButton = document.getElementById('put-category-submit')
var deleteCategoryButton = document.getElementById('delete-category-submit')

// posts to the server to add categories, returns 1 if required fields are empty
async function postCategory(name2) {
    if (name2) {
        try {
            const response = await fetch(`/post-category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    name: name2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/Categories";
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit categories, returns 1 if required fields are empty
async function putCategory(id, name2) {
    if (name2) {
        try {
            const response = await fetch(`/put-category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    categoryID: id,
                                    name: name2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            // window.location.href = baseUrl + "/Categories";
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete categories
async function deleteCategory(id) {
    try {
        const response = await fetch(`/delete-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                categoryID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        window.location.href = "/Categories"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add category functionality
postCategoryButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let name = document.getElementById('post-category-name').value

    if (await postCategory(name)) {
        alert("Please fill out all required fields")
    }
})

//edit category functionality
putCategoryButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('put-category-id').value
    let name = document.getElementById('put-category-name').value

    id = parseInt(id)
    console.log(id)
    
    if (await putCategory(id, name)) {
        alert("Please fill out all required fields")
    }
})

//delete category functionality
deleteCategoryButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let id = document.getElementById('delete-category-id').value

    id = parseInt(id)
    console.log(id)

    await deleteCategory(id)
})