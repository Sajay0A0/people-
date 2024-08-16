import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';

export default function Usernavbar(){
    return(
        <div className='sticky-top'>
         <Navbar bg="light" data-bs-theme="light" className='flex px-4 py-1'>
           <Container fluid>
            <Navbar.Brand style={{fontSize:'45px',fontWeight:'700'}}> <p className='text-purple-800'> PEOPLE.CO </p></Navbar.Brand>
            <Nav className="me-5 ">
            <Nav.Link href="#pricing" className='d-flex'>
            <img className="rounded-full h-18 d-flex " src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" width="55px" />
            <h4 className='pl-3 mt-3'>John</h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>      
    </div>
    )
}