class Cell{
    constructor(cellObj){

    }

    static generateCell(){
        let health = Math.floor(Math.random()*(100-50)+50);
        let resistance = Math.floor(Math.random()*10);
        let status = 'unknown';
        let infected = false;

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
            infected
        }
        return (returnObj);
    }
}