//
// TODO
// fix the loadmore element?
// either move to multipage or sort page rendering - preferably sort render
// more options for fridgeraiders - can I change sort order on that to mix it up?
//



//NAVIGATION 

function homeView() { 
   
    $('#navigationContainer').hide();
    $("#searchContainer").show();
    $("#inspireMe").show();  
    
    $('#recipeContainer').hide();
    $('#resultNotifications').hide();
    $('#recipeResults').hide();
     
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    sessionStorage.setItem("active_view", "");
}   

function resultsView(){

    $('#navigationContainer').show();
    $("#searchContainer").show();
    $('#recipeResults').show();
    $('#resultNotifications').show();
      
    $('#recipeContainer').hide();
    $("#inspireMe").hide();  
}

function searchView(){

    $("#endOfResults").hide();
    $("#zeroResults").hide();
    
    $("#backToResults").hide();
    
    $(".loader").show();
    
    $('#loadmore').hide();
    
    $('#recipeResults').html("");
    
   // $('#offset').val(0);
    sessionStorage.setItem("offset", 0);
    $('#back').show();
}

function recipeView(){
    $('#navigationContainer').show();
    $('#recipeContainer').show();
    
    $("#searchContainer").hide();
    $("#inspireMe").hide();  
    $('#recipeResults').hide();
    $('#resultNotifications').hide();
    
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    sessionStorage.setItem("active_view", "recipe");
}

function home() {
    
    homeView();
    inspireNext();
 
    $("#endOfResults").hide();
    $("#zeroResults").hide();
    $('#loadmore').hide();
    
    $('#back').hide();
    
    $('#recipeResults').html("");
    //$('#offset').val(0);
    sessionStorage.setItem("offset", 0);
    
}

function backToResults(id) {
    
    $(".loader").show();

    $('#backToResults').hide();
    $('#back').show();
    
    //CHECK IF RESULTS IS BUILT
    if($('#recipeResults').html() != ""){
    
    $(".loader").hide();

    } else {
    let resultType = sessionStorage.getItem("resultsType");
            //CHECK WHAT TO BUILD AND BUILD RESULTS            
            if (resultType === "fullSearch" || resultType === "quickSearch" || resultType === "inspire") {
               results(JSON.parse(sessionStorage.getItem("results")));  
               $(".loader").hide();
            }
            
            if (resultType === "fridgeSearch")  {
               fridgeResults(JSON.parse(sessionStorage.getItem("results")));
               $(".loader").hide();
            }
    }
    
    resultsView();
    
    document.getElementById(id).scrollIntoView();
    sessionStorage.setItem("active_view", "results");

}

//SEARCH TOGGLES
function showFullSearch() {
    $('.fridgeSearch').hide();
    $('.fullSearch').show();
}

function showFridgeSearch() {
    $('.fullSearch').hide();
    $('.fridgeSearch').show();
}

//FULL SEARCH MODALS
$('#dietBtn').on('click', function() {
    if ($('#diet-modal-body').html() != "") {
        $('#dietModal').modal({
            show: true
        });
    } else {
        $('#diet-modal-body').load('assets/helper/diets.php', function() {
            $('#dietModal').modal({
                show: true
            });
        });
    }
});

$('#cuisineBtn').on('click', function() {
    if ($('#cuisine-modal-body').html() != "") {
        $('#cuisineModal').modal({
            show: true
        });
    } else {
        $('#cuisine-modal-body').load('assets/helper/cuisines.php', function() {
            $('#cuisineModal').modal({
                show: true
            });
        });
    }
});

$('#intoleranceBtn').on('click', function() {
    if ($('#intolerance-modal-body').html() != "") {
        $('#intoleranceModal').modal({
            show: true
        });
    } else {
        $('#intolerance-modal-body').load('assets/helper/intolerances.php', function() {
            $('#intoleranceModal').modal({
                show: true
            });
        });
    }
});

$('#mealBtn').on('click', function() {
    if ($('#meal-modal-body').html() != "") {
        $('#mealModal').modal({
            show: true
        });
    } else {
        $('#meal-modal-body').load('assets/helper/meals.php', function() {
            $('#mealModal').modal({
                show: true
            });
        });
    }
});


function selectOptions(formID, type) {

    var selected = [];
    $("#" + formID + "Form input:" + type + ":checked").each(function() {
        selected.push($(this).val());
    });
    $('#' + formID).val(selected.toString());

    if (selected.toString() != "") {
        $('#' + formID + 'Btn').removeClass("btn-outline-dark");
        $('#' + formID + 'Btn').addClass("btn-outline-success");
    } else {
        $('#' + formID + 'Btn').removeClass("btn-outline-success");
        $('#' + formID + 'Btn').addClass("btn-outline-dark");
    }

    $('#' + formID + 'Modal').modal('hide');
}

//API GET
function httpGet(theUrl, load) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $(".loader").hide();
            load(this.response);
        }
        if (this.readyState == 4 && this.status != 200) {
            console.log('status: ' + this.status);
            console.log('status: ' + this.response);
        }
    };

    xmlHttp.open("GET", theUrl);
    xmlHttp.timeout = 10000;
    xmlHttp.responseType = 'json';
    xmlHttp.send();
}

//SEARCH

function getURL(searchType) { //used to be getRecipes
    var url = '';
    //full and query only
    if (searchType === "fullSearch" || searchType === "quickSearch") {
        url += "https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569";
    }

    //fridge search only
    if (searchType === "fridgeSearch") {
        url += "https://api.spoonacular.com/recipes/findByIngredients?apiKey=ed2b0708531b4435ab06b4d9d35ed569";
    }

    //quick search only
    if (searchType === "quickSearch") {
        url += "&query=" + sanitise(document.getElementById('query').value); //query string 
    }

    //full search only
    if (searchType === "fullSearch") {
        //  url+="&includeIngredients="+sanitise(document.getElementById('ingredientLookUp').getAttribute('data-id')); //ingredients
        url += "&includeIngredients=" + sanitise(document.getElementById('ingredientLookUp').value); //ingredients
    }

    //fridge search only
    if (searchType === "fridgeSearch") {
        url += "&ingredients=" + sanitise(document.getElementById('ingredientLookUp').value);
    }

    //full and query only
    if (searchType === "fullSearch" || searchType === "quickSearch") {
        url += "&cuisine=" + sanitise(document.getElementById('cuisine').value); //cuisine
        url += "&diet=" + sanitise(document.getElementById('diet').value); //diet
        url += "&intolerances=" + sanitise(document.getElementById('intolerance').value); //intolerances
        url += "&type=" + sanitise(document.getElementById('meal').value); //meal type
    }

    //all searches
    url += "&offset=" + sanitise(sessionStorage.getItem("offset")); //offset
    url += "&number=5"; //number
    url += "&instructionsRequired=true"; //instructions available
    url += "&addRecipeInformation=true"; //get instructions - includes data like serves X and takes Y mins to prepare

    return url;

}



function search(type, url) {
    //actions to happen when a search button is used. This is kicking off a new search.
    
    resultsView();
    searchView();
      
    sessionStorage.setItem("results", "");
    
    sessionStorage.setItem("resultsType", type);

    //types of search - fullSearch, quickSearch, fridgeSearch
    if (type === "fullSearch" || type === "quickSearch" || type === "fridgeSearch") {
        url = getURL(type); //used to be getRecipes
    }

    sessionStorage.setItem("searchURL", url);

    //fridgeSearch results else normal results
    if(type === "fridgeSearch") {
        sessionStorage.setItem("active_view", "fridgeresults");
        httpGet(url, fridgeSearchResults) 
    } else {
        sessionStorage.setItem("active_view", "results");
        httpGet(url, results);
    }

}



//RESULTS


function results(results) {

    var resultsArr = {};
    if( sessionStorage.getItem("results") ){  
            resultsArr = JSON.parse(sessionStorage.getItem("results")); 
    } else {
            // no Session stored results ...
    };
    
    var resultHTML = '<div class="container"><div class="row">';
   // $.each(results, function(resultKey, result) { //first level
     
     if(results.results){ 
             var result = results.results;
     } else {
             var result = results;
     }
     
     $.each(result, function(recipeKey, recipe) { // second Level
            
            resultsArr[recipe.id] = recipe;
          
            resultHTML += `
                               <div class="image-box col-12 my-2" id="${recipe.id}" onClick="buildRecipe('${recipe.id}')" style="--image-url: url(https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType})">
                                  <div class="container">
                                          <div class="row">
                                                  <div class="col-12 text-center py-3">
                                                          <h1>${recipe.title}</h1>
                                                  </div>
                                          </div>
                                          <div class="row">
                                                  <div class="col-12 text-center py-3 servings">
                                                          <i class="fas fa-users"/><span> serves ${recipe.servings}</span>
                                                  </div>
                                          </div>
                                          <div class="row justify-content-between">
                                                  <div class="col-4 text-center timing">
                                                          <i class="far fa-clock"/>
                                                          <br/>
                                                          <span>${recipe.readyInMinutes} minutes</span>
                                                  </div>
                                                  <div class="col-4 text-center timing">
                                                          <i class="fas fa-heart"></i>
                                                          <br/>
                                                          <span>${recipe.aggregateLikes}</span>
                                                  </div>
                                                  ${ recipe.hasOwnProperty('missedIngredientCount') ? `<div class="col-4 text-center ingredients"><i class="fas fa-shopping-basket"/><br/><span style="font-size:smaller">${recipe.missedIngredientCount} more indredient${recipe.missedIngredientCount != 1 ? 's':''} needed</span></div>` : '' }
                                                        
                                          </div>
                                     </div>
                             </div>
                      `;
        });
        
        
        sessionStorage.setItem("results", JSON.stringify(resultsArr));

        if(results.results){ 
        
                if (results.totalResults > 0) {
                    //check if we are at the end of the results for this search
                    
                    if (results.totalResults > $('#offset').val() + 5) {
                        $('#resultNotifications').show();
                        $('#loadmore').show();
                    } else {
                        $('#resultNotifications').show();
                        $('#endOfResults').show();
                        $('#loadmore').hide();
                    }
                } else {
                    $('#resultNotifications').show();
                    $('#zeroResults').show();
                }

        } else {
                //Pretty rudimentary - what if we were at the end of the results?
                $('#resultNotifications').show();
                $('#loadmore').show();
        }
        

 //   });
    resultHTML += '</div></div>';
    $('#recipeResults').append(resultHTML);
}

function fridgeSearchResults(results) {
    
    var resultsArr = {};
    if( sessionStorage.getItem("results") ){  
            resultsArr = JSON.parse(sessionStorage.getItem("results")); 
    } else {
            // no Session stored results ...
    };
    
    var resultHTML = '<div class="container"><div class="row">';

    $.each(results, function(recipeKey, recipe) {

        resultsArr[recipe.id] = recipe;

        resultHTML += `
                               <div class="image-box col-12 my-2" id="${recipe.id}" onClick="buildRecipe('${recipe.id}')" style="--image-url: url(https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType})">
                                  <div class="container">
                                          <div class="row">
                                                  <div class="col-12 text-center py-3">
                                                          <h1>${recipe.title}</h1>
                                                  </div>
                                          </div>
                                         
                                          <div class="row justify-content-between">
                                                  <div class="col-12 col-lg-6 text-lg-center">
                                                          <i class="far fa-thumbs-up"/>
                                                          <span>${recipe.usedIngredientCount} of your indredients used </span>
                                                  </div>
                                                  <div class="col-12 col-lg-6 text-lg-center">
                                                          <i class="fas fa-shopping-basket"></i>
                                                          <span>${recipe.missedIngredientCount} more indredient${recipe.missedIngredientCount != 1 ? 's':''} needed </span>
                                                  </div>
                                                  
                                          </div>
                                     </div>
                             </div>
                      `;
    });
    
    
    sessionStorage.setItem("results", JSON.stringify(resultsArr));


    if (results) {
        //check if we are at the end of the results for this search
        // no result count for fridgeSearch
    } else {
        $('#resultNotifications').show();
        $('#zeroResults').show();
    }


    resultHTML += '</div></div>';
    $('#recipeResults').append(resultHTML);
}


function loadMore() {

//lost in a refresh - offset, searchurl set both as sessionStorage?

    $(".loader").show();
    document.querySelector("#loadmore").scrollIntoView();
    var increment = Number(sessionStorage.getItem("offset"));
    increment += 5; //number of results collected is 5
    sessionStorage.setItem("offset", increment);
    var url = changeOffset(sessionStorage.getItem("searchURL"), increment);

    httpGet(url, results);
}

function changeOffset(url, newOffset) {

    return url.replace(/(offset=)\d*(&)/gm, '$1' + newOffset + '$2');
}


//RECIPES

function buildRecipe(id) {
    
    recipeView();
    
    $('#back').hide();
    $('#backToResults').show();
    
    $('#backToResults').click(function() {
        backToResults(id);
    });
    
    sessionStorage.setItem("recipe", id);

    var recipe = JSON.parse(sessionStorage.getItem("results"))[id];
   

   // recipe = resultsArr[id];

    if (!recipe.extendedIngredients || !recipe.analyzedInstructions) {
        httpGet('https://api.spoonacular.com/recipes/' + id + '/information?apiKey=ed2b0708531b4435ab06b4d9d35ed569', recipeDisplay)
    } else {
        recipeDisplay(recipe, false)
    }
}


function recipeDisplay(recipe, overWrite = true) {

    // updates recipe object unless we did not make a call for more info.
    if (overWrite) {

    var resultsArr = JSON.parse(sessionStorage.getItem("results"));
    resultsArr[recipe.id] = recipe;
    sessionStorage.setItem("results",JSON.stringify(resultsArr));
    
    //   resultsArr[recipe.id] = recipe;
    } 

    var recipeInfo = '';
    recipeInfo += `
           <div class="image-box col-12 my-2" id="${recipe.id}" style="--image-url: url(https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType})">
                   <div class="container">
                       <div class="row">
                            <div class="col-12 text-center py-3">
                                 <h1>${recipe.title}</h1>
                             </div>
                        </div>
        

                   </div>
           </div>
           <div class="container">
           
                <div class="row justify-content-between">
                     <div class="col-4 text-center timing" style="font-size:small">
                          <i class="far fa-clock"/>
                          <br/>
                          <span>${recipe.readyInMinutes} minutes</span>
                      </div>
                      <div class="col-4 text-center servings" style="font-size:small">
                          <i class="fas fa-users"></i>
                          <br/>
                          <span>serves ${recipe.servings}</span>
                      </div>
                  </div>
           <hr class="my-2"/>
           <div class="row">
           `

    var dietsHTML = '<div class="col-12 py-2"><b>Diets: </b>';
    $.each(recipe.diets, function(dietKey, diet) {
        dietsHTML += '<span class="px-2">' + diet + '</span> ';
    });
    dietsHTML += '</div>'

    recipeInfo += dietsHTML;

    if (recipe.winePairing && recipe.winePairing.pairedWines) {
        var winesHTML = `<div class="col-12 py-2">
                       <i class="fas fa-wine-glass-alt"> <span style="font-family:'Roboto', sans-serif;">Wine Suggestions</span></i>
                       <br/>`

        $.each(recipe.winePairing.pairedWines, function(wineKey, wine) {
            winesHTML += '<span class="px-2">' + wine + '</span> ';
        });

        winesHTML += '</div>';

        recipeInfo += winesHTML;
    }



    recipeInfo += `
           </div>
           </div>`;

    $('#recipeInfo').html(recipeInfo);

    showIngredients(JSON.stringify(recipe.extendedIngredients));
    showInstructions(JSON.stringify(recipe.analyzedInstructions));
}

function showIngredients(data) {

    $('#recipeIngredients').html("");
    let recipe = JSON.parse(data);

    var ingredientList = `                     
                      <div id="ingredientAccordion" class="container-md accordion pb-1">
                        <div class="card mb-0">
                            <div class="card-header " id="ingredientHeader" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="ingredientContent" href="#ingredientContent">
                                <a class="card-title"> Ingredients </a>
                            </div>
                            <div id="ingredientContent" class="card-body row collapse show" data-parent="#ingredientAccordion" aria-labelledby="ingredientHeader">`;


    $.each(recipe, function(ingredientKey, ingredient) {

        ingredientList += `
                          <div class="col-6 col-md-4 col-lg-2 mb-2">
                                <div class="mx-auto text-center" style="height:100px; width:100px; position:relative">
                                        <img style="position: absolute; top:0; bottom:0; left:0; right:0; margin:auto; max-width:100;" src='https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}'>
                                </div>
                                <div class="col-12 text-center" style="font-size:smaller">${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}</div>
                                <div class="col-12 text-center" style="text-transform:capitalize;  font-size:smaller">${ingredient.name}</div>
                           </div>`

    });

    ingredientList += '</div></div></div>';
    $('#recipeIngredients').append(ingredientList);

}

function showInstructions(data) {
    $('#recipeInstructions').html("");
    let instructions = JSON.parse(data);

    var instructionHTML = `
                      <div id="instructionAccordion" class="container-md accordion pb-1">
                        <div class="card mb-0">
                            <div class="card-header collapsed" role="button" data-toggle="collapse" href="#instructionContent">
                                <a class="card-title"> Instructions </a>
                            </div>
                            <div id="instructionContent" class="card-body row collapse" data-parent="#instructionAccordion">`;

    $.each(instructions, function(instructionsKey, result) { //first level

        $.each(result.steps, function(stepKey, step) { // second Level

            var equip = '<div class="row"><div class="col-12">';
            var counter = 1;
            var count = Object.keys(step.equipment).length;
            if (count > 0) {
                equip += '<i class="fas fa-utensils"></i> <i>You\'ll need a ';
                $.each(step.equipment, function(eqKey, equipment) {
                    equip += equipment.name;
                    counter == count - 1 ? equip += (' & ') : '';
                    counter < count - 1 ? equip += (', ') : '';
                    counter++;
                })
            }
            equip += '</i></div></div>';

            instructionHTML += '<div class="container"><div class="row"><div class="col-12"><h3><span>Step ' + step.number + '</span></h3></div></div>';
            instructionHTML += equip;
            instructionHTML += '<div class="row"><div class="col-12"><p>' + step.step + '</p></div></div></div>';


        });
    });
    instructionHTML += '</div></div></div>';
    $('#recipeInstructions').append(instructionHTML);

}



//HELPERS

function sanitise(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

function inspireNext(){
//Make time decision for inspire me
    var d = new Date();
    var n = d.getHours();
    if (n >= 0 && n < 10) {
        inpireNextTemplate('breakfast', 'https://spoonacular.com/recipeImages/474380-636x393.jpg', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569&type=breakfast&offset=0&number=5&sort=random&instructionsRequired=true&addRecipeInformation=true');
    }
    if (n >= 10 && n < 16) {
        inpireNextTemplate('a snack', 'https://spoonacular.com/recipeImages/1065954-636x393.jpg', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569&type=snack&offset=0&number=5&sort=random&instructionsRequired=true&addRecipeInformation=true');
    }
    if (n >= 16 && n < 20) {
        inpireNextTemplate('dinner', 'https://spoonacular.com/recipeImages/619643-636x393.jpg', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569&type=main%20course&offset=0&number=5&sort=random&instructionsRequired=true&addRecipeInformation=true');
    }
    if (n >= 20 && n <= 23) {
        inpireNextTemplate('a snack', 'https://spoonacular.com/recipeImages/168889-636x393.jpg', 'https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569&type=snack&offset=0&number=5&sort=random&instructionsRequired=true&addRecipeInformation=true');
    }
}

function inpireNextTemplate(meal, img, url) {
    $('#inspireMeNext').replaceWith(`
             <div class="image-box col-12 my-2" id="nextMeal" onClick="search('inspire','${url}');" style="--image-url: url(${img})">
                       <div class="container">
                               <div class="row">
                                       <div class="col-12 text-center py-3">
                                               <h2><i class="fas fa-utensils"><span class="inspireTitle"><i> For ${meal}</i></span></i></h2>
                                       </div> 
                               </div>
                       </div>
               </div>
             `);
}


//DOCUMENT READY

$(document).ready(function() {

    // CHECK FOR ACTIVE VIEW
    if(sessionStorage.getItem("active_view")){
            
            if (sessionStorage.getItem("active_view") === "results") {
               results(JSON.parse(sessionStorage.getItem("results")));
               backToResults(sessionStorage.getItem("recipe"))
            }
            
            if (sessionStorage.getItem("active_view") === "fridgeresults") {
               fridgeResults(JSON.parse(sessionStorage.getItem("results")));
               backToResults(sessionStorage.getItem("recipe"))
            }
            
            if (sessionStorage.getItem("active_view") === "recipe") {
               buildRecipe(sessionStorage.getItem("recipe"));            
            }
            
            
    } else {
            homeView();
            inspireNext();
    }
     
    // Quick Search - Action search on hit enter
    $("#query").on('keyup', function(e) {
        if (e.keyCode === 13) {
            search('quickSearch', '');
        }
    });


    $.get("assets/helper/ingredients.php", function(data) {

        // set up ingredient input
        var dataList = [];

        JSON.parse(data).forEach(function(value) {
            dataList.push(value.name)
        });

        $('#ingredientLookUp').tokenfield({
            autocomplete: {
                source: dataList,
                minLength: 2,
                showAutocompleteOnFocus: false
            },
            createTokensOnBlur: true
        });

    });

    $('.tag.example .ui.dropdown')
        .dropdown({
            allowAdditions: true
        });


    

});