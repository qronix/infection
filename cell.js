class Cell{
    constructor(cellObj){
        this.health     = cellObj.health;
        this.name       = cellObj.name;
        this.resistance = cellObj.resistance;
        this.status     = cellObj.status;
        this.infected   = cellObj.infected;
        this.cellId     = cellObj.cellId;
    }

    static generateCell(iD){
        let health = Math.floor(Math.random()*(100-50)+50);
        let resistance = Math.floor(Math.random()*10);
        let status = 'unknown';
        let infected = false;
        let cellId = iD;

        if(health>=80){
            status = 'healthy';
        }else if(health<80 && health>=50){
            status = 'damaged';
        }else if(health<50){
            status = 'dying';
        }else if(health<=0){
            status = 'dead';
        }

        let returnObj = {
            health,
            resistance,
            status,
            infected,
            cellId
        }
        return (returnObj);
    }

    getInfo(){
        let cellInfo = {
            name: this.name,
            health: this.health,
            resistance: this.resistance,
            status: this.status,
            infected: this.infected
        }
        return cellInfo;
    }

    setStatus(status){
        this.status = status;
    }
    setInfected(infected){
        this.infected = infected;
    }
}