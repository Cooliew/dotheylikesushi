var url = new URL(window.location.href);
var linkName = url.searchParams.get("p");

class Person {
    constructor(fullName, likesSushi, sushiSource, date) {
        this._fullName = fullName;
        this._likesSushi = likesSushi;
        this._sushiSource = sushiSource;
        this._date = date;
    }

    get fullName() {
        return this._fullName
    }

    get likesSushi() {
        return this._likesSushi
    }

    get sushiSource() {
        return this._sushiSource
    }

    get date() {
        return this._date
    }

    get day() {
        let day = this._date % 100;
        return day
    }

    get month() {
        let month = Math.floor(this._date / 100) % 100;
        return month
    }

    get year() {
        let year = Math.floor(this._date / 10000);
        return year
    }

    convertFromJSON(personJSON) {
        this._fullName = personJSON.fullName;
        this._likesSushi = personJSON.likesSushi;
        this._sushiSource = personJSON.sushiSource;
        this._date = personJSON.date;

    }
}

class People {
    constructor(people) {
        this._people = people;
    }

    getPerson(fullName) {
        for (let i = 0; i < this._people.length; i++) {
            if (fullName === this._people[i].fullName) {
                return this._people[i]
            }
        }
        return false
    }

    convertFromJSON(peopleJSON) {
        if (peopleJSON.people) {
            for (let i = 0; i < peopleJSON.people.length; i++) {
                let person = new Person("", 0, "", 0);
                person.convertFromJSON(peopleJSON.people[i]);
                this._people.push(person);
            }
        }
    }
}

sushiDatabase = []

$.getJSON("http://www.dotheylikesushi.com/js/sushiDatabase.json", function(json) {
    sushiDatabase = json;
});

let peopleList = new People([]);
peopleList.convertFromJSON(sushiDatabase);
let results = ["NO.", "MAYBE?", "YES."];

document.getElementById("input").onkeypress = function(e){
    if (!e) e = window.event;
    if (e.key === "Enter"){
        let fullName = document.getElementById("input").value;
        window.location.href = "http://www.dotheylikesushi.com?p=" + fullName.replace(/\s/g,"_").toLowerCase();
    }
};

document.getElementById("submission").onkeypress = function(e){
    if (!e) e = window.event;
    if (e.key === "Enter"){
        
    }
};

function updatePage(person) {
    if (person) {
        document.getElementById("input").value = person;
        document.getElementById("result").innerHTML = results[person.likesSushi];
        document.getElementById("result").style.visibility = "visible";
        document.getElementById("source").setAttribute("href", person.sushiSource);
        document.getElementById("sauce").style.visibility = "visible";
        document.getElementById("conflict").style.visibility = "visible";
        document.getElementById("maillink").innerHTML = "have you seen a conflicting soy source?";
    } else {
        document.getElementById("result").innerHTML = results[1];
        document.getElementById("result").style.visibility = "visible";
        document.getElementById("sauce").style.visibility = "hidden";
        document.getElementById("conflict").style.visibility = "visible";
        document.getElementById("maillink").innerHTML = "can you find a delicious soy source?";
        document.getElementById("maillink").href = "/submissions.html";
    }
}

function createSubmission(fullName, likesSushi, source) {
    
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

if (linkName != null) {
    updatePage(toTitleCase(linkName.replace(/_/g," ")));
}