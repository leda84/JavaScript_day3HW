//creating variable for form
const form = document.querySelector('#testDataForm')

// adding event listener for Submission of form
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let season = document.querySelector('#season');
    let round = document.querySelector('#round')
    let jsonData = getData(season, round)
    loadData(jsonData)
})

// Get our racer data
const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season.value}/${round.value}/driverStandings.json`)
    // might need console log
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,7)
}

const DOM_Elements={
    racers: '.racer-list'
}

const racerTableBody = document.querySelector("#racerTableBody");


const createList = (position, givenName, familyName, nationality, sponsor, points) => {
    let html = `<tr><td>${position}</td>
    <td>${givenName}</td>
    <td>${familyName}
    <td>${nationality}</td>
    <td>${sponsor}</td>
    <td>${points}</td></tr>`;
    racerTableBody.innerHTML += html;
}

const racerTable = document.querySelector('.table')


const loadData = async (jsonData) => {
    const racerList = await jsonData
    racerTableBody.innerHTML = ''
    racerTable.style.display = 'table'
    racerList.forEach(element => createList(element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name, element.points));
    console.log(racerList[0])
}