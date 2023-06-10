export class Order {
    constructor(_order_detail_list,_total) {
        this._order_detail_list=_order_detail_list
        this._total=_total
    }
    get order_detail_list(){
       return  this._order_detail_list
    }
    set order_detail_list(_order_detail_list){
        this._order_detail_list=_order_detail_list;
    }
    set total(_total){
        this._total=_total
    }
    get total(){
        return this._total
    }
}