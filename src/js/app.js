const userInterface = document.getElementsByClassName('input-user-info-container')[0]
const userSendButton = document.querySelector('input[value="ADICIONAR"]')

const getConst = element => document.querySelector(element)
const Data = new Date()



const formatDate = date => {
    const formatDateUnit = unit => `${String(unit).length === 1 ? `0${unit}` : unit}`
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${formatDateUnit(hours)}:${formatDateUnit(minutes)}:${formatDateUnit(seconds)}`
}

const renderSavedCars = () => {
    const savedCars = getSavedCars()
    getConst("#user-saved-infos").innerHTML = '';
    savedCars.forEach(car => addCarToList(car))
}

const checkOut = info => {
    const license = info[1].textContent

    const garage = getSavedCars().filter(car => car.carLicense !== license)
    localStorage.safeSaveCars = JSON.stringify(garage);
    renderSavedCars()
}

const getSavedCars = () => localStorage.safeSaveCars ? JSON.parse(localStorage.safeSaveCars) : []

const addCarToList = (car) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${car.carModel}</td>
        <td>${car.carLicense}</td>
        <td>${car.time}</td>
        <td>
            <input type="button" class="delete-button" value="X">
        </td>
    `
    const userSavedAllInfos = getConst("#user-saved-infos").appendChild(row)
}

renderSavedCars()

userSendButton.addEventListener('click', event => { 
    const carInfos = [
        getConst("#input-user-car-model-one").value,
        getConst("#input-user-car-model-two").value
    ]

    const inputError = (input) => {
        getConst(input).style.animation = 'shake-horizontal 500ms ease'
        getConst(input).style.border = '1px solid red'

        setTimeout(() => {
            getConst(input).style.animation = ''
            getConst(input).style.border = '1px solid #252525'
        }, 500);
    }

    if(!carInfos[0] || !carInfos[1]) { 
        inputError("#input-user-car-model-one")
        inputError("#input-user-car-model-two")
        return;
    }

    const newCar = {carModel: carInfos[0], carLicense: carInfos[1], time: new Date()}
    newCar.time = formatDate(newCar.time)
    addCarToList(newCar)
    
    const safeSaveCars = getSavedCars()
    safeSaveCars.push(newCar)

    localStorage.safeSaveCars = JSON.stringify(safeSaveCars)

    getConst("#input-user-car-model-one").value = ""
    getConst("#input-user-car-model-two").value = ""
})

userInterface.addEventListener('change', ({target}) => {
    const changedElement = event.target.tagName

    if(changedElement == 'INPUT') {
        target.value = target.value.toUpperCase()
    }
    

})

getConst("#user-saved-infos").addEventListener('click', ({target}) => {
    event.target.tagName === 'INPUT' ? checkOut(target.parentElement.parentElement.cells) : null
})