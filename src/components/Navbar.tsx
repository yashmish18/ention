import React from 'react';

const Navbar: React.FC = () => {
  const leftNavItems: string[] = ["Home", "Products", "Services"];
  const rightNavItems: string[] = ["About Us", "Support", "Shop"];
  const buttonItems: string[] = ["Login", "Register"];

  return (
    <>
      <style>
        {`
          .navbar {
            width: 100%;
            background: linear-gradient(to right, #0d1a2d, #000000);
            padding: 16px 32px;
          }

          .nav-container {
            max-width: 1240px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
          }

          .nav-left, .nav-right {
            display: flex;
            gap: 18px;
            align-items: center;
          }

        

          .logo-highlight {
            color: #3b82f6;
          }

          .nav-link {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
            opacity: 0.8;
            transition: all 0.2s ease;
          }

          .nav-link:hover {
            opacity: 1;
            color: #3b82f6;
          }

          .nav-button {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 16px;
            border: 1px solid #ffffff;
            border-radius: 20px;
            opacity: 0.8;
            transition: all 0.2s ease;
            background: transparent;
          }

          .nav-button:hover {
            opacity: 1;
            background: #ffffff;
            color: #0d1a2d;
          }

          .nav-button:last-child {
            background: #ffffff;
            color: #0d1a2d;
            border: none;
          }

          .nav-button:last-child:hover {
            background: #e0e0e0;
            color: #0d1a2d;
          }
        `}
      </style>
      <nav className="navbar">
        <div className="nav-container">
          {/* Left Navigation Links */}
          <div className="nav-left">
            {leftNavItems.map((item: string, index: number) => (
              <a key={index} href="#" className="nav-link">
                {item}
              </a>
            ))}
          </div>

          {/* Centered Logo */}
         

          {/* Right Navigation Links and Buttons */}
          <div className="nav-right">
            {rightNavItems.map((item: string, index: number) => (
              <a key={index} href="#" className="nav-link">
                {item}
              </a>
            ))}
            {buttonItems.map((item: string, index: number) => (
              <a key={index} href="#" className="nav-button">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;