import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/store/store";
import ProfileAbout from "./ProfileAbout";
import ProfileEvents from "./ProfileEvents";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";
interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const { profileStore } = useStore();
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvents /> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => {
        if (data.activeIndex && typeof data.activeIndex === "number") {
          profileStore.setActiveTab(data.activeIndex);
        }
      }}
    />
  );
};

export default ProfileContent;
