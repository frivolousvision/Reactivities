import { observer } from "mobx-react-lite";
import { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/store/store";
interface Props {
  profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
  const {
    profileStore: { updateFollowing, loading },
    userStore,
  } = useStore();
  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  };

  if (userStore.user?.username === profile.username) return null;
  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          color="teal"
          fluid
          content={profile.following ? "Following" : "Not Following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          color={profile.following ? "red" : "green"}
          fluid
          basic
          loading={loading}
          content={profile.following ? "Unfollow" : "Follow"}
          onClick={(e) => handleFollow(e, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  );
});
