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
    savedCars.forEach(car => addCarToList(car))
}

const checkOut = info => {
    const license = info[1].textContent
    const savedCars = getSavedCars().filter(cars => cars.license !== license)
    console.log(savedCars)
    localStorage.savedCars = JSON.stringify(savedCars)
    console.log(license, savedCars)
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
    console.log(userSavedAllInfos)
}

renderSavedCars()

userSendButton.addEventListener('click', event => { 
    const carInfos = [
        getConst("#input-user-car-model-one").value,
        getConst("#input-user-car-model-two").value
    ]

    

    if(!carInfos[0] || !carInfos[1]) { //A otimizar.
        getConst("#input-user-car-model-one").style.animation = 'shake-horizontal 500ms ease'
        getConst("#input-user-car-model-one").style.border = '1px solid red'
        getConst("#input-user-car-model-two").style.animation = 'shake-horizontal 500ms ease'
        getConst("#input-user-car-model-two").style.border = '1px solid red'
        setTimeout(() => {
            getConst("#input-user-car-model-one").style.border = '1px solid #252525'
            getConst("#input-user-car-model-two").style.border = '1px solid #252525'
        }, 500);
        return;
    }

    const newCar = {carModel: carInfos[0], carLicense: carInfos[1], time: new Date()}
    newCar.time = formatDate(newCar.time)
    addCarToList(newCar)
    
    const safeSaveCars = getSavedCars()
    safeSaveCars.push(newCar)

    localStorage.safeSaveCars = JSON.stringify(safeSaveCars)
    console.log(safeSaveCars)

    getConst("#input-user-car-model-one").value = ""
    getConst("#input-user-car-model-two").value = ""
})

userInterface.addEventListener('change', ({target}) => {
    const changedElement = event.target.tagName
    const userCarPlate = document.getElementById('input-user-car-model-two').value
    console.log(userCarPlate)

    if(changedElement == 'INPUT') {
        target.value = target.value.toUpperCase()
    }
    

})

getConst("#user-saved-infos").addEventListener('click', ({target}) => {
    event.target.tagName === 'INPUT' ? checkOut(target.parentElement.parentElement.cells) : null
})