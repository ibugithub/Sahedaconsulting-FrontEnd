'use client';

import React from 'react';
import { Slides } from './slides';
import Overview from './overview/Overview'
import { Service } from './service';
import { Projects } from './projects';
import { Work } from './work';

const Home = () => {
  return (
    <>
      <Slides />
      <Service />
      <Overview />
      <Projects />
      <Work />
    </>
  );
}

export default Home;
