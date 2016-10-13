import React from 'react';
import AddRecipe from './components/AddRecipe'
import Recipe from './components/Recipe'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor() {
  	super();
  	this.state = {
			recipes: {}
  	}

		this.addRecipe = this.addRecipe.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);	
  }

  componentWillMount() {
    const defaultRecipes = {
        recipes: {
          'recipe-01': {
          image: 'http://vignette3.wikia.nocookie.net/adventuretime/images/3/38/Breakfast_song.jpg/revision/latest?cb=20150611145519&path-prefix=fr',
          ingredients: 'Pancake Mix\nWater\nBacon',
          name: 'Bacon Pancakes',
          text: "Make some pancake batter (read the box).\nCook the bacon and set it aside.\n\nPour some batter in a hot frying pan. Add a couple strips of bacon on top while the bottom is cooking. \nWhen the top looks bubbly, flip it. Cook until desired golden-ness.\n\nRepeat until you're out of bacon & batter."
        },
        'recipe-02': {
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Chocolate_Chip_Cookies_-_kimberlykv.jpg/512px-Chocolate_Chip_Cookies_-_kimberlykv.jpg',
          ingredients: "220g flour\n1/2 tsp yeast\n50g white sugar\n50g brown sugar\n100g salted butter\n1 tsp honey\n1 egg\n60g chocolate chips",
          name: 'Cookies',
          text: "Melt the butter, mix with honey and egg.\nIn a separate dish mix the flour, yeast and sugar.\nPut it all together and add the chocolate chips last. \nDrop the dough by small mounds (a dozen or so) on baking paper.\nPre-heat oven at 200°C and bake for 10 minutes.\nLet them cool a bit and enjoy."
        }
        }
        
      }
    const localStorageRef = localStorage.getItem('recipes');

    if(localStorageRef) {
      this.setState({
        recipes: JSON.parse(localStorageRef)
      });
    } else {
      this.setState(defaultRecipes);
    }
  }

  componentDidMount() {
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('recipes', JSON.stringify(nextState.recipes));
  }

  addRecipe(recipe) {
    const recipes = {...this.state.recipes
    };
    const timestamp = Date.now();
    recipes[`recipe-${timestamp}`] = recipe;
    this.setState({
      recipes
    });
  }

  editRecipe(recipe, index) {
    const recipes = {...this.state.recipes
    };
    recipes[index] = recipe;
    this.setState({
      recipes
    });
  }
	
	deleteRecipe(index) {
		delete this.state.recipes[index];
		const recipes = {...this.state.recipes
    };
		this.setState({
      recipes
    });
	}

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      	<div className="wrapper">
      	<AddRecipe addRecipe={this.addRecipe}/>
          {
            Object
              .keys(this.state.recipes)
              .map(key => <Recipe 
	              key={key} 
	              index={key} 
	              details={this.state.recipes[key]} 
	              editRecipe={this.editRecipe}
	              deleteRecipe={this.deleteRecipe}/>
              )
          }
      	</div>
      </MuiThemeProvider>
    );
  }
}

export default App;
