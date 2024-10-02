import View from "./View.js";
import icons from '../../img/icons.svg';



 class PaginationView extends View{
    _parentElement=document.querySelector('.pagination');
    _errorMessage='No recipes found for your query ! Please try again ;)';
   

addHandlerClick(handler){
    this._parentElement.addEventListener('click',function(e){

        const btn=e.target.closest('.btn--inline');
        if(!btn) return;
        const goTo=+btn.dataset.goto;
        handler(goTo);
        
    });
}

    _generateMarkup(){
        const numPages=Math.ceil(this._data.result.length/this._data.resultPerPage);
        const cur_page=this._data.page;
       
        //page 1 , and there are other pages
        if(cur_page ===1 && numPages>1)
            return `
                <button data-goto="${cur_page+1}" class="btn--inline pagination__btn--next">
            <span>Page ${cur_page+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <div class="current_page">
          ${cur_page}
          </div>
        ` ;
        //Last Page
        if(cur_page===numPages && numPages>1)
            return`
                <button data-goto="${cur_page-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${cur_page-1}</span>
          </button>
          <div class="current_page">
          ${cur_page}
          </div>
          
          
        `;

        //other Page
        if(cur_page<numPages)
            return`
                <button data-goto="${cur_page-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${cur_page-1}</span>
          </button>
         
                <button data-goto="${cur_page+1}" class="btn--inline pagination__btn--next">
            <span>Page ${cur_page+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
           <div class="current_page">
          ${cur_page}
          </div>
        `
        
        ;
        //page 1 and no pages are there
        
        return `<div class="current_page">
        ${cur_page}
        </div>
      `
            
            
            
    }

 };


export default new PaginationView();