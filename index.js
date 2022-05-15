const currentDate = new Date()
const [month, weekday] = currentDate.toLocaleDateString(undefined, { month: 'short', weekday: 'long' }).split(" ")
const year = currentDate.getFullYear()
const day = currentDate.getDate()

const setCurrentDate = () => {
    document.getElementById("todo-day").innerText = day
    document.getElementById("todo-year").innerText = year
    document.getElementById("todo-month").innerText = month
    document.getElementById("todo-weekday").innerText = weekday
}

setCurrentDate()