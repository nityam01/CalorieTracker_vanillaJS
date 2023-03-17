// console.log('hi')
class CalorieTracker {
  constructor() {
    this._calorieLimit = 2200;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCalorieLimit();
    this._displayCalorieTotal();
    this._displayCalorieConsumed();
    this._displayCalorieBurned();
    this._displayCalorieRemaining();
    this._displayCalorieProgress();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;

    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;

    this._render();
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

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newMeal.bind(this));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._addWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();
    console.log(this);
    const name = document.getElementById("meal-name");
    const calories = document.getElementById("meal-calories");

    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    const meal = new Meal(name.value, +calories.value);
    this._tracker.addMeal(meal);

    name.value = "";
    calories.value = "";

    const collapseMeal = document.getElementById("collapse-meal");
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
  }

  _addWorkout(e) {
    e.preventDefault();
    console.log(this);
    const name = document.getElementById("workout-name");
    const calories = document.getElementById("workout-calories");

    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    const workout = new Workout(name.value, +calories.value);
    this._tracker.addWorkout(workout);

    name.value = "";
    calories.value = "";

    const collapseWorkout = document.getElementById("collapse-meal");
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

const app = new App();
