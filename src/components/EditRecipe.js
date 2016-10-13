import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EditRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }

  handleOpen() {
      this.setState({open: true});
    };

  handleClose() {
      this.setState({open: false});
    };

  editRecipe(event) {
    this.setState({open: false});
    event.preventDefault();
    const index = this.props.index;
    const recipe = {
      name: this.refs.name.getValue() || "Untitled",
      ingredients: this.refs.ingredients.getValue(),
      text: this.refs.text.getValue(),
      image: this.refs.image.getValue()
    }
    this.props.editRecipe(recipe, index);
  }

  render() {
    const actions = [
      <FlatButton 
        label="Cancel" 
        onClick={this.handleClose}/>,
      <RaisedButton 
        type="submit" 
        label="Save" 
        primary={true} 
        onClick={this.editRecipe}
        />
    ]; 
    return (
      <div>
        <RaisedButton primary={true} label="Edit" onTouchTap={this.handleOpen}/>
        <Dialog
          title="Edit Recipe"
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
              defaultValue={this.props.details.name}
              floatingLabelText="Title" 
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <br/>
            <TextField
              ref="ingredients"
              defaultValue={this.props.details.ingredients}
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
              defaultValue={this.props.details.text}
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
              defaultValue={this.props.details.image}
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

export default EditRecipe;