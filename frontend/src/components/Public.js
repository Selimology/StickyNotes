import { Link } from 'react-router-dom';
import React from 'react';

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Kamil Texts</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Tirana, Albania. This is just a small project for me to
          practice MERN Stack.
        </p>
        <address className="public__addr">
          Kamil Ertekin <br />
          Tirana Albania <br />
          <a href="tel:+15012310230123"> (555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Kamil Ertekin</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );

  return content;
};

export default Public;
