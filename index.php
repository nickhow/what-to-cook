<?php
$host = "fdb22.atspace.me";
$user = "3377003_whattoeat";
$password = "c0ffeer0asters";
$dbname = "3377003_whattoeat";

$conn = mysqli_connect($host, $user, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

function buildSelect($result){
    $response;
    while( $row = mysqli_fetch_array($result) ){
            $response .="
<option value=".$row['name'].">".ucfirst($row['name'])."</option>";
         }
    echo $response;
}

?>
<!--
**
*
* TODO
* Sort out meal and diet on recipe show - ok but can be better
* 0 results - function -> check search type. run an alternative. show notification of new search.
*
**
-->
<html>
	<head>
		<title>WHAT TO EAT</title>
		<meta charset="UTF-8"/>
		<meta name="description" content="Recipe Finder - enter ingredients you have or want to use and search thousands of recipes to find your next meal."/>
		<meta name="keywords" content="Recipe, Ingredients, Cooking"/>
		<meta name="author" content="Nick"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<link rel="icon" sizes="16x16" href="favicon.ico"/>
		<meta name="theme-color" content="#008037"/>
		<script src="https://kit.fontawesome.com/84ca79c624.js" crossorigin="anonymous"></script>
		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css"/>
		<link href="assets/css/jquery-ui.theme.min.css" rel="stylesheet"/>
		<link href="assets/css/jquery-ui.min.css" rel="stylesheet"/>
		<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet"/>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/css/tokenfield-typeahead.min.css" rel="stylesheet"/>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/css/bootstrap-tokenfield.min.css" rel="stylesheet"/>
		<link href="assets/css/style.css" rel="stylesheet"/>
	</head>
	<body class="continer">
		<!-- MODALS -->
		<div class="modal fade" id="dietModal" tabindex="-1" role="dialog" aria-labelledby="dietModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dietModalLabel">Diet</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="diet-modal-body" class="modal-body"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" onClick="selectOptions('diet','radio')">Save selection</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="intoleranceModal" tabindex="-1" role="dialog" aria-labelledby="intoleranceModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="intoleranceModalLabel">Intolerances</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="intolerance-modal-body" class="modal-body"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" onClick="selectOptions('intolerance','checkbox')">Save selection</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="cuisineModal" tabindex="-1" role="dialog" aria-labelledby="cuisineModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="cuisineModalLabel">Cuisine</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="cuisine-modal-body" class="modal-body"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" onClick="selectOptions('cuisine','checkbox')">Save selection</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="mealModal" tabindex="-1" role="dialog" aria-labelledby="mealModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="mealModalLabel">Meal</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div id="meal-modal-body" class="modal-body"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" onClick="selectOptions('meal','radio')">Save selection</button>
					</div>
				</div>
			</div>
		</div>
		<div class="sticky-top" style="background:white">
			<div class="container">
				<div class="row" >
					<div class="col-4 col-md-6">
						<img src="assets/images/what-to-eat.png" class="img-fluid w-75 p-0" style="max-width:150px;"/>
					</div>
					<!-- QUICK SEARCH -->
					<div class="input-group col-8 col-md-6 align-self-center align-self-end">
						<input type="text" class="form-control" name="query" id="query" placeholder="Quick search" aria-label="Quick search" aria-describedby="basic-addon2"/>
						<div class="input-group-append">
							<button class="btn btn-primary" onClick="search('quickSearch','')" type="button">
								<i class="fas fa-search"></i>
							</button>
						</div>
					</div>
				</div>
                                <div id="navigation">
                                        <div id="back" class=" backToHome py-1" onClick="home()">
						<i class="fas fa-arrow-left pr-2"></i>
						<b>HOME</b>					
                                        </div>
                                        <div id="backToResults" class="backToResults py-1">					
						<b>
							<i class="fas fa-arrow-left pr-2"></i>RESULTS
						</b>                                                
                                        </div>
                                </div>
			</div>
			<hr class="m-0"/>
		</div>
		<div id="content" style="min-height:100%">
			<div id="searchContainer">
				<div class="container py-3">
					<div class="row py-1">
						<div class="col-12 text-right">
							<button id="showFridgeSearch" class="btn btn-outline-dark fullSearch" onClick="showFridgeSearch();">Quick search</button>
							<button id="showFullSearch" class="btn btn-outline-dark fridgeSearch" onClick="showFullSearch();">Full search</button>
						</div>
					</div>

				</div>
				<div class="container form-group mb-0">
					<div class="row justify-content-center">
						<div class="col-12">
							<input type="text" class="form-control" name="ingredientLookUp" id="ingredientLookUp" placeholder="Enter some ingredients..."/>
							<small id="ingredientHelp" class="form-text text-muted">Choose from our list of popular ingredients or enter your own.</small>
						</div>
					</div>
					<div class="container-fluid p-0 mt-3 fullSearch">
						<div class="row flex-row flex-nowrap" style="overflow-x:auto;">
							<div class="col-12 form-group">
								<div class="btn btn btn-outline-dark" id="cuisineBtn">Cuisine</div>
								<div class="btn btn btn-outline-dark" id="dietBtn" >Diet</div>
								<div class="btn btn btn-outline-dark" id="intoleranceBtn">Intolerances</div>
								<div class="btn btn btn-outline-dark" id="mealBtn">Meal</div>
							</div>
						</div>
					</div>
					<input type="hidden" name="cuisine[]" id="cuisine"/>
					<input type="hidden" name="diet" id="diet"/>
					<input type="hidden" name="intolerances[]" id="intolerance"/>
					<input type="hidden" name="mealType" id="meal"/>
					<input type="hidden" name="offset" id="offset" value="0"/>
				</div>
				<div class="container">
					<div class="row justify-content-center py-3">
						<button id="fullSearchBtn" class="btn btn-primary fullSearch" onClick="search('fullSearch','')">Find Recipes</button>
						<button id="fridgeSearchBtn" class="btn btn-primary fridgeSearch" onClick="search('fridgeSearch','')">Find Recipes</button>
					</div>
				</div>
			</div>
			<div class="container" id="inspireMe">
				<h3> Inspire Me </h3>
				<div class="row" id="inspireMeRow">
					<div class="image-box col-12 my-2" id="quickDish" onClick="search('inspire','https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569&maxReadyTime=25&offset=0&number=5&sort=random&instructionsRequired=true&addRecipeInformation=true');" style="--image-url: url(https://spoonacular.com/recipeImages/31152-636x393.jpg)">
						<div class="container">
							<div class="row">
								<div class="col-12 text-center py-3">
									<h2>
										<i class="fas fa-clock">
											<span class="inspireTitle">
												<i> Quick Dishes</i>
											</span>
										</i>
									</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="image-box col-12 my-2" id="randomRecipe" onClick="search('inspire','https://api.spoonacular.com/recipes/complexSearch?apiKey=ed2b0708531b4435ab06b4d9d35ed569&offset=0&number=5&sort=random&instructionsRequired=true&addRecipeInformation=true');" style="--image-url: url(https://spoonacular.com/recipeImages/748009-636x393.jpeg)">
						<div class="container">
							<div class="row">
								<div class="col-12 text-center py-3">
									<h2>
										<i class="fas fa-random">
											<span class="inspireTitle">
												<i> Random Recipes</i>
											</span>
										</i>
									</h2>
								</div>
							</div>
						</div>
					</div>
                                        <div id="inspireMeNext"></div>
					<!-- https://api.spoonacular.com/recipes/random?apiKey=ed2b0708531b4435ab06b4d9d35ed569&number=1&tags=vegetarian,dessert -->
					<!--GET LOCAL TIME AND SUGGEST NEXT MEAL -- appended to inspireMe div -->
					<!-- Low Carb? High Protein? ... -->
				</div>
			</div>
			<div id="recipes" class="recipes"></div>
			<!-- IS THIS USED AT ALL?? -->
			<div id="recipeResults" class="recipeResults"></div>
			<div class="container p-0">
				<div class="row justify-content-center">
					<div class="col-4">
						<div class="loader mx-auto py-3"></div>
					</div>
				</div>
			</div>
			<div id="resultNotifications" class="container">
				<div class="row">
					<div class="col-12 py-3 justify-content-center  text-center">
						<div class="col-6 text-center mx-auto py-2 btn btn-dark" style="display:none;" id="loadmore" onClick="loadMore()">Load More</div>
						<div class="col-12 text-center mx-auto py-2" style="display:none;" id="endOfResults">That's them all, try another search?</div>
						<div class="col-12 text-center mx-auto py-2" style="display:none;" id="zeroResults">360K+ recipes and we drew a blank. Try another search?</div>
					</div>
				</div>
			</div>
			<div id="recipeContainer">
				<div id="recipeInfo"></div>
				<div id="recipeIngredients" class="recipeIngredients"></div>
				<div id="recipeInstructions" class="recipeInstructions"></div>
			</div>
		</div>
		<div class="footer container-fluid">
			<div class="row py-3 align-self-center text-center">
				<div class="col-12"> what-to-eat.co.uk </div>
			</div>
		</div>
                
                <script data-ad-client="ca-pub-9799590528875680" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                
		<script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>
		<script 
    src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" 
    integrity="sha384-6khuMg9gaYr5AxOqhkVIODVIvm9ynTT5J4V1cfthmT+emCG6yVmEZsRHdxlotUnm" 
    crossorigin="anonymous"></script>
		<script 
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js" 
    integrity="sha384-FzT3vTVGXqf7wRfy8k4BiyzvbNfeYjK+frTVqZeNDFl8woCbF0CYG6g2fMEFFo/i" 
    crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>
		<script src="assets/js/jquery-ui.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/bootstrap-tokenfield.min.js"></script>
		<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
		<script src="assets/js/functions.js"></script>
	</body>
</html>