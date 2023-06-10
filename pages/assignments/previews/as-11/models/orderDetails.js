
export class OrderDetails {
    constructor(_order_id,_cus_id,_item_id,_quantity,_price,_total) {
       this._order_id=_order_id;
       this._cus_id=_cus_id;
       this._item_id=_item_id;
       this._quantity=_quantity;
       this._price=_price;
       this._total=_total;
    }
    get total(){
        return this._total;
    }
    get order_id(){
        return this._order_id;
    }
    get cus_id(){
        return this._cus_id;
    }
    get item_id(){
        return this._item_id;
    }
    get quantity(){
        return this._quantity;
    }
    get price(){
        return this._price;
    }
    set order_id(_order_id){
        this._order_id=_order_id
    }
    set cus_id(_cus_id){
        this._cus_id=_cus_id;
    }
    set item_id(_item_id){
        this._item_id=_item_id
    }
    set quantity(_qty){
        this._qty=_qty
    }
    set price(_price){
        this._price=_price
    }
    set total(_total){
        this._total=_total;
    }
}