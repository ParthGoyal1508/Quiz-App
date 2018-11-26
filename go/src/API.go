package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB
var err error

type User struct {
	UserID           uint   `gorm:"primary_key" json:"userid"`
	Email            string `gorm:"primary_key" json:"email"`
	Name             string `json:"name"`
	Hashpassword     string `json:"password"`
	Cricketscore     int    `gorm:"default:0" json:"cricketscore"`
	Moviescore       int    `gorm:"default:0" json:"moviescore"`
	Harrypotterscore int    `gorm:"default:0" json:"harrypotterscore"`
}

type loginuser struct {
	Email        string `json:"email"`
	Hashpassword string `json:"password"`
}

type questdata struct {
	ID       uint   `gorm:"primary_key" json:"id"`
	Genre    string `json:"genre"`
	Quizno   string `json:"quizno"`
	Type     string `json:"type"` //type=1 single correct and type=2 multiple correct
	Quesno   string `json:"quesno"`
	Question string `json:"question"`
	Optiona  string `json:"optiona"`
	Optionb  string `json:"optionb"`
	Optionc  string `json:"optionc"`
	Optiond  string `json:"optiond"`
	Answera  string `json:"ansa"`
	Answerb  string `json:"ansb"`
	Answerc  string `json:"ansc"`
	Answerd  string `json:"ansd"`
}

type deldata struct {
	Genre  string `json:"genre"`
	Quizno string `json:"quizno"`
	Quesno string `json:"quesno"`
}

type quizdata struct {
	Genre  string `json:"g"`
	Quizno string `json:"qno"`
}

type scoredata struct {
	User  string `json:"user"`
	Genre string `json:"genre"`
	Score int    `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&User{})
	db.AutoMigrate(&questdata{})
	r := gin.Default()
	r.POST("/signup", AddUser)
	r.POST("/login", Userlogin)
	r.POST("/addque", AddQuestion)
	r.POST("/deleteque", DeleteQuestion)
	r.GET("/viewuser", ViewUser)
	r.POST("/deleteuser/:userid", DeleteUser)
	r.GET("/genre", GetGenre)
	r.GET("/genre/:genrev", GetQuizno)
	r.POST("/quiz", GetQuiz)
	r.POST("/deletequiz", DeleteQuiz)
	r.GET("/viewuser/:qid", GetQue)
	r.POST("/updateque", UpdateQue)
	r.POST("/score", UpdateScore)
	r.GET("/leaderboard", LeaderBoard)
	r.Use((cors.Default()))
	r.Run(":8080")
}

func LeaderBoard(c *gin.Context) {
	var data []User
	if err := db.Find(&data).Error; err != nil {
		c.AbortWithStatus(404)
	} else {
		// fmt.Println(data)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, data)
	}
}

func UpdateScore(c *gin.Context) {
	var data scoredata
	c.BindJSON(&data)
	// fmt.Println(data)
	// fmt.Println(data.User)
	// fmt.Println(data.Genre)
	// fmt.Println(data.Score)
	var user User
	db.Where("email = ?", data.User).First(&user)
	// fmt.Println(user)
	if data.Genre == "Cricket" {
		user.Cricketscore += data.Score
	}
	if data.Genre == "Movies" {
		user.Moviescore += data.Score
	}
	if data.Genre == "Harry Potter" {
		user.Harrypotterscore += data.Score
	}
	if err := db.Save(&user).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, data)
	}

}

func UpdateQue(c *gin.Context) {
	var nque questdata
	c.BindJSON(&nque)
	// fmt.Println(nque.Genre)
	// fmt.Println(nque)
	if err := db.Save(&nque).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, nque)
	}

}

func GetQue(c *gin.Context) {
	id := c.Params.ByName("qid")
	var que questdata
	if err := db.Where("id = ?", id).Find(&que).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		// fmt.Println(que)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, que)
	}

}

func DeleteQuiz(c *gin.Context) {
	var quiz quizdata
	var delque questdata
	c.BindJSON(&quiz)
	db.Where("genre = ? AND quizno = ?", quiz.Genre, quiz.Quizno).First(&delque)
	if err := db.Delete(&delque).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		// fmt.Println("DELETED")
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}

}

func GetQuiz(c *gin.Context) {
	// genrename := c.Params.ByName("genrename")
	// quizno := c.Params.ByName("quizno")
	// genrename := "Movie"
	// quizno := "1"
	// fmt.Println("ASS")
	var data quizdata
	c.BindJSON(&data)
	// fmt.Println(data)
	genrename := data.Genre
	quizno := data.Quizno
	// fmt.Println(genrename)
	// fmt.Println(quizno)
	var quiz []questdata
	if err := db.Table("questdata").Where("genre = ? AND quizno = ?", genrename, quizno).Find(&quiz).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		// fmt.Println(quiz)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}

}

func GetQuizno(c *gin.Context) {
	// c.BindJSON(&data)
	// genrename := data.Genre
	// quizno := data.Quizno
	// var quiz []questdata
	// db.Table("questdata").Where("genre = ? AND quizno = ?", genrename, quizno).Find(&quiz)
	// fmt.Println(quiz)
	// c.Header("access-control-allow-origin", "*")
	// c.JSON(200, quiz)
	genrev := c.Params.ByName("genrev")
	var quizname []string
	if err := db.Table("questdata").Where("genre = ?", genrev).Pluck("DISTINCT quizno", &quizname).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		// fmt.Println(quizname)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizname)
	}

}

func GetGenre(c *gin.Context) {
	var genre []string
	if err := db.Table("questdata").Pluck("DISTINCT genre", &genre).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		// fmt.Println(genre)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}

}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("userid")
	// fmt.Println(id)
	var person User
	if err := db.Where("user_id = ?", id).Delete(&person).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	}
}

func ViewUser(c *gin.Context) {
	var people []User
	if err := db.Find(&people).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, people)
	}
}

func AddQuestion(c *gin.Context) {
	var que questdata
	c.BindJSON(&que)
	if err := db.Create(&que).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, que)
	}
}

func DeleteQuestion(c *gin.Context) {
	var que deldata
	var delque questdata
	c.BindJSON(&que)
	if err := db.Where("genre = ? AND quizno = ? AND quesno = ?", que.Genre, que.Quizno, que.Quesno).First(&delque).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
	} else {
		db.Delete(&delque)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, que)
	}

}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func Userlogin(c *gin.Context) {
	var user loginuser
	c.BindJSON(&user)
	var obj User
	db.Where("email= ?", user.Email).First(&obj)
	match := CheckPasswordHash(user.Hashpassword, obj.Hashpassword)
	c.Header("access-control-allow-origin", "*")
	if match == true {
		fmt.Println("User logged in")
		c.JSON(200, user)
	} else {
		fmt.Println("Invalid Credentials")
		c.JSON(402, user)
	}
}

func AddUser(c *gin.Context) {
	var anotheruser User
	var user User
	c.BindJSON(&user)
	if err := db.Where("email = ?", user.Email).First(&anotheruser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(402, user)
		fmt.Println("User Already Exist")
	} else {
		paswd := user.Hashpassword
		hshpswd, _ := HashPassword(paswd)
		user.Hashpassword = hshpswd
		db.Create(&user)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}

}
