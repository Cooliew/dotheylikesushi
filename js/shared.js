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

    getPerson(name) {
        for (let i = 0; i < this._people.length; i++) {
            if (name === this._people[i].name) {
                return this._people[i]
            }
        }
        return false
    }

    convertFromJSON(peopleJSON) {
        if (peopleJSON) {
            for (let i = 0; i < peopleJSON.length; i++) {
                let person = new Person("", 0, "", 0);
                person.convertFromJSON(peopleJSON[i]);
                this._people.push(person);
            }
        }
    }
}