import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
} from 'reactstrap';

const Header = () => (
  <Navbar expand dark color="dark">
    <Container>
      <Collapse navbar className="w-100">
        <NavLink className="navbar-brand" to="/">Aspirity Web Template</NavLink>
      </Collapse>
    </Container>
  </Navbar>
);

export default Header;
