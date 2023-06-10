
export class Customer{
    constructor(_c_id,_fname,_lname,_address) {
        this._c_id=_c_id;
        this._fname=_fname;
        this._lname=_lname;
        this._address=_address;

    }
    get c_id(){
        return this._c_id;
    }
    get fname(){
        return this._fname;
    }
    get lname(){
        return this._lname;
    }
    get address(){
        return this._address;
    }
    set c_id(_c_id){
        this._c_id=_c_id
    }
    set fname(_fname){
        this._fname=_fname
    }
    set lname(_lname){
        this._lname=lname
    }
    set address(_address){
        this._address=_address
    }
}