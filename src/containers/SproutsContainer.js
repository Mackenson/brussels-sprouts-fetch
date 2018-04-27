import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';
import Longuest from '../components/Longuest';


class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: []
    }
  }


  getRandomRecipe(){
    fetch("/api/v1/random-recipe")
    .then(response=>{
      if (response.ok) {
        return response;
      } else {
        errorMessage = `${response.status} ${response.statusText}`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(jasonBody=>jasonBody.json())
    .then(body=>{
      let nextRecipe = body
      this.setState({
        recipe: nextRecipe,
        recipes: [],
        longuest: ""
      })
    })

    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getAllRecipes(){
    fetch("/api/v1/recipes")
    .then(response=>{
      if (response.ok) {
        return response;
      }else{
        errorMessage = `${response.status} ${response.statusText}`
        error = new Error(error)
        throw(error)
      }
    })
    .then(jasonBody=>jasonBody.json())
    .then(body=>{
      let nextRecipe = body
      this.setState({
        recipes: nextRecipe,
        longuest: "",
        recipe: "",
        longuest: ""
      })
    })
    .catch(error => console.error(`Error is fetch: ${error.message}`))
  }

  getTheLonguest(){
    fetch("/api/v1/myurl")
    .then(response=>{
      if (response.ok) {
        return response;
      } else {
        errorMessage = `${response.status} ${response.statusText}`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(jasonBody=>jasonBody.json())
    .then(body=>{
      let longuestRecipe = body
      this.setState({
        longuest: longuestRecipe,
        recipe: "",
        recipes: []
      })
    })
    .catch(error => console.error(`Error is fetch: ${error.message}`))
  }


  render(){

    let handleRandomClick = () => {
      this.getRandomRecipe();
    }

    let handleIndexClick = () => {
      this.getAllRecipes();
    }
    let handleLonguestClick = () =>{
      this.getTheLonguest();
    }


    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
        <RandomSprout
          recipe={this.state.recipe}
        />
        <SproutsIndex
          recipes={this.state.recipes}
        />

      <Longuest
        longuest={this.state.longuest}
      />

        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLonguestClick} className="btn">Longuest</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
