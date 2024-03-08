/*
    Users Table Functionality
*/
// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postUserButton = document.getElementById('post-user-submit')
var putUserButton = document.getElementById('put-user-submit')
var deleteUserButton = document.getElementById('delete-user-submit')

// posts to the server to add users, returns 1 if required fields are empty
async function postUser(firstName2, lastName2, email2, joinDate2) {
    if (firstName2 && lastName2 && email2 && joinDate2) {
        try {
            const response = await fetch(`/post-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    firstName: firstName2,
                                    lastName: lastName2,
                                    email: email2,
                                    joinDate: joinDate2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            window.location.href = "/Users"
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit users, returns 1 if required fields are empty
async function putUser(id, firstName2, lastName2, email2, joinDate2) {
    if (firstName2 && lastName2 && email2 && joinDate2) {
        try {
            const response = await fetch(`/put-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    userID: id,
                                    firstName: firstName2,
                                    lastName: lastName2,
                                    email: email2,
                                    joinDate: joinDate2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            window.location.href = "/Users"
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete users
async function deleteUser(id) {
    try {
        const response = await fetch(`/delete-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                userID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        window.location.href = "/Users"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add user functionality
postUserButton.addEventListener('click', async function(e) {
    e.preventDefault()
    
    let firstName = document.getElementById('post-user-firstName').value
    let lastName = document.getElementById('post-user-lastName').value
    let email = document.getElementById('post-user-email').value
    let joinDate = document.getElementById('post-user-joinDate').value

    if (await postUser(firstName, lastName, email, joinDate)) {
        alert("Please fill out all required fields")
    }
})

//edit user functionality
putUserButton.addEventListener('click', async function(e) {
    e.preventDefault()
    
    let id = document.getElementById('put-user-id').value
    let firstName = document.getElementById('put-user-firstName').value
    let lastName = document.getElementById('put-user-lastName').value
    let email = document.getElementById('put-user-email').value
    let joinDate = document.getElementById('put-user-joinDate').value

    id = parseInt(id)
    console.log(id)

    if (await putUser(id, firstName, lastName, email, joinDate)) {
        alert("Please fill out all required fields")
    }
})

//delete user functionality
deleteUserButton.addEventListener('click', async function(e) {
    e.preventDefault()
    
    let id = document.getElementById('delete-user-id').value

    id = parseInt(id)
    console.log(id)

    await deleteUser(id)
})