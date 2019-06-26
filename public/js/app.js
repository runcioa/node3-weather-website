
//app.js

//Seleziono il form per applicare l'event listener submit
const weatherForm = document.querySelector('form')

//recupero il contenuto del form search
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From javascript'


weatherForm.addEventListener('submit',(e)=>{
    
    //con e.prevent evito che il browser faccia il refresh della pagina
    e.preventDefault()

    const location = search.value

    messageOne.textContent ='Loading...'

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
        }
    })
})
})

