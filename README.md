<h1> Technology bites </h1> 

<h2> Endpoints overview (server side) </h2>

| HTTP Method |        URL Path       |             Description            |
|:-----------:|:---------------------:|:----------------------------------:|
|     POST    |          `/signup`        |             Create user            |
|     POST    |         /login        |             Login user             |
|     GET     |        /verify        |          Verify auth token         |
|     GET     |    /getOne/:user_id   |        Get user information        |
|     PUT     |     edit/:user_id     |        Edit user information       |
|    DELETE   |    delete/:user_id    |             Delete user            |
|     POST    |        /create        |        Create a new comment        |
|     GET     | /getComments/:card_id | See comments from an specific card |
|     PUT     |   /edit/:comment_id   |           Edit a comment           |
|    DELETE   |  /delete/:comment_id  |          Delete a comment          |
|     POST    |    /v1/completions    |          Get API response          |
|     POST    |         /save         |           Save a new card          |
|     GET     |    /getAll/:user_id   |     Get cards of a single user     |
|     GET     |    /getOne/:card_id   |        Get card information        |
|     PUT     |     /edit/:card_id    |  Edit a card (social interactions) |

<h2> Routes overview (client side) </h2>


|         URL         |                Description                | Protected |
|:-------------------:|:-----------------------------------------:|:---------:|
|         `/`         |                 Home page                 |           |
|    `/challenges`    |           Shows single question           |     ✅     |
|     `/community`    |               See users list              |     ✅     |
| `/profile/:user_id` |             See user profile              |     ✅     |
|       `/dojo`       | Shows collection of questions by category |     ✅     |



