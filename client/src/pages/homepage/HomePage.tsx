import React from "react";

import Directory from '../../components/directory/Directory';
import { HomePageContainer } from './HomePageStyles';
interface HomePageProps  {
}

const HomePage: React.FC<HomePageProps> = () => (
  <HomePageContainer>
        <Directory />
  </ HomePageContainer>
);

export default HomePage;
