openapi: 3.0.3
info:
  title: Photo Caption Contest
  version: 1.0.0
  description: >-
    This is an API designed to allow users to create an account, login and
    provide captions to several photos in order to win the contest.
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
paths:
  /index:
    summary: This is the home page of the app. Users may create an account or login
    get:
      summary: Get operation for the home page
      description: This operation retrieves and responds with the home/index page
      operationId: ''
      responses:
        default:
          description: Default error sample response
  /login:
    summary: >-
      This is the page where users are allowed to login using credentials
      previously created when registering
    get:
      summary: >-
        This operation gets the login page information and sends user to that
        page
      description: >-
        This operation gets the login page information and sends user to that
        page
      operationId: ''
      responses:
        default:
          description: Default error sample response
    post:
      summary: This operation submits user credentials for verification
      description: >-
        A post request using a form for submitting user credentials for
        authentication
      operationId: ''
      responses:
        default:
          description: Default error sample response
  /users/register:
    summary: >-
      This is the page where users may register an account with a first name,
      last name, and password
    get:
      summary: a get request to respond with the register page
      description: a get request to respond with the register page
      operationId: ''
      responses:
        default:
          description: Default error sample response
    post:
      summary: >-
        A post request to submit new user credentials to create login
        credentials in the database
      description: >-
        A post request to submit new user credentials to create login
        credentials in the database
      operationId: ''
      responses:
        default:
          description: Default error sample response
  /profile:
    summary: >-
      This is the landing page for authenticated users. Four photos will be
      displayed along with forms for submitting or editing captions for each
      photo.
    get:
      summary: >-
        A get request for authenticated users to access their personal profile
        and see their captions to the photos
      description: >-
        A get request for authenticated users to access their personal profile
        and see their captions to the photos
      operationId: ''
      responses:
        default:
          description: Default error sample response
    delete:
      summary: Delete request to allow Logging Out
      description: >-
        This delete request is to enable the usage of the logout function that
        is attached to the request object during an active passport session
      operationId: ''
      responses:
        default:
          description: Default error sample response