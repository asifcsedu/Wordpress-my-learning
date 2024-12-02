import $ from 'jquery';

class Search {

    //initiator
    constructor(){
        this.openButton = $(".js-search-trigger"); //the search icon on the top right corner of homepage
        this.closeButton = $(".search-overlay__close"); // the close/cross icon on the search overlay
        this.searchOverlay= $(".search-overlay"); // the search overlay        
        this.searchField=$("#search-term"); //the search box
        this.resultsDiv=$("#search-overlay__results"); //HTML content below the search bar inside the overlay
        this.events(); //start the listener
        this.isOverlayOpen=false;
        this.isSpinnerVisible=false;
        this.typingTimer;
        this.previousSearchQuery;
    }
 
    //events or event listener
    events(){
        this.openButton.on("click", this.openOverlay.bind(this)); //on is a jquery method
        this.closeButton.on("click", this.closeOverlay.bind(this));

        //respond to key press
        $(document).on("keydown", this.keyPressDispatcher.bind(this));

        //respond to query typed in the search box
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

    //methods
    openOverlay(){
            this.searchOverlay.addClass("search-overlay--active"); //addClass is a jquery method that adds class to an object such as a div
            $("body").addClass("body-no-scroll");
            this.isOverlayOpen=true;
    }

    closeOverlay(){
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen=false;

    }

    keyPressDispatcher(e){
        //console.log(e.keyCode); //print at the console of 'inspect'
      
        if(e.keyCode==83 && !this.isOverlayOpen){ //if the 's' key has been pressed and overlay is NOT already open
            if(!$("input, textarea").is(':focus')) //only if another input or textarea is currently NOT in focus
                this.openOverlay(); //show the overlay search box
        }

        if(e.keyCode==27 && this.isOverlayOpen){  //if the 'ESC' key has been pressed and released
            this.closeOverlay();
        }
    }

    typingLogic(){

        if(this.searchField.val() != this.previousSearchQuery){ //if the search string changes
            clearTimeout(this.typingTimer); //reset the timer everytime a key is pressed
             //show a spinning icon as long as the typing is not finished (i.e. before 2 sec. after the last keypress)
            if(this.searchField.val()){ //if the search field is not empty
                if(!this.isSpinnerVisible){
                    this.resultsDiv.html('<div class="spinner-loader"></div>'); 
                    this.isSpinnerVisible=true;
                }
                this.typingTimer=setTimeout(this.getResults.bind(this), 2000); // wait 2000ms before running the function 

            } else{
                this.resultsDiv.html(''); //clear the content of the results div
                this.isSpinnerVisible=false;
            }
                      

        }
        this.previousSearchQuery=this.searchField.val();
    }

    getResults(){
        this.resultsDiv.html("Image real search results here.");
        this.isSpinnerVisible=false;
    }


}

export default Search;