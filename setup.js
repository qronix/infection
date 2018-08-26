function Setup(systemManager){
    var targetArea = document.getElementById('virusDish');
    var activeWindowIds = [];
    var manageWindows = setInterval(function(){
        //get all ids except newest id
        var cleanActiveWindows = Array.from(new Set(activeWindowIds)); //remove dupes
        activeWindowIds = cleanActiveWindows;
        if(cleanActiveWindows.length>=2){
            var windowIdsToKill = Array.from(cleanActiveWindows.splice(0,cleanActiveWindows.length-1));
            console.log('Clean active windows');
            console.dir(cleanActiveWindows);
            console.log('Window ids to kill');
            console.dir(windowIdsToKill);
            windowIdsToKill.forEach(windowId=>{console.log(`Killing: ${windowId}`);clearInterval(windowId);});
        }
    },50);
    for(let i=0; i<systemManager.cellGroupWidth**2; i++){
        let cellElement = document.createElement('div');
        cellElement.id = i;
        let timerId;

        cellElement.addEventListener('mouseenter',function(e){
            // systemManager.clearCellInfoWindows();
            // systemManager.displayCellInfo(cellElement,cellElement.id);
            timerId = setInterval(function(){
                // systemManager.removeCellInfo(cellElement,cellElement.id);
                console.log(`Firing id: ${timerId}`);
                systemManager.clearCellInfoWindows();
                systemManager.displayCellInfo(cellElement,cellElement.id);
                activeWindowIds.push(timerId);
            },100);
            // e.stopPropagation();
            // console.log(`Fired (enter): ${fired}`);
        });
        cellElement.addEventListener('mouseleave',function(){
            systemManager.clearCellInfoWindows();
            // console.log('In mouse leave');
            clearInterval(timerId);
        });
        cellElement.classList.add('cellElement');
        targetArea.appendChild(cellElement);
    }
}