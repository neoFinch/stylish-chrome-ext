const helper = {

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
  }
}

export default helper;
