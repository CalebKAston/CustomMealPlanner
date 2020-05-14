import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  isLoading: false,
  userName: '',
  isLoggedIn: false,
  recipes: [],
  mealPlans: [],
  ingredients: [],
  schedulePieces: [
    {
      name: 'Snack',
      id: 1,
    },
    {
      name: 'Breakfast',
      id: 2,
    },
    {
      name: 'Lunch',
      id: 3,
    },
    {
      name: 'Dinner',
      id: 4,
    },
  ],
  scheduleTemplates: [],
  meals: [],
  measurements: [
    {
      name: 'Unit',
      display: 'unit',
      weightOunces: null,
      fluidOunces: null,
      id: 1,
    },
    {
      name: 'Pound',
      display: 'lbs',
      weightOunces: 16,
      fluidOunces: null,
      id: 2,
    },
    {
      name: 'Teaspoon',
      display: 'tsp',
      weightOunces: null,
      fluidOunces: 0.166667,
      id: 3,
    },
    {
      name: 'Tablespoon',
      display: 'tbsp',
      weightOunces: null,
      fluidOunces: 0.5,
      id: 4,
    },
    {
      name: 'Cup',
      display: 'c',
      weightOunces: null,
      fluidOunces: 8,
      id: 5,
    },
    {
      name: 'Pint',
      display: 'pt',
      weightOunces: null,
      fluidOunces: 16,
      id: 6,
    },
    {
      name: 'Quart',
      display: 'qt',
      weightOunces: null,
      fluidOunces: 32,
      id: 7,
    },
    {
      name: 'Gallon',
      display: 'gal',
      weightOunces: null,
      fluidOunces: 128,
      id: 8,
    },
  ],
  ingredientCategories: [
    {
      name: 'Bread',
      id: 1,
    },
    {
      name: 'Canned/Boxed',
      id: 2,
    },
    {
      name: 'Dairy',
      id: 3,
    },
    {
      name: 'Frozen',
      id: 4,
    },
    {
      name: 'Fruits',
      id: 5,
    },
    {
      name: 'Meat',
      id: 6,
    },
    {
      name: 'Vegetables',
      id: 7,
    },
  ],
  recipeCategories: [],
  tags: [],
};

export const actionTypes = {
  toggleIsLoading: 'TOGGLE_IS_LOADING',
  setUserName: 'SET_USER_NAME',
  setIsLoggedIn: 'SET_IS_LOGGED_IN',
  recipes: {
    add: 'ADD_RECIPE',
    update: 'UPDATE_RECIPE',
    remove: 'REMOVE_RECIPE',
  },
  mealPlans: {
    add: 'ADD_MEAL_PLAN',
    update: 'UPDATE_MEAL_PLAN',
    remove: 'REMOVE_MEAL_PLAN',
  },
  ingredients: {
    add: 'ADD_INGREDIENT',
    update: 'UPDATE_INGREDIENT',
    remove: 'REMOVE_INGREDIENT',
  },
  schedulePieces: {
    add: 'ADD_SCHEDULE_PIECE',
    update: 'UPDATE_SCHEDULE_PIECE',
    remove: 'REMOVE_SCHEDULE_PIECE',
  },
  scheduleTemplates: {
    add: 'ADD_SCHEDULE_TEMPLATE',
    update: 'UPDATE_SCHEDULE_TEMPLATE',
    remove: 'REMOVE_SCHEDULE_TEMPLATE',
  },
  meals: {
    add: 'ADD_MEAL',
    update: 'UPDATE_MEAL',
    remove: 'REMOVE_MEAL',
  },
  measurements: {
    add: 'ADD_MEASUREMENT',
    update: 'UPDATE_MEASUREMENT',
    remove: 'REMOVE_MEASUREMENT',
  },
  ingredientCategories: {
    add: 'ADD_INGREDIENT_CATEGORY',
    update: 'UPDATE_INGREDIENT_CATEGORY',
    remove: 'REMOVE_INGREDIENT_CATEGORY',
  },
  recipeCategories: {
    add: 'ADD_RECIPE_CATEGORY',
    update: 'UPDATE_RECIPE_CATEGORY',
    remove: 'REMOVE_RECIPE_CATEGORY',
  },
  tags: {
    add: 'ADD_TAG',
    update: 'UPDATE_TAG',
    remove: 'REMOVE_TAG',
  },
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.toggleIsLoading:
      return !state;
    default:
      return state;
  }
};

const userName = (state = '', action) => {
  switch (action.type) {
    case actionTypes.setUserName:
      return action.userName;
    default:
      return state;
  }
};

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case actionTypes.setIsLoggedIn:
      return action.isLoggedIn;
    default:
      return state;
  }
};

const recipes = (state = [], action) => {
  switch (action.type) {
    case actionTypes.recipes.add:
      return [...state, action.recipe];
    case actionTypes.recipes.update:
      return state.map(recipe => {
        if (recipe.id === action.id) return { ...recipe, ...action.recipe };
        return recipe;
      });
    case actionTypes.recipes.remove:
      const indexOf = state.indexOf(action.recipe);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const mealPlans = (state = [], action) => {
  switch (action.type) {
    case actionTypes.mealPlans.add:
      return [...state, action.mealPlan];
    case actionTypes.mealPlans.update:
      return state.map(mealPlan => {
        if (mealPlan.id === action.id)
          return { ...mealPlan, ...action.mealPlan };
        return mealPlan;
      });
    case actionTypes.mealPlans.remove:
      const indexOf = state.indexOf(action.mealPlan);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const ingredients = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ingredients.add:
      return [...state, action.ingredient];
    case actionTypes.ingredients.update:
      return state.map(ingredient => {
        if (ingredient.id === action.id)
          return { ...ingredient, ...action.ingredient };
        return ingredient;
      });
    case actionTypes.ingredients.remove:
      const indexOf = state.indexOf(action.ingredient);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const schedulePieces = (state = [], action) => {
  switch (action.type) {
    case actionTypes.schedulePieces.add:
      return [...state, action.schedulePiece];
    case actionTypes.schedulePieces.update:
      return state.map(schedulePiece => {
        if (schedulePiece.id === action.id)
          return { ...schedulePiece, ...action.schedulePiece };
        return schedulePiece;
      });
    case actionTypes.schedulePieces.remove:
      const indexOf = state.indexOf(action.schedulePiece);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const scheduleTemplates = (state = [], action) => {
  switch (action.type) {
    case actionTypes.scheduleTemplates.add:
      return [...state, action.scheduleTemplate];
    case actionTypes.scheduleTemplates.update:
      return state.map(scheduleTemplate => {
        if (scheduleTemplate.id === action.id)
          return { ...scheduleTemplate, ...action.scheduleTemplate };
        return scheduleTemplate;
      });
    case actionTypes.scheduleTemplates.remove:
      const indexOf = state.indexOf(action.scheduleTemplate);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const meals = (state = [], action) => {
  switch (action.type) {
    case actionTypes.meals.add:
      return [...state, action.meal];
    case actionTypes.meals.update:
      return state.map(meal => {
        if (meal.id === action.id) return { ...meal, ...action.meal };
        return meal;
      });
    case actionTypes.meals.remove:
      const indexOf = state.indexOf(action.meal);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const measurements = (state = [], action) => {
  switch (action.type) {
    case actionTypes.measurements.add:
      return [...state, action.measurement];
    case actionTypes.measurements.update:
      return state.map(measurement => {
        if (measurement.id === action.id) {
          return { ...measurement, ...action.measurement };
        }
        return measurement;
      });
    case actionTypes.measurements.remove:
      const indexOf = state.indexOf(action.measurement);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const ingredientCategories = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ingredientCategories.add:
      return [...state, action.ingredientCategory];
    case actionTypes.ingredientCategories.update:
      return state.map(ingredientCategory => {
        if (ingredientCategory.id === action.id)
          return { ...ingredientCategory, ...action.ingredientCategory };
        return ingredientCategory;
      });
    case actionTypes.ingredientCategories.remove:
      const indexOf = state.indexOf(action.ingredientCategory);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const recipeCategories = (state = [], action) => {
  switch (action.type) {
    case actionTypes.recipeCategories.add:
      return [...state, action.recipeCategory];
    case actionTypes.recipeCategories.update:
      return state.map(recipeCategory => {
        if (recipeCategory.id === action.id)
          return { ...recipeCategory, ...action.recipeCategory };
        return recipeCategory;
      });
    case actionTypes.recipeCategories.remove:
      const indexOf = state.indexOf(action.recipeCategory);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const tags = (state = [], action) => {
  switch (action.type) {
    case actionTypes.tags.add:
      return [...state, action.tag];
    case actionTypes.tags.update:
      return state.map(tag => {
        if (tag.id === action.id) return { ...tag, ...action.tag };
        return tag;
      });
    case actionTypes.tags.remove:
      const indexOf = state.indexOf(action.tag);
      return [...state.slice(0, indexOf), ...state.slice(indexOf + 1)];
    default:
      return state;
  }
};

const reducer = combineReducers({
  isLoading,
  userName,
  isLoggedIn,
  recipes,
  mealPlans,
  ingredients,
  schedulePieces,
  scheduleTemplates,
  meals,
  measurements,
  ingredientCategories,
  recipeCategories,
  tags,
});

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
};
