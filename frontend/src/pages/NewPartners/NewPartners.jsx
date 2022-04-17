import { React } from "react";

import UserCard from "../../components/UserCard";

const NewPartners = () => {
  const dummyUser = {
    firstName: "Dan",
    lastName: "Abramov",
    profilePicture: "https://bit.ly/dan-abramov",
    experience: [
      {
        company: "commit the change, uci",
        title: "co-vice president of projects",
      },
      {
        company: "zillow",
        title: "software development engineer - intern",
      },
    ],
    zip: 90210,
  };
  return (
    <div>
      New Partners Page
      <UserCard userData={dummyUser} />
    </div>
  );
};

export default NewPartners;
