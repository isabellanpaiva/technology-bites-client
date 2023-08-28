<h1> Technology bites </h1> 

<h2> Endpoints overview (server side) </h2>

|         Base URL         | HTTP Method |         URL Path        |                 Description                 |
|:------------------------:|:-----------:|:-----------------------:|:-------------------------------------------:|
|          `/auth`         |     POST    |        `/signup`        |                 Create user                 |
|          `/auth`         |     POST    |         `/login`        |                  Login user                 |
|          `/auth`         |     GET     |        `/verify`        |              Verify auth token              |
|          `/user`         |     GET     |    `/getOne/:user_id`   |             Get user information            |
|          `/user`         |     PUT     |     `edit/:user_id`     |            Edit user information            |
|          `/user`         |    DELETE   |    `delete/:user_id`    |                 Delete user                 |
|        `/comment`        |     POST    |        `/create`        |             Create a new comment            |
|        `/comment`        |     GET     |  `getAll/:challenge_id` |   See comments from an specific challenge   |
|        `/comment`        |     PUT     |   `/edit/:comment_id`   |                Edit a comment               |
|        `/comment`        |    DELETE   |  `/delete/:comment_id`  |               Delete a comment              |
|       `/challenge`       |     GET     |    `/getAll/:user_id`   |        Get challenge of a single user       |
|       `/challenge`       |     GET     | `/getOne/:challenge_id` |        Get challenge card information       |
|       `/challenge`       |     PUT     |  `/edit/:challenge_id`  | Edit a challenge card (social interactions) |
|          `/dojo`         |     PUT     |     `/edit/:dojo_id`    |             Update dojo database            |
| `https://api.openai.com` |     POST    |  `/v1/chat/completions` |               Get API response              |

<h2> Routes overview (client side) </h2>


|         URL         |                Description                | Protected |
|:-------------------:|:-----------------------------------------:|:---------:|
|         `/`         |                 Home page                 |           |
|    `/challenges`    |           Shows single question           |     ✅     |
|     `/community`    |               See users list              |     ✅     |
| `/profile/:user_id` |             See user profile              |     ✅     |
|       `/dojo`       | Shows collection of questions by category |     ✅     |



