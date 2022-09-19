import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Visualizer } from "../components/Visualizer";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  return (
    <div className="max-h-screen\">
      <Visualizer />
    </div>
  );
};

export default Home;
