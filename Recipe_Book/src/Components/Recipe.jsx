import { useEffect, useState } from "react"

export default function Recipe()
{
    const [recipeName,setRecipeName]=useState("");
    const[ingredients,setIngredients]=useState("");
    const[instructions,setInstructions]=useState("");
    const[recipes,setRecipes]=useState([]);

    //Save recipe to localstroage.
    const saveRecipes=(updatedRecipes)=>{
        localStorage.setItem("recipes",JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
    }

    //Load recipes from localstroage.
    useEffect(()=>{
        const storedRecipes=JSON.parse(localStorage.getItem("recipes"))||[];
        setRecipes(storedRecipes);
    },[])

    //Add recipe.
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!recipeName || !ingredients ||!instructions)
        {
            alert("Please fill all required fields...!");
            return;
        }
        const newRecipe={
            id:Date.now(),name:recipeName,ingredients,instructions
        }
        saveRecipes([...recipes,newRecipe])

        //clear form data
        setRecipeName("");
        setIngredients("");
        setInstructions("");
    }

    return(
    <>
        <div>
            <h1>Recipe Book</h1>
        <form onSubmit={handleSubmit}>
            <h2>Add Recipe</h2>
            <label>Name:</label> <br/>
            <input type="text" value={recipeName} onChange={(e)=>setRecipeName(e.target.value)}/> <br/>

            <label>Ingredients(comma separate)</label> <br/>
            <textarea value={ingredients} onChange={(e)=>setIngredients(e.target.value)}></textarea> <br/>

            <label>Instructions:</label> <br/>
            <textarea value={instructions} onChange={(e)=>setInstructions(e.target.value)}></textarea> <br/>

            <button type="submit">Add Recipe</button>
        </form>

        <h3>All Recipes</h3>
        {recipes.length===0 && <p>No recipes added yet</p>}
        {
            recipes.map((i)=>(
              <div key={i.id}>
                <h4>Recipe Name:{i.name}</h4>
                <p><strong>Ingredients</strong>{i.ingredients}</p>
                <p><strong>Instructions:</strong>{i.instructions}</p>
                <button>Edit</button>
                <button>Delete</button>
              </div>  
            ))
        }
        </div>
    </>
    )
}