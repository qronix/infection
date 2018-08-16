class systemManager{
    constructor(cellGroupSize){
        this.cellGroupSize = cellGroupSize;
        this.cellGroup = [];
    }
    setupCellGroup(){
        for(let i=0; i<this.cellGroupSize; i++){
            let cellObj = Cell.generateCell();
            cellObj.name = `Cell: ${i+1}`;
            this.cellGroup.push(cellObj);
        }
    }
    addVirus(virusObj){
        let virus = new virus;
    }
    getCellInfo(cellId){
        return this.cellGroup[cellId];
    }
    displayCellInfo(cellElement,cellId){
        let cellObj = this.getCellInfo(cellId);
        let infoWindow = document.createElement('div');
        infoWindow.classList.add('infoWindow');
        for(let property in cellObj){
            let infoLine = document.createElement('p');
            infoLine.innerText = `${property}: ${cellObj[property]}`;
            infoWindow.appendChild(infoLine);
        }
        cellElement.appendChild(infoWindow);
    }
    removeCellInfo(cellElement){
        let target = cellElement.childNodes[0];
        cellElement.removeChild(target);
    }
}