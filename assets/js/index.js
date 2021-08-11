
let interval = null

function clearInitiateInterval (value) {
    if (interval) {
        clearInterval(interval)
        const startButtonId = `start-${value}`
        const stopButtonId = `stop-${value}`

        document.getElementById(startButtonId).disabled = false
        document.getElementById(stopButtonId).disabled = true
    }
}


function addTodo () {
    const { value } = document.getElementById('todo-input')
    const valueTime = document.getElementById('todo-time-input').value

    if (value.length > 0) {
    
        let element = document.getElementById('todo-list')
        const node = document.createElement('LI')

        const buttonDelete = document.createElement('BUTTON')
        const buttonConcluded = document.createElement('BUTTON')
        const buttonStart = document.createElement('BUTTON')
        const buttonStop = document.createElement('BUTTON')

        const spanTimer = document.createElement('SPAN')
        spanTimer.setAttribute('id', `span-timer-${value}`)
        spanTimer.innerHTML = valueTime

        buttonDelete.innerHTML = 'Delete'
        buttonDelete.addEventListener('click', () => removeTodo(value))
        buttonDelete.setAttribute('id', `button-${value}`)

        buttonConcluded.innerHTML = 'Done'
        buttonConcluded.addEventListener('click', () => concludedTodo(value))
        buttonConcluded.setAttribute('id', `concluded-${value}`)

        buttonStart.innerHTML = 'Start'
        buttonStart.addEventListener('click', () => startTodo(value))
        buttonStart.setAttribute('id', `start-${value}`)

        buttonStop.innerHTML = 'Stop'
        buttonStop.addEventListener('click', () => stopTodo(value))
        buttonStop.setAttribute('id', `stop-${value}`)
        buttonStop.disabled = true

        node.setAttribute('id', value)

        node.innerHTML = value
        node.appendChild(spanTimer)
        node.appendChild(buttonStart)
        node.appendChild(buttonStop)
        node.appendChild(buttonConcluded)
        node.appendChild(buttonDelete)

        element.appendChild(node)

        document.getElementById('todo-input').value = ""
        document.getElementById('todo-time-input').value = ""
    }
}

function removeTodo (value) {
    document.getElementById(value).remove()
    if (interval) clearInterval(interval)
}

function concludedTodo (value) {
    const buttonId = `concluded-${value}`
    document.getElementById(value).style.textDecoration = 'line-through'
    document.getElementById(buttonId).disabled = true
    clearInitiateInterval(value)
}


function startTodo (value) {
    const spanId = `span-timer-${value}`
    const startButtonId = `start-${value}`
    const stopButtonId = `stop-${value}`

    document.getElementById(startButtonId).disabled = true
    document.getElementById(stopButtonId).disabled = false

    interval = setInterval(() => {
        let element = document.getElementById(spanId)
        let timer = element.textContent.split(':')
        let minutesTimer = Number(timer[0])
        let secondsTimer = Number(timer[1])
        let minutes = ''
        let seconds = ''

        if (minutesTimer > 0 && secondsTimer === 0) {
            minutes = --minutesTimer
            seconds = "59"

        } else if (minutesTimer > 0 && secondsTimer > 0) {
            minutes = --minutesTimer
            seconds = --secondsTimer
            
        } else if (minutesTimer === 0 && secondsTimer > 0) {
            minutes = '0'
            seconds = --secondsTimer
        } else if (minutesTimer === 0 && secondsTimer === 0) {
            minutes = '0'
            seconds = '0'
            clearInterval()
        }

        element.innerHTML = [minutes < 10 ? `0${minutes}` : minutes, seconds < 10 ? `0${seconds}` : seconds].join(':')

    }, 1000)
}

function stopTodo (value) {
    clearInitiateInterval(value)
}