// console.log('hi')
class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCalorieLimit();
    this._displayCalorieTotal();
    this._displayCalorieConsumed();
    this._displayCalorieBurned();
    this._displayCalorieRemaining();
    this._displayCalorieProgress();

    document.getElementById('limit').value = this._calorieLimit
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveMeal(meal)
    this._displayNewMeal(meal);

    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.saveWorkout(workout)
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id){
    let index = this._meals.findIndex(meal => meal.id === id)

    if(index !== -1){
      let meal = this._meals[index]
      this._totalCalories -= meal.calories
    Storage.updateTotalCalories(this._totalCalories);
    Storage.removeMeal(id)
      this._meals.splice(index, 1)
      this._render()
    }
  }

  removeWorkout(id){
    let index = this._workouts.findIndex(workout => workout.id === id)

    if(index !== -1){
      let workout = this._workouts[index]
      this._totalCalories -= workout.calories
    Storage.updateTotalCalories(this._totalCalories);
    Storage.removeWorkout(id)
      this._workouts.splice(index, 1)
      this._render()
    }
  }

  reset(){
    this._totalCalories = 0
    this._meals = []
    this._workouts = []

    Storage.clearAll()
    this._render()
  }


  setLimit(calorieLimit){
    this._calorieLimit = calorieLimit

    Storage.setCalorieLimit(calorieLimit)

    this._displayCalorieLimit()
    this._render()
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  // PRIVATE METHODS
  _displayCalorieTotal() {
    const totalCalorieEl = document.getElementById("calories-total");
    // console.log(totalCalorieEl)
    totalCalorieEl.innerHTML = this._totalCalories;
  }

  _displayCalorieLimit() {
    const calorieTotalEl = document.getElementById("calories-limit");
    console.log(calorieTotalEl);
    calorieTotalEl.innerHTML = this._calorieLimit;
  }

  _displayCalorieConsumed() {
    const calorieConsumedEl = document.getElementById("calories-consumed");
    const consumed = this._meals.reduce((acc, meal) => {
      return (acc += meal.calories);
    }, 0);
    calorieConsumedEl.innerHTML = consumed;
  }

  _displayCalorieBurned() {
    const calorieBurnedEl = document.getElementById("calories-burned");
    const consumed = this._workouts.reduce((acc, work) => {
      return (acc += work.calories);
    }, 0);
    calorieBurnedEl.innerHTML = consumed;
  }

  _displayCalorieRemaining() {
    const calorieRemainingEl = document.getElementById("calories-remaining");
    const remaining = this._calorieLimit - this._totalCalories;
    calorieRemainingEl.innerHTML = remaining;

    //
    const progressEl = document.getElementById("calorie-progress");
    if (remaining <= 0) {
      calorieRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      calorieRemainingEl.parentElement.parentElement.classList.add("bg-danger");

      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      calorieRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      calorieRemainingEl.parentElement.parentElement.classList.add("bg-light");

      progressEl.classList.remove("bg-danger");
      progressEl.classList.add("bg-success");
    }
  }

  _displayCalorieProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById("meal-items");
    const mealEl = document.createElement("div");
    mealEl.classList.add('card','my-2')
    mealEl.setAttribute('data-id', meal.id)

    mealEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${meal.name}</h4>
      <div
        class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
      >
        ${meal.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    `

    mealsEl.appendChild(mealEl)

  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h4 class="mx-1">${workout.name}</h4>
      <div
        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
      >
        ${workout.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
    `;

    workoutsEl.appendChild(workoutEl);
  }

  _render() {
    this._displayCalorieTotal();
    this._displayCalorieConsumed();
    this._displayCalorieBurned();
    this._displayCalorieRemaining();
    this._displayCalorieProgress();
  }
}

/* ------------------------------------------------------ */
class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16);
    this.name = name;
    this.calories = calories;
  }
}

// const tracker = new CalorieTracker();

// const breakfast = new Meal('Breakfast', 500);
// tracker.addMeal(breakfast);

// const lunch = new Meal('Lunch', 600);
// tracker.addMeal(lunch);

// const run = new Workout('Morning run', 300);
// tracker.addWorkout(run);
// console.log(run)
// console.log(tracker)


class Storage{
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  static getTotalCalories(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }
    return totalCalories;
  }

  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });

    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }

  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });

    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');

    // If you want to clear the limit
    // localStorage.clear();
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._loadEventListners()
    this._tracker.loadItems()
  }

  _loadEventListners(){
    document
    .getElementById("meal-form")
    .addEventListener("submit", this._newItem.bind(this, 'meal'));
  document
    .getElementById("workout-form")
    .addEventListener("submit", this._newItem.bind(this, 'workout'));


    document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this, 'meal'))
    document.getElementById('workout-items').addEventListener('click',this._removeItem.bind(this, 'workout'))

    document.getElementById('filter-meals').addEventListener('keyup',this._filterItems.bind(this, 'meal'))
    document.getElementById('filter-workouts').addEventListener('keyup',this._filterItems.bind(this, 'workout'))


    document.getElementById('reset').addEventListener('click',this._reset.bind(this))

    document.getElementById('limit-form').addEventListener('submit',this._setLimit.bind(this))
  }

  _newItem(type, e){
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    if(type === 'meal'){
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    }else{
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }

    name.value = "";
    calories.value = "";

    const collapseWorkout = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }

  _removeItem(type,e){
    if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
     
    const id= e.target.closest('.card').getAttribute('data-id')

    if(type === 'meal'){
        this._tracker.removeMeal(id)
    } else{
      this._tracker.removeWorkout(id)
    }
    
    e.target.closest('.card').remove()

  }
}

  _filterItems(type,e){

    let text = e.target.value.toLowerCase();
    // console.log(type + ': ' + text)
    document.querySelectorAll(`#${type}-items .card`).forEach((item)=>{
      const name = item.firstElementChild.firstElementChild.textContent
      console.log(name)
      if(name.toLowerCase().indexOf(text) !== -1){
        item.style.display = 'block'
      }else{
        item.style.display = 'none'
      }
    })
  }

  _reset(e){
    // e.preventDefault()

    this._tracker.reset()
    
    // Clear the UI
    document.getElementById('meal-items').innerHTML = ''
    document.getElementById('workout-items').innerHTML = ''
    document.getElementById('filter-meals').value = ''
    document.getElementById('filter-workouts').value = ''
  }

  _setLimit(e){
    e.preventDefault()

    const limit = document.getElementById('limit')

    if(limit.value === ''){
      alert('Please enter a limit')
      return
    }

    this._tracker.setLimit(+limit.value)
    limit.value = ''

    const modalEl = document.getElementById('limit-modal')
    const modal = bootstrap.Modal.getInstance(modalEl)
    modal.hide()
  }
}
const app = new App();
