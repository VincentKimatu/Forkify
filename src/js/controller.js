import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// these imports makes sure old browsers are being supported
// polyfilling ansyc Await
import 'regenerator-runtime/runtime';
// polyfiling everything else
import 'core-js/stable';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    searchView.clearInput();

    if (!query) return;
    resultView.renderSpinner();

    // Load search result
    await model.loadSearchResult(query);

    // Render result
    resultView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResult();

const controlPagination = function (goToPage) {
  // Render NEW result
  resultView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();
