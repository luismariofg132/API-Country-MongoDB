/**
 * @swagger
 * components:
 *  schemas:
 *      country:
 *          type: object
 *          properties:
 *              country_name:
 *                  type: string
 *                  description: name of the country
 *              country_short_name:
 *                  type: string
 *                  description: short name of the country
 *              country_phone_code:
 *                  type: number
 *                  description: phone code of the country
 *          required:
 *              - country_name
 *              - country_short_name
 *              - country_phone_code
 *          example:
 *              country_name: "Argentina"
 *              country_short_name: "AR"
 *              country_phone_code: 54
 * 
 * @swagger
 * components:
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 * 
 * 
 * @swagger
 * /countries:
 *  get:
 *    summary: Get all countries
 *    tags: [Countries]
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *          description: A list of countries
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/country'
 *      401:
 *          description: Unauthorized
 * 
 * /countries/:id:
 *  get:
 *      summary: Get a country by id
 *      tags: [Countries]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the country
 *      responses:
 *          200:
 *              description: A country
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/country'
 *          401:
 *              description: Unauthorized
 * @swagger
 * /countries:
 *  post:
 *      summary: Create a new country
 *      tags: [Countries]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/country'
 *      responses:
 *          200:
 *              description: A country created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/country'
 *          401:
 *              description: Unauthorized         
 *                          
 * @swagger
 * /countries/:id:
 *  put:
 *      summary: Update a country
 *      tags: [Countries]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the country
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/country'
 *      responses:
 *          200:
 *              description: A country updated
 *          401:
 *              description: Unauthorized
 * @swagger
 * /countries/:id:
 *  delete:
 *      summary: Delete a country
 *      tags: [Countries]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the country
 *      responses:
 *          200:
 *              description: A country deleted
 *          401:
 *              description: Unauthorized
 * 
 * 
 *    
 */