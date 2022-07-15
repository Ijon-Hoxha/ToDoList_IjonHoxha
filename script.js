    let task = [];
    let openCount = 0;
    let closedCount = 0;

    function updateList() {
		localStorage.setItem("task", JSON.stringify(task));
		localStorage.setItem("openCount", JSON.stringify(openCount));
        localStorage.setItem("closedCount", JSON.stringify(closedCount));
	}
    function updatetaskList() {
        
        let taskList = document.getElementById("task");
        taskList.innerHTML = "";
        
        for (let i=0; i<task.length; i++) {
            let item = document.createElement("li");
            item.addEventListener("click", checkItem);
            item.innerHTML = task[i].text;
    
            if (task[i].status != "open") {
                item.style.textDecoration = "line-through";
            }
            taskList.append(item);
        }

        document.getElementById("open").innerHTML = openCount + " tasks open!";
        document.getElementById("close").innerHTML = closedCount + " tasks closed!";
    }
    function checkItem(event) {
        let currentCalcString = event.target.innerHTML;
        let index = task.map(i=>i.text).indexOf(currentCalcString);
        if (task[index].status == "open") {
            task[index].status = "closed";
            closedCount++;
            openCount--;
        } else {
            task[index].status = "open";
            openCount++;
            closedCount--;
        }
        updatetaskList();
        if((task.length == closedCount) && task.length > 0){
            alert("All tasks finished! Good Job! ^-^");
        }
    }
    function deleteList() {
        task = [];
        openCount = 0;
        closedCount = 0;
        updateList();
        updatetaskList();
    }
    function add(){
        let content = document.getElementById("number1").value;
        task.push({"text": content, "status": "open"});
        openCount++;
        updateList();
        updatetaskList();
    }
    function loadtask() {
	    openCount = JSON.parse(localStorage.getItem("openCount"));
        closedCount = JSON.parse(localStorage.getItem("closedCount"));
        task = JSON.parse(localStorage.getItem("task"));
		if (task == null) {
			task = [];
		}
		updateList();
    }

    document.getElementById("add").addEventListener("click", add);
    document.getElementById("delete").addEventListener("click", deleteList);
    document.addEventListener("DOMContentLoaded", loadtask);