import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { useStore } from "../../app/store/store";
import ProfileEventPane from "./ProfileEventPane";

const ProfileEvents = () => {
  const {
    profileStore: { profile, loadUserActivities, setActiveSubTab },
  } = useStore();

  useEffect(() => {
    if (profile) loadUserActivities(profile?.username);
  }, [loadUserActivities, profile]);

  const panes = [
    { menuItem: "Future Events", render: () => <ProfileEventPane /> },
    { menuItem: "Past Events", render: () => <ProfileEventPane /> },
    { menuItem: "Hosting", render: () => <ProfileEventPane /> },
  ];
  return (
    <Tab.Pane>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        onTabChange={(e, data) => {
          if (typeof data.activeIndex === "number") {
            setActiveSubTab(data.activeIndex);
          }
        }}
      />
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);
