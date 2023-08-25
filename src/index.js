const dogBar = document.getElementById('dog-bar')
const dogInfoPage = document.getElementById('dog-info')

const dogDiv = document.createElement('div')
dogDiv.id = 'dogDiv'
dogInfoPage.appendChild(dogDiv)

const dogImg = document.createElement('img')
        dogDiv.appendChild(dogImg)
        dogImg.src = 'Luisa.jpg'
        const dogTale = document.createElement('h2')
        dogDiv.appendChild(dogTale)
        dogTale.textContent = 'Welcome my dawgs!'
        const goodDogBtn =document.createElement('button')
        dogDiv.appendChild(goodDogBtn)

        let dogArray = []

document.addEventListener('DOMContentLoaded', 
fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => { dogArray =data
        addDog(data)}))

function addDog(data) {
    
        console.log(dogArray)
    
    data.forEach(dog => {
        
        const dogButton = document.createElement('span')
        goodBadName(dog, dogButton)

        dogButton.id = dog.id
        dogButton.textContent = dog.name

        
        dogButton.addEventListener('click',(e)=>{
           
            
            
            
            
       fetch(`http://localhost:3000/pups/${dog.id}`)
      .then(response => response.json())
      .then(data =>  renderDog(data))
                   
            
        
         })

        dogBar.appendChild(dogButton)


    })
}

function goodBadName (dog, dogButton) {
    if (dog.isGoodDog == true) {
        dogButton.className = 'good-dog'
            }
    else {
        dogButton.className = 'bad-dog'
    }
}

function renderDog (data) {
   


     GoodBad(data)
    const dogId =data.id
            
            dogImg.src = data.image
            dogTale.textContent = data.name

            dogDiv.id = data.id
    

}


function GoodBad (data) {
 if (data.isGoodDog == true ) {
    goodDogBtn.textContent = 'Good Dog!'

 }
 else {
    goodDogBtn.textContent = 'Bad Dog!'
 }
}



goodDogBtn.addEventListener('click', (event) => {
    const currentDog =  dogDiv.id
   
    if (goodDogBtn.textContent == "Good Dog!") {
        goodDogBtn.textContent = "Bad Dog!"
        
        fetch(`http://localhost:3000/pups/${currentDog}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": false
        })
    })
    }
    else {
        goodDogBtn.textContent = "Good Dog!"
        fetch(`http://localhost:3000/pups/${currentDog}`, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify({
            "isGoodDog": true    //set dog to good
        })
    })
    }


})

// GOOD DOG FILTER ON/OFF----------------------------------
const filter = document.getElementById('good-dog-filter')

filter.addEventListener('click',(e) => {
    e.preventDefault()
 filterDogs()
})
 

function filterDogs() {
    // are we on all dogs or are we on good dogs?
     
    const filterButton = document.getElementById('good-dog-filter')
    if (filterButton.textContent == 'Filter good dogs: OFF') {
        filterButton.textContent = 'Filter good dogs: ON'
    const goodDogs = dogArray.filter (dog => 
        dog.isGoodDog == true
        )
    

    dogBar.innerHTML =''
    addDog(goodDogs)
    }

    else {
            filterButton.textContent = 'Filter good dogs: OFF'
            dogBar.innerHTML =''
            addDog(dogArray)
        
        
    }
}

