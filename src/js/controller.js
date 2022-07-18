import * as model from './model.js';
import recipeView from './views/recipeView.js';

// these imports makes sure old browsers are being supported
// polyfilling ansyc Await
import 'regenerator-runtime/runtime';
// polyfiling everything else
import 'core-js/stable';

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
