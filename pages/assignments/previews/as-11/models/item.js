export class Item{
    constructor(_i_id,_i_name,_qty,_price) {
        this._i_id=_i_id;
        this._i_name=_i_name;
        this._qty=_qty;
        this._price=_price;

    }
    get i_id(){
        return this._i_id;
    }
    get i_name(){
        return this._i_name;
    }
    get qty(){
        return this._qty;
    }
    get price(){
        return this._price;
    }
    set id(_i_id){
        this._i_id=_i_id
    }
    set i_name(_i_name){
        this._i_name=_i_name
    }
    set qty(_qty){
        this._qty=_qty
    }
    set price(_price){
        this._price=_price
    }
}