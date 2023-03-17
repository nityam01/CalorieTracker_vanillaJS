import '@fortawesome/fontawesome-free/js/all'
import { Modal, Collapse } from 'bootstrap';
import './css/bootstrap.css'
import './css/style.css'

import CalorieTracker from './js/Tracker.js'
import { Meal, Workout } from './js/Item.js'

// console.log('hi')

/* ------------------------------------------------------ */


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
    const bsCollapse = new Collapse(collapseWorkout, {
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
    const modal = Modal.getInstance(modalEl)
    modal.hide()
  }
}
const app = new App();
