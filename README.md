# Welocme to QuizApp!

# Introduction to the project:
I have to written a Go server that implements REST API and interacts with the database at the backend. The front end is a React application that is an interactive quiz.

## Features:
- Registration and login for users
- Multiple genre of quizzes
- Multiple types of questions, image, video and MCQ.
- Leaderboard
- Admin privileges to one user. He has privilege to do the following:
    - View/Create/Delete quizzes
    - Create/Delete/Edit questions/options in each quiz
    - View all users
    - Delete users
- End Cases Well Handled

##GO Packages 
"github.com/gin-contrib/cors"
"github.com/gin-gonic/gin"
"github.com/jinzhu/gorm"
"github.com/jinzhu/gorm/dialects/sqlite"
"golang.org/x/crypto/bcrypt"

## Running the program:
- Running the react app:
	- Go to the "react-app" folder and run yarn start
    - `yarn start`
- Running the Go server:
    - Go to the go/src folder and run `go run` command
	- `go run API.go`
The app will start on your default browser.
