
const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname, '..', '..', '..', 'public')

router.get('/', (_, response) => response.sendFile('index.htm', { root }))

const recipes = require ('../../../data/recipes.json')

//get recipes
router.get('/api/v1/',(request,response)=>{
   const formatted = recipes.map(recipe => ({
       id: recipe.id,
       title: recipe.title,
       image: recipe.image,
       prepTime: recipe.prepTime,
       difficulty: recipe.difficulty
   }))
   response.json(formatted)
})

//post recipe
router.post('/recipe/add ',(request,response)=> {
    const {title,image,ingredients,instructions,prepTime,difficulty} = request.body
    const newRecipe = {
        id: recipes.length + 1,
        title,
        image,
        ingredients,
        instructions,
        prepTime,
        difficulty
    }
    recipes.push(newRecipe)
    response.send(newRecipe)
})
//get by ID
router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(r => r.id === parseInt(id))
    if (found) {
        response.send(found)
    }else{
        response.send({error: {message: 'Recipe not found'}})
    }
})

module.exports = router