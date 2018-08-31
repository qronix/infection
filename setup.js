function Setup(systemManager){
    //game area element
    var targetArea = document.getElementById('virusDish');
    //setTimeout IDs of visible cell information windows
    var activeWindowIds = [];
    //Continuously monitor the activeWindowIds array
    //setInterval ids are pushed into the activeWindowIds array 
    var manageWindows = setInterval(function(){
        //get all ids except newest id
        var cleanActiveWindows = Array.from(new Set(activeWindowIds)); //remove dupes
        activeWindowIds = cleanActiveWindows;
        //If more than one window is in the array
        //cut the last index off of the array, shove the remaining indicies into the kill list,
        //kill each window by clearing the interval
        //NOTE: probably would be cleaner to clear the windows too
        //NOTE: This function was necessary because hovering over a game cell will sometimes lead to
        //the mouse inadvertently hovering over the information window after leaving the game cell
        //this causes the mouseleave event to never fire and thus the setInterval from the mouseEnter
        //event listener continues to fire leading to several information windows on screen
        if(cleanActiveWindows.length>=2){
            var windowIdsToKill = Array.from(cleanActiveWindows.splice(0,cleanActiveWindows.length-1));
            windowIdsToKill.forEach(windowId=>{console.log(`Killing: ${windowId}`);clearInterval(windowId);});
        }
    },50);
    //Create the game cell divs based on the system manager cell group width (width of the game area)
    for(let i=0; i<systemManager.cellGroupWidth**2; i++){
        let cellElement = document.createElement('div');
        cellElement.id = i;
        let timerId; //holds the setInterval id from the mouseenter event listener

        cellElement.addEventListener('mouseenter',function(e){
            let idInArray = false; //change this to just check the activeWindow array
            timerId = setInterval(function(){
                //clear any visible information windows
                systemManager.clearCellInfoWindows();
                //create a new information window
                systemManager.displayCellInfo(cellElement,cellElement.id);
                if(!idInArray){
                    activeWindowIds.push(timerId); //add setInterval return id to management array
                }
            },100);
        });
        //When the mouse has left a cell, clear the interval which is showing the window and delete the window
        cellElement.addEventListener('mouseleave',function(){
            systemManager.clearCellInfoWindows();
            clearInterval(timerId);
        });
        cellElement.classList.add('cellElement');
        targetArea.appendChild(cellElement);
    }
}