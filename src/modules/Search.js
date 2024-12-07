import $ from 'jquery';

class Search {

    //initiator
    constructor(){
        this.addSearchHTML();
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
            this.searchField.val('');
            setTimeout(() => this.searchField.trigger("focus"),301);
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
                this.typingTimer=setTimeout(this.getResults.bind(this), 750); // wait 750ms before running the function 

            } else{
                this.resultsDiv.html(''); //clear the content of the results div
                this.isSpinnerVisible=false;
            }
                      

        }
        this.previousSearchQuery=this.searchField.val();
    }

    getResults(){
        //this.resultsDiv.html("Image real search results here.");
        //this.isSpinnerVisible=false;

       //execute all API calls asynchronously
        $.when(
            $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search='+this.searchField.val()),
            $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search='+this.searchField.val())
              ).then((posts, pages) => {
            var combinedResults = posts[0].concat(pages[0]);
            this.resultsDiv.html(`
                <h2 class="search-overlay__section-title">General Information</h2>
                ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No general information matches the search string</p>' }
                    
                    ${combinedResults.map(item => `
                        <li><a href="${item.link}">${item.title.rendered}</a> ${item.type=='post'? `by ${item.authorName}`: ''}</li>`)}
                ${combinedResults.length ? '</ul>' : ''}
                `);
                this.isSpinnerVisible=false;

            }, () =>{
                this.resultsDiv.html('<p>Unexptected Error!! Pleaes try again later ...</p>');
            });        
    }

    addSearchHTML(){
        $("body").append(`
            <div class="search-overlay ">
      <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
      </div>

      <div class="container">
          <div id="search-overlay__results">
              
          </div>
      </div>
    </div>
            `);
    }
}

export default Search;