import $ from 'jquery';

class Search {

    //initiator
    constructor(){
        this.openButton = $(".js-search-trigger"); //the search icon on the top right corner of homepage
        this.closeButton = $(".search-overlay__close"); // the close/cross icon on the search overlay
        this.searchOverlay= $(".search-overlay"); // the search overlay        
        this.events(); //start the listener
    }
 
    //events or event listener
    events(){
        this.openButton.on("click", this.openOverlay.bind(this)); //on is a jquery method
        this.closeButton.on("click", this.closeOverlay.bind(this));
    }

    //methods
    openOverlay(){
            this.searchOverlay.addClass("search-overlay--active"); //addClass is a jquery method that adds class to an object such as a div
    }

    closeOverlay(){
        this.searchOverlay.removeClass("search-overlay--active");

    }
}

export default Search;