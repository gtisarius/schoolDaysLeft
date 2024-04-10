//import dayCreator from "./days.js";
const fs = require("fs");
const { parse } = require("csv-parse");

let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
let monthsAbb = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

const newDate = new Date();
const currentDate = newDate.toDateString()

function getMonth(monthIndex) {
    let month = months[monthIndex]
    return month
}

let days = []
let schoolDays = []
let regularDays = []

function getPreviousDays() {
    const previousDays = []
    for (let i = 1; i <= 100; i++) {
        const previousDay = new Date(newDate)
        previousDay.setDate(newDate.getDate() - i)
        previousDays.push(getFormattedDate(previousDay.toDateString()))
    }
    return previousDays
}

class dayCreator {
    constructor(day, isSchoolDay) {
        this.day = day
        this.isSchoolDay = isSchoolDay
    }
}

function trueOrFalse(text) {
    if (text == 'TRUE') {
        return true
    } else {
        return false
    }
}

function getFormattedDate(date) {
    if (typeof(date) == "string") {
        dateFormat = date.split(' ');
        let finalDate = `${getMonth(monthsAbb.indexOf(dateFormat[1]))} ${Number(dateFormat[2])}, ${Number(dateFormat[3])}`
        return finalDate
    }
}
let prevDays = getPreviousDays()

fs.createReadStream("./calendar.csv")
    .pipe(parse({ delimiter: ","}))
    .on("data", function (row) {
        regularDays.push(row[0])
        if (row[0] !== getFormattedDate(currentDate)) {
            if (prevDays.includes(row[0]) == false) {
                days.push(new dayCreator(row[0], trueOrFalse(row[1])))
            }
        }
    })
    .on("error", function (err) {
        console.log(err.message);
    })
    .on("end", function () {
        //console.log(days)
        for (let i = 0; i < days.length; i++) {
            if (days[i].isSchoolDay == true) {
                schoolDays.push(days[i].day)
            }
        }
        //console.log(schoolDays)
        //console.log(schoolDays.length)
        console.log(`Today's date is ${getFormattedDate(currentDate)}. \n`)
        console.log(`There are \n${schoolDays.length}\ndays left in the year.\n`)

        //console.log(newDate)
        //console.log(prevDays)
    }) 