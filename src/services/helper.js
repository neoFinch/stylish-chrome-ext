const helper = {

  getNumDaysByMonth: (month) => {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month];
  },

  getTodayDate: () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  },

  groupTasksByDate: (tasks) => {
    const groupedTasks =  tasks.reduce((groups, task) => {
      console.log('task day : ', task.day);
      const date = task.day;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(task);
      return groups;
    }, {});
    const groupArrays = Object.keys(groupedTasks).map((day) => {
      return {
        day,
        tasks: groupedTasks[day]
      };
    });
    return groupArrays;
  },

  createSnackbar: (mssg, time, background='blue') => {
    let snackBar = document.createElement('div');
    snackBar.style.background = background;
    snackBar.style.padding = '10px';
    snackBar.style.position = 'absolute';
    snackBar.style.bottom = '30px';
    snackBar.style.left = '30px';
    snackBar.style.borderRadius = '5px';
    snackBar.innerHTML = mssg;
    
    document.body.appendChild(snackBar);

    setTimeout(() => {
      document.body.removeChild(snackBar);
    }, time)
  }
}

export default helper;

