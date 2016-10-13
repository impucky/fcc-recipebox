import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class AddRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
  }

  handleOpen() {
      this.setState({open: true});
    };

  handleClose() {
      this.setState({open: false});
    };

  createRecipe(event) {
    this.setState({open: false});
    event.preventDefault();
    const recipe = {
      name: this.refs.name.getValue() || "Untitled",
      ingredients: this.refs.ingredients.getValue(),
      text: this.refs.text.getValue(),
      image: this.refs.image.getValue()
    }
    this.props.addRecipe(recipe);
  }

  render() {
    const actions = [
      <FlatButton 
        label="Cancel" 
        onClick={this.handleClose}/>,
      <RaisedButton 
        type="submit" 
        label="Add" 
        primary={true} 
        onClick={this.createRecipe}
        />
    ]; 
    return (
      <div className="add-recipe">
        <RaisedButton className="button-add" primary={true} label="+ Add Recipe" onTouchTap={this.handleOpen}/>
        <Dialog
          title="New Recipe"
          modal={true}
          actions={actions}
          open={this.state.open}
          autoScrollBodyContent={true}
          contentStyle={{
            maxWidth: '500px'
          }}
        >
          <form>
            <TextField 
              ref="name" 
              floatingLabelText="Title" 
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <br/>
            <TextField
              ref="ingredients"
              floatingLabelText="Ingredients"
              floatingLabelFixed={true}
              multiLine={true}
              rows={4}
              rowsMax={4}
              fullWidth={true}
            />
            <br/>
            <TextField
              ref="text"
              floatingLabelText="Instructions"
              floatingLabelFixed={true}
              multiLine={true}
              rows={5}
              rowsMax={5}
              fullWidth={true}
            />
            <br/>
            <TextField 
              ref="image" 
              floatingLabelText="Image URL" 
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <br/>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddRecipe;