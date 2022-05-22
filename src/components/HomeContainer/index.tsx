import React, { useState } from "react";
import "./index.scss";
import Nav from "../SideNav";
import Header from "../Header";
import { useSwipeable } from "react-swipeable";

interface Props {
  children: React.ReactNode;
}

function Index({ children }: Props) {
  const [showSideNav, setSideNav] = useState<boolean>(true);
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => setSideNav(true),
    onSwipedLeft: () => setSideNav(false),
  });
  return (
    <div {...handlers} className="root-home-container">
      <Header />
      {showSideNav && <Nav />}
      <div className="home-container">
        {children}
        <div className="footer">
          © All Right Reserved <br />
          Powered By Youtube API
        </div>
      </div>
    </div>
  );
}

export default Index;
