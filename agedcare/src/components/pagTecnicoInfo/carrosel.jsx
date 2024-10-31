import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Carousel from 'react-bootstrap/Carousel'

const carrosel = () => {
  return (

      <div>
        <h4>React-Bootstrap Carousel Component</h4>
        <Carousel fade>
          <Carousel.Item interval={1500}>
            <img
            className='img'
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
              alt="image 1"
            />
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
            className='img'
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
              alt="image 2"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    
  )
}

export default carrosel
