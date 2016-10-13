import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import EditRecipe from './EditRecipe'

class Recipe extends React.Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.checkImageUrl = this.checkImageUrl.bind(this);
  }

  delete() {
    this.props.deleteRecipe(this.props.index);
  }

  checkImageUrl() {
    if (/(.jpg|.png|.gif)/.test(this.props.details.image)) {
      return (
        <img className="img-recipe" src={this.props.details.image} alt={this.props.details.name}/>
        )
    }
    else {
      return null; 
    }


  }

  render() {
    return (
      <Card key={this.props.index} className="recipe-card">
        <CardHeader
          className="recipe-card-header"
          title={this.props.details.name}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {this.checkImageUrl()}
          <div className="recipe-contents">
            <div className="recipe-text">
              <h3>Instructions</h3>
              {this.props.details.text.split('\n').map((el, i) => {
                return <p key={i}>{el}</p>;
              })}
            </div>
            <div className="recipe-ingredients">
              <h3>Ingredients</h3>
                <ul>
                  {this.props.details.ingredients.split('\n').map((el, i) => {
                    return <li key={i}>{el}</li>;
                  })}
                </ul>
            </div>
          </div>
          <CardActions>
            <RaisedButton 
            icon={<FontIcon className="material-icons">delete</FontIcon>}
            secondary={true}
            style={{float: 'left'}}
            onTouchTap={this.delete}  
            label="Delete"/>
            <EditRecipe 
              editRecipe={this.props.editRecipe} 
              details={this.props.details} 
              index={this.props.index}
            />
          </CardActions>
        </CardText>    
      </Card>
    )
  }
}

export default Recipe;