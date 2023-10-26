const { addItem } = require("./db")

module.exports = {
    loadJSONFile:function loadJSONFile(fileName,majorId){
        var json=require(fileName)
        courseNumbers=[]
    
        for (i in json.report_data){
            currCourse = json.report_data[i]
            if (!courseNumbers.includes(currCourse.course_number) && !isNaN(parseFloat(currCourse.course_number[1]))){
                courseNumbers.push(currCourse.course_number)
                // console.log(majorId,currCourse.title,currCourse.course_number,currCourse.course_number[1])
                this.addCourse(majorId,currCourse.title,currCourse.course_number,parseInt(currCourse.course_number[1]))
            }
            
            
        }
        
    },
    /**
     * Adds a new User to the database 
     * @param {string} firstName First name
     * @param {string} middleName Middle name
     * @param {string} lastName Last name
     * @param {string} password Hashed password
     * @param {string} username Unique username
     * @param {string} major Major
     * @param {Array<Course>} courses Courses provided or sought
     * @param {string} phone Phone number
     * @param {string} email Email
     * @param {string} longBio Descriptive bio
     * @param {ImageData} profilePic Profile picture
     */
    addUser: function addUser(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, profilePic = null) {
        const postData = {
            username: username,
            major: major,
            courses: courses,
            phone: phone,
            email: email,
            longBio: longBio,
            shortBio:shortBio,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            password: password,
            profilePic: profilePic
        }
        return addItem("User", postData)

    },

    /**
     * Adds a new Student to the database 
     * @param {string} firstName First name
     * @param {string} middleName Middle name
     * @param {string} lastName Last name
     * @param {string} password Hashed password
     * @param {string} username Unique username
     * @param {string} major Major
     * @param {Array<Course>} courses Courses provided or sought
     * @param {string} phone Phone number
     * @param {string} email Email
     * @param {string} longBio Descriptive bio
     * @param {ImageData} profilePic Profile picture
     */
    addStudent: async function addStudent(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, rating = 0.00, profilePic = null) {
        const postDataUser = {
            username: username,
            major: major,
            courses: courses,
            phone: phone,
            email: email,
            longBio: longBio,
            shortBio:shortBio,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            password: password,
            profilePic: profilePic,
        }
        userKey = await addItem("User", postDataUser)
        userKey = userKey["id"]
        const postDataStudent = {
            userId: userKey
        }
        return addItem("Student", postDataStudent, userKey)
    },
    /**
     * Adds a new Tutor to the database 
     * @param {string} firstName First name
     * @param {string} middleName Middle name
     * @param {string} lastName Last name
     * @param {string} password Hashed password
     * @param {string} username Unique username
     * @param {string} major Major
     * @param {Array<string>} courses List of course ids 
     * @param {string} phone Phone number
     * @param {string} email Email
     * @param {string} longBio Descriptive bio
     * @param {string} shortBio A short bio for the tutor visible to students
     * @param {Array<Date>} weeklyAvailability Weekly availability, should be an array<Date,7> storing time ranges in a standard format, index 0 is monday
     * @param {Array<Date>} exceptionsAvailability A list of exceptions to the weekly schedule, stored as dates of unavailability
     * @param {ImageData} profilePic 
     * @param {number} rating Float rating of the user
     * @param {boolean} backgroundCheck Defaults to false, whether a background check has passed or not
     * @param {number} totalHours Total hours completed by tutor
     * @param {number} rating The rating other users have given the tutor
     */
    addTutor: async function addTutor(firstName, middleName, lastName, password, username, major, courses, phone, email, longBio, shortBio, weeklyAvailability = [], exceptionsAvailability = [], profilePic = null, rating = 0.00, backgroundCheck = false, totalHours = 0) {
        const postDataUser = {
            username: username,
            major: major,
            courses: courses,
            phone: phone,
            email: email,
            longBio: longBio,
            shortBio:shortBio,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            password: password,
            // rating: rating,
            profilePic: profilePic
        }
        userKey = await addItem("User", postDataUser)
        userKey = userKey["id"]
        const postDataTutor = {
            userId: userKey,
            backgroundCheck: backgroundCheck,
            totalHours: totalHours,
            rating: rating,
            weeklyAvailability: weeklyAvailability,
            exceptionsAvailability: exceptionsAvailability
        }
        return addItem("Tutor", postDataTutor, userKey)
    },
    /**
     * Adds a new Major to the database 
     * @param {string} majorName Name of the major
     */
    addMajor: function addMajor(majorName) {
        const postData = {
            majorName: majorName
        }
        return addItem("Major", postData)
    },
    /**
     * Adds a new Course to the database 
     * @param {string} majorId Database major ID
     * @param {string} courseName Name of the course
     * @param {string} courseNumber Course number
     * @param {number} creditHours Number of credit hours this course offers
     */
    addCourse: function addCourse(majorId, courseName, courseNumber, creditHours) {
        const postData = {
            majorId: majorId,
            courseName: courseName,
            courseNumber: courseNumber,
            creditHours: creditHours
        }
        return addItem("Course", postData)
    },
    /**
     * Adds a new Appointment to the database, should be tied to a tutor and a user
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {Date} dateTime Date and time the appointment starts
     * @param {number} length The duration of the appointment, in minutes
     * @param {boolean} online Whether the appointment is online or in person
     * @param {string} location If in person, the address of the appointment, if online, a meeting URL
     * @param {string} notes Notes about the meeting
     * @param {number} rating Appointment rating
     */
    addAppointment: function addAppointment(tutorId, studentId, dateTime, length, online, location,courses, notes, rating, reivew) {
        const postData = {
            tutorId: tutorId,
            studentId: studentId,
            dateTime: dateTime,
            length: length,
            online: online,
            location: location,
            courses:courses,
            notes: notes,
            rating: rating,
            feedback:feedback
        }
        return addItem("Appointment", postData)
    },
    /**
     * Adds a new Review to the database, should be tied to an appointment
     * @param {string} tutorId Tutor username
     * @param {string} studentId Student username
     * @param {number} rate Review rating
     * @param {string} description A short description/ comment of the appointment
     */
    addReview: function addReview(tutorId, studentId, rate, description) {
        const postData = {
            tutorId: tutorId,
            studentId: studentId,
            rate: rate,
            description: description
        }
        return addItem("Review", postData)

    }

    // /**
    //  * Adds a new Availability to the database, should be tied to a user
    //  * @param {string} tutorId Database ID of the tutor
    //  * @param {string} weekly Weekly availability, should be an array<string,7> storing time ranges in a standard format, index 0 is monday
    //  * @param {Array<Date>} exceptions A list of exceptions to the weekly schedule, stored as dates of unavailability
    //  */
    //  function addAvailability(tutorId, weekly, exceptions = []) {
    //     const postData = {
    //         tutorId: tutorId,
    //         weekly: weekly,
    //         exceptions: exceptions
    //     }
    //     return  addItem("Availability", postData)

    // }
}
