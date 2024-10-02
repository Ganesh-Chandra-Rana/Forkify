import icons from '../../img/icons.svg';

export default class View{
    _data;
    _message='';
/**
 * Render the receive object to DOM
 * @param {object | object[]} data The data to be rendered (e.g. recipe)
 * @param {boolean} [render =true] if false ,create markup string instead of rendering to the DOM.
 * @returns {undefined | String} A markup string is returned if render=False
 * @this {object} View object
 * @author Ganesh Chandra Rana
 * @todo Finish implementation
 */
    render(data,render=true){
        if(!data || (Array.isArray(data)&& data.length===0))
            return this.renderError();

        this._data=data;
        const markup=this._generateMarkup();

       if(!render)return markup;

        this._parentElement.innerHTML=''; // clear previous html
      this._parentElement.insertAdjacentHTML('afterbegin',markup)
    };

    renderMessage(message=this._message){
      const markup=`
          <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `
      this._parentElement.innerHTML=''; // clear previous html
      this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    renderSpinner(){
      const markup=`
          <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> 
      `;
      this._parentElement.innerHTML='';
      this._parentElement.insertAdjacentHTML('afterbegin',markup)
    };
    renderError(message=this._errorMessage){
      const markup=`
          <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `
      this._parentElement.innerHTML=''; // clear previous html
      this._parentElement.insertAdjacentHTML('afterbegin',markup)
    };
}