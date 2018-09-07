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
            } else {
                console.log("nope fuck you " + this._people[i].fullName)
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

sushiDatabase = {
    "people": [
        {
            "fullName": "Kanye West",
            "likesSushi": 0,
            "sushiSource": "https://www.thesun.co.uk/tvandshowbiz/4842284/kanye-west-own-food-sushi-restaurant-kim-kardashian/",
            "date": 20171104
        },
        {
            "fullName": "Lil Wayne",
            "likesSushi": 0,
            "sushiSource": "https://youtu.be/8gyLR4NfMiI?t=2m48s",
            "date": 20110310
        },
        {
            "fullName": "Chris Brown",
            "likesSushi": 1,
            "sushiSource": "https://www.capitalxtra.com/artists/chris-brown/news/royalty-4th-birthday-party/",
            "date": 20180526
        },
        {
            "fullName": "Miley Cyrus",
            "likesSushi": 2,
            "sushiSource": "http://www.dailymail.co.uk/tvshowbiz/article-4359934/Liam-Hemsworth-treats-Miley-Cyrus-sushi-date-night.html",
            "date": 20170329
        },
        {
            "fullName": "Liam Hemsworth",
            "likesSushi": 2,
            "sushiSource": "http://www.dailymail.co.uk/tvshowbiz/article-4359934/Liam-Hemsworth-treats-Miley-Cyrus-sushi-date-night.html",
            "date": 20170329
        },
        {
            "fullName": "Chris Hemsworth",
            "likesSushi": 2,
            "sushiSource": "http://www.dailymail.co.uk/tvshowbiz/article-5903891/Chris-Hemsworth-fails-high-five-sushi-restaurant-owner.html",
            "date": 20180630
        },
        {
            "fullName": "Jennifer Lawrence",
            "likesSushi": 2,
            "sushiSource": "https://www.smh.com.au/entertainment/celebrity/recoupled-jennifer-lawrence-and-chris-martin-eat-sushi-together-20150102-12gryj.html",
            "date": 20150102
        },
        {
            "fullName": "Gabe Newell",
            "likesSushi": 2,
            "sushiSource": "https://imgur.com/a8T6Vfa",
            "date": 20160811
        }
    ]
};

let peopleList = new People([]);
peopleList.convertFromJSON(sushiDatabase);
let results = ["NO.", "MAYBE¿", "YES."];

document.getElementById("input").onkeypress = function(e){
    if (!e) e = window.event;
    console.log(e.key);
    if (e.key === "Enter"){
        let fullName = document.getElementById("input").value;
        updatePage(fullName);
    }
};

function updatePage(fullname) {
    let person = peopleList.getPerson(fullname);
    document.getElementById("result").innerHTML = results[person.likesSushi];
    document.getElementById("result").style.visibility = "visible";
    document.getElementById("sauce").childNodes[0].href = person.sushiSource;
    document.getElementById("sauce").style.visibility = "visible";
    document.getElementById("conflict").style.visibility = "visible";
}