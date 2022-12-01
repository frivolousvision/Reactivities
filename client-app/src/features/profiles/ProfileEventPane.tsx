import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  Card,
  Grid,
  Header,
  Image,
  Placeholder,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../app/store/store";

const ProfileEventPane = () => {
  const {
    profileStore: { loadingUserActivity, userActivites },
  } = useStore();

  return (
    <>
      {loadingUserActivity ? (
        <>
          <Header icon="calendar" content={`Activities`} />
          <Grid columns={4} stackable>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Image></Placeholder.Image>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Image></Placeholder.Image>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Image></Placeholder.Image>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Image></Placeholder.Image>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="full" />
                    <Placeholder.Line length="medium" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <>
          <Header icon="calendar" content={`Activities`} />
          <Card.Group itemsPerRow={4} style={{ border: "none" }}>
            {userActivites &&
              userActivites.map((activity) => (
                <Card
                  key={activity.id}
                  as={Link}
                  to={`/activities/${activity.id}`}
                >
                  <Image
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    style={{ minHeight: 100, objectFit: "cover" }}
                  />
                  <Card.Content textAlign="center">
                    <Card.Header>{activity.title}</Card.Header>

                    <div>{format(new Date(activity.date!), "do LLL")}</div>
                    <div>{format(new Date(activity.date!), "h:mm a")}</div>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>{" "}
        </>
      )}
    </>
  );
};

export default observer(ProfileEventPane);
