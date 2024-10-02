import * as model from './model.js'
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import paginationView from './Views/paginationView.js';
import resultView from './Views/resultView.js';
import bookmarksView from './Views/bookmarksView.js';
import addRecipeView from './Views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// console.log(icons);//

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipes= async function () {
  try {
    const id =window.location.hash.slice(1);
    
    if(!id) return;
    recipeView.renderSpinner();
    // update Result view to mark selected
    resultView.render(model.getSearchResultsPage());
    //Loading recipe
   await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  
  } catch (error) {
   console.error(error);
   recipeView.renderError()
  }
};

const controlSearchResults=async function () {
  try {
    resultView.renderSpinner();
    //1 Get search query
     const query=searchView.getQuery();
     if(!query) return;

    //2 Load search results

    await model.loadSearchResults(query);

    //3 Render results

    // console.log(model.state.search.result);
    resultView.render(model.getSearchResultsPage());
    

    //4) Render initial pagination
    paginationView.render(model.state.search);

    
  } catch (err) {
    console.error(err);
  }
  
};
const controlPagination= function(goto){
  //1) Render results
    resultView.render(model.getSearchResultsPage(goto));
    //2) Render initial pagination
    paginationView.render(model.state.search);
}
const controlServing=function(newServings){
  //update the recipe servings{in states}
  model.updateServings(newServings);
  // Rendering Recipe
  recipeView.render(model.state.recipe);
}
const controlAddBookmark=function(){
  //Add/remove bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
 //render recipe view
  recipeView.render(model.state.recipe);

  //Render bookmarks
 bookmarksView.render(model.state.bookmarks); 
};

const controlBookmarks=function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe=async function(newRecipe){
  try{
    //loading Spinner
    addRecipeView.renderSpinner();
  // console.log(newRecipe);
  await model.uploadRecipe(newRecipe);
  console.log(model.state.recipe);

  //Render Recipe:
  recipeView.render(model.state.recipe);
    //Success mSG
    addRecipeView.renderMessage();

    //Render bookmarks
 bookmarksView.render(model.state.bookmarks); 

 //Change ID in URL
 window.history.pushState(null,'',`#${model.state.recipe.id}`);
  //close form window
  setTimeout(() => {
    addRecipeView.toggleWindow();
  }, MODAL_CLOSE_SEC*1000);

  }catch(err){
    console.error('❌',err);
    addRecipeView.renderError(err.message);
  }
};

//calling addHandlerRender()

const init=function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(getRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
}
init();