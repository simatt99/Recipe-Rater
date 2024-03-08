/*
    Reviews Table Functionality
*/
// const baseUrl = `${window.location.protocol}//${window.location.host}`

//grab the buttons
var postReviewButton = document.getElementById('post-review-submit')
var putReviewButton = document.getElementById('put-review-submit')
var deleteReviewButton = document.getElementById('delete-review-submit')

// posts to the server to add reviews, returns 1 if required fields are empty
async function postReview(recipeID2, userID2, datePosted2, rating2, comment2) {
    if (recipeID2 && userID2 && datePosted2 && rating2) {
        try {
            const response = await fetch(`/post-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    recipeID: recipeID2,
                                    userID: userID2,
                                    datePosted: datePosted2,
                                    rating: rating2,
                                    comment: comment2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            window.location.href = "/Reviews"
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        return 1;
    }
}

//posts to the server to edit reviews, returns 1 if required fields are empty
async function putReview(id, recipeID2, userID2, datePosted2, rating2, comment2) {
    if (recipeID2 && userID2 && datePosted2 && rating2) {
        try {
            const response = await fetch(`/put-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                                    reviewID: id,
                                    recipeID: recipeID2,
                                    userID: userID2,
                                    datePosted: datePosted2,
                                    rating: rating2,
                                    comment: comment2
                                })
            }).then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const textResponse = await response.text()
            }, networkError => console.log(networkError.message))
            
            window.location.href = "/Reviews"
        }
        catch (error) {
            console.error('Error:', error)
        }
    }
    else {
        return 1
    }
}

//posts to the server to delete reviews
async function deleteReview(id) {
    try {
        const response = await fetch(`/delete-review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                                reviewID: id
                            })
        }).then(async response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const textResponse = await response.text()
        }, networkError => console.log(networkError.message))
        
        window.location.href = "/Reviews"
    }
    catch (error) {
        console.error('Error:', error)
    }
}

//add review functionality
postReviewButton.addEventListener('click', async function(e) {
    e.preventDefault()

    let recipeID = document.getElementById('post-review-recipe').value
    let userID = document.getElementById('post-review-user').value
    let datePosted = document.getElementById('post-review-datePosted').value
    let rating = document.getElementById('post-review-rating').value
    let comment = document.getElementById('post-review-comment').value

    if (await postReview(recipeID, userID, datePosted, rating, comment)) {
        alert("Please fill out all required fields")
    }
})

//edit review functionality
putReviewButton.addEventListener('click', async function(e) {
    e.preventDefault()
    
    let id = document.getElementById('put-review-id').value
    let recipeID = document.getElementById('put-review-recipe').value
    let userID = document.getElementById('put-review-user').value
    let datePosted = document.getElementById('put-review-datePosted').value
    let rating = document.getElementById('put-review-rating').value
    let comment = document.getElementById('put-review-comment').value
    
    id = parseInt(id)
    console.log(id)

    if (await putReview(id, recipeID, userID, datePosted, rating, comment)) {
        alert("Please fill out all required fields")
    }
})

//delete review functionality
deleteReviewButton.addEventListener('click', async function(e) {
    e.preventDefault()
    
    let id = document.getElementById('delete-review-id').value

    id = parseInt(id)
    console.log(id)

    await deleteReview(id)
})