# Nodejs-CRUD-SwaggerAPI 
### CRUD example of restful-api with Swagger in Nodejs 

# Restful Api Example
### Sample Data
```
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
```
### Create
- post
```node
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
```
### Read
- get
```node
router.get('/cov19',(req,res)=>{
  res.json(gisdata);
});
```
### Update
- put
```node
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
```
### Delete
- delete
```node
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

```
# Swagger Setting
### Packages
```
npm install swagger-jsdoc --save
npm install swagger-ui-express --save
```
### Swagger UI Option
```node
const swoptions = {
  swaggerDefinition: {
    info:{
      title: "CRUD API Swagger",
      version: "1.0",
      description: "CRUD Cov19 data"
    },
    host:'localhost:3000',
    basePath:'/',
    tags:{
      name: 'Data'
    }
  },
  apis:['./routes/*.js']
}
const specs = swaggerJsdoc(swoptions)

app.use('/crud-swagger', swaggerUi.serve, swaggerUi.setup(specs));
```
### Swagger Editor
- Data moduels
```node
/**
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
```
- Get Sample
```node
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
```
![images](https://github.com/dapingtai/Nodejs-CRUD-SwaggerAPI/blob/master/public/images/1598196641062.jpg)
