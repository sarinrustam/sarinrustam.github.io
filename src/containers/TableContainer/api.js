import data from './data/data.json';

class Api {
  constructor() {
    this.key = 'activities';

    this.init();
  }

  init() {
    if (!(this.key in localStorage)) {
      this.addActivities(data.workoutDetails);
    }
  }

  addActivities(list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  addActivity(dataItem) {
    const allActivities = this.getActivities();
    const id = allActivities[allActivities.length - 1].id + 1;
    allActivities.push({ ...dataItem, id });
    this.addActivities(allActivities);
    return allActivities;
  }

  getActivities() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  editActivity(id, dataItem) {
    const allActivities = this.getActivities();
    const index = allActivities.findIndex(item => item.id === id);
    allActivities[index] = { ...dataItem, id };
    this.addActivities(allActivities);
    return allActivities;
  }

  deleteActivity(id) {
    const allActivities = this.getActivities();
    const index = allActivities.findIndex(item => item.id === id);
    const newAllActivities = allActivities.slice(0, index).concat(allActivities.slice(index, allActivities.length - 1));
    this.addActivities(newAllActivities);
    return newAllActivities;
  }
}

export default Api;

