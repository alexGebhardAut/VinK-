class Address {
    constructor(addLine1, addLine2, city,
                stProReg, zipCode, countr){
        this._addLine1 = addLine1;
        this._addLine2 = addLine2;
        this._city = city;
        this._stProReg = stProReg;
        this._zipCode = zipCode;
        this._countr = countr;
    }

    //Getter and Setter
    get addLine1() {
        return this._addLine1;
    }

    set addLine1(value) {
        this._addLine1 = value;
    }

    get addLine2() {
        return this._addLine2;
    }

    set addLine2(value) {
        this._addLine2 = value;
    }

    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }

    get stProReg() {
        return this._stProReg;
    }

    set stProReg(value) {
        this._stProReg = value;
    }

    get zipCode() {
        return this._zipCode;
    }

    set zipCode(value) {
        this._zipCode = value;
    }

    get countr() {
        return this._countr;
    }

    set countr(value) {
        this._countr = value;
    }
}