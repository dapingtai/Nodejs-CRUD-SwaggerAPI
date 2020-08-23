var express = require('express');
var router = express.Router();

/**
 * Title: Define Cov19 module
 * @swagger
 * definition:
 *   Cov19:
 *     properties:
 *       id:
 *         type: integer
 *         format: int32
 *       country:
 *         type: string
 *       population:
 *         type: integer
 *         format: int64
 *       disease:
 *         type: string
 */

let gisdata = [
  {
    id:1,
    country: 'Taiwan',
    population:2300,
    disease: 'normal'
  },
  {
    id:2,
    country: 'Japan',
    population:20000,
    disease: 'danger'
  }
];

/**
 * Find country function
 * @param country
 * @returns {string}
 * @constructor
 */
ValidCountry = (country) => {
  let message ="";
  if(!country.id){
    message = "id not found";
  }
  if(!country.country){
    message = "country not found";
  }
  if(!country.population){
    message = "population not found";
  }
  if(!country.disease){
    message = "disease not found";
  }
  return message
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cov19 Express' });
})

/**
 * Title: Read-Get
 * @swagger
 * /cov19:
 *  get:
 *    tags:
 *      - Data
 *    description: Getting cov19 data
 *    operationId: get-cov19
 *    produces:
 *      - application/json
 *    parameters: []
 *    responses:
 *      200:
 *        description: Get cov19 Success
 *        schema:
 *          $ref: '#/definitions/Cov19'
 *      400:
 *        description: Get cov19 error
 */
router.get('/cov19',(req,res)=>{
  res.json(gisdata);
});

/**
 * Title: Create-Post
 * @swagger
 * /cov19:
 *  post:
 *    tags:
 *      - Data
 *    description: Create cov19 data by post
 *    operationId: post-cov19
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Add cov19 data
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Cov19'
 *    responses:
 *      200:
 *        description: Post cov19 Success
 *      400:
 *        description: Post cov19 error
 */
router.post('/cov19',(req,res)=>{
  let country = req.body;
  let idValid = ValidCountry(country);
  if (idValid == "") {
    gisdata.push(country);
    console.log(gisdata);
    res.status(201).send(gisdata);
  }else{
    res.statusMessage = idValid;
    res.sendStatus(404);
  }
});

// router.post('/cov19', (req,res)=>{
//   let country = req.body;
//   console.log(country);
//   gisdata.push(country);
//   console.log(gisdata);
//   res.status(201).send(gisdata);
// });

/**
 * Title: Update-Put
 * @swagger
 * /cov19/{Id}:
 *  put:
 *    tags:
 *      - Data
 *    description: Update cov19 data by put
 *    operationId: put-cov19
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: Id
 *        description: id that need to be updated
 *        require: true
 *        type: integer
 *      - in: body
 *        name: body
 *        description: Update cov19 data
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Cov19'
 *    responses:
 *      200:
 *        description: Put cov19 Success
 *      400:
 *        description: Put cov19 error
 */
router.put('/cov19/:Id',(req,res)=>{
  let countryid = req.params.Id;
  let country = req.body;
  let currentcountry = gisdata.filter(x => x.id == countryid)[0];
  if(currentcountry){
    let idValid = ValidCountry(country);
    if (idValid == ""){
      currentcountry.country = country.country;
      currentcountry.population = country.population;
      currentcountry.disease = country.disease;
      res.status(200).send(gisdata);
    }else{
      res.statusMessage = idValid;
      res.sendStatus(404);
    }
  }else{
    res.statusMessage="Country id not exist";
    res.status(404);
  }
})

/**
 * Title: Delete-Delete
 * @swagger
 * /cov19/{Id}:
 *  delete:
 *    tags:
 *      - Data
 *    description: Delete cov19 data by delete
 *    operationId: delete-cov19
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: Id
 *        description: id that need to be deleted
 *        require: true
 *        type: integer
 *    responses:
 *      200:
 *        description: Delete cov19 Success
 *      400:
 *        description: Delete cov19 error
 */
router.delete('/cov19/:Id',(req,res)=>{
  let countryid = req.params.Id;
  let currentcountry = gisdata.filter(x => x.id == countryid)[0]
  if (currentcountry){
    gisdata = gisdata.filter(x => x.id != countryid)
    res.statusMessage = "Delete " + countryid +" success";
    res.sendStatus(200);
  }else{
    res.statusMessage="Country id not exist";
    res.status(404);
  }
})

module.exports = router;
