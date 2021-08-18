onload = () => {
    const app = document.getElementById('app')
    const appMeta = document.getElementById('appMeta')
    if(localStorage.getItem('lastRoute')) loadView(localStorage.getItem('lastRoute'))
    else loadView('home')
}

const rootFolder = 'pages'

const parser = new DOMParser()
const stringToHtml = (string) => {
    return parser.parseFromString(string, 'text/html')
}

const prepareHead = () => {
    appMeta.innerHTML = 
    `<meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">`
}

const loadView = (viewURL) => {
    if(event.target.tagName === 'A') event.preventDefault()
    
    prepareHead()

    fetch(`./${rootFolder}/${viewURL}.html`)
        .then(response => { return response.text() })
        .then(data => {
            data = stringToHtml(data)
            appMeta.innerHTML += data.head.innerHTML
            app.innerHTML = data.body.innerHTML
            localStorage.setItem('lastRoute', viewURL)
        })
        .catch(err => console.log(err))
}