import React, { useState } from 'react'
import Button from './Button'

const coursesData = [
    {
        "name": "React - basics",
        "description": "This course is going to take you through basics of React.",
        "author": "James White",
        "publishDate": "12/03/2019",
        "duration": "00:03:56",
        "image": "https://cdn.auth0.com/blog/react-js/react.png"
    },
    {
        "name": "Vue - learn vue in an hour",
        "description": "This course teaches you how to build a vue application in an hour.",
        "author": "Michael Brown",
        "publishDate": "17/10/2019",
        "duration": "00:00:59",
        "image": "https://vuejs.org/images/logo.png"
    },
    {
        "name": "CSS Animations",
        "description": "Learn how to animate anything in CSS",
        "author": "Alan Smith",
        "publishDate": "04/12/2018",
        "duration": "00:02:11",
        "image": "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png"
    },
    {
        "name": "JS - Zero to hero",
        "description": "Everything you need to know in JS",
        "author": "Sarah Parker",
        "publishDate": "12/03/2019",
        "duration": "01:01:35",
        "image": "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png"
    }
]

const Course = () => {
    const [courses, setCourses] = useState(coursesData);
    const [searchItem, setSearchItem] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [hoveredCourse, setHoveredCourse] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleSearch = (event) => {
        setSearchItem(event.target.value);
    };

    const handleSort = (event) => {
        setSortBy(event.target.value);
    };

    const handleButton = (course, type)=>{
        if(type === "Add"){
            handleAddToCart(course);
        } else {
            handleRemoveFromCart(course);
        }
    };

    const handleAddToCart = (course) => {
        if (isLoggedIn) {
            setCart([...cart, course]);
            setHoveredCourse(null);
        } else {
            setLoginModalOpen(true);
        }
    };

    const handleRemoveFromCart = (course) => {
        setCart(cart.filter((item) => item !== course));
        setHoveredCourse(null);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoggedIn(true);
        setLoginModalOpen(false);
        alert("Login Successful!");
    };


    const handleCourseHover = (course) => {
        setHoveredCourse(course);
    };

    const handleToggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    if (sortBy === "date") {
        filteredCourses.sort(
            (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );
    } else if (sortBy === "duration") {
        filteredCourses.sort((a, b) => a.duration.localeCompare(b.duration));
    }


    console.log(filteredCourses)
    return (
        <div className="container">
            <h1 className="text-center"> Course </h1>
            <div>
                <div className="cart-icon" onClick={handleToggleCart}>

                    <span className="cart-count">cart-{cart.length}</span>
                </div>
                {isCartOpen && (
                    <div className="cart">
                        <h2>Cart</h2>
                        {cart.length === 0 ? <p>No courses in cart</p> : null}
                        <ul>
                            {cart.map((course) => (
                                <li key={course.name}>{course.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex-wrap mt-50">
                <div className="w-50">
                    <input type="text" placeholder="Search courses" value={searchItem} onChange={handleSearch} />
                </div>
                <div className="w-50 text-right">
                    <select value={sortBy} onChange={handleSort}>
                        <option value=""> Sort By  </option>
                        <option value="date"> Date </option>
                        <option value="duration"> Duration </option>
                    </select>
                </div>
            </div>
            <div className="grid-course mt-100">
                {filteredCourses.map((e) => (
                    <div className="grid" key={e.name}
                        onMouseEnter={() => handleCourseHover(e)}
                        onMouseLeave={() => handleCourseHover(null)}>
                        <img className="course-img" src={e.image} alt={e.name} />
                        <h3> {e.name}</h3>
                        <h3> {e.author}</h3>
                        <h3> {e.publishDate}</h3>
                        <h3> {e.duration}</h3>
                        {e === hoveredCourse && (
                            <Button course={e} handleButton={handleButton} type={cart.includes(e) ? "Remove" : "Add"}/>
                        )}
                        
                    </div>
                ))}


            </div>
            {loginModalOpen && (
        <div className="modal">
          <form onSubmit={handleLogin} className="login-form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
        </div>
    )
}
export default Course;