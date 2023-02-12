module.exports = class Player{
    constructor(name, sid, res, isClientOnline){
        this.name = name;
        this.sid = sid;
        this.res = res;
        this.isClientOnline = isClientOnline;
    }
}