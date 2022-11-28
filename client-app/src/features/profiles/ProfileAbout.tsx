import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile, ProfileFormValues } from "../../app/models/profile";
import * as Yup from "yup";
import { useStore } from "../../app/store/store";
import MyTextArea from "../../app/common/form/MyTextArea";

interface Props {
  profile: Profile;
}
export default function ProfileAbout({ profile: profiles }: Props) {
  const {
    profileStore: { isCurrentUser, editProfile },
  } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<ProfileFormValues>(
    new ProfileFormValues()
  );

  useEffect(() => {
    setProfile(new ProfileFormValues(profiles));
  }, [profiles]);

  const validationSchema = Yup.object({
    displayName: Yup.string().required("The Display name is required"),
    bio: Yup.string().nullable(),
  });
  const handleFormSubmit = (profile: ProfileFormValues) => {
    editProfile(profile).then(() => setEditMode(false));
  };
  return (
    <Tab.Pane>
      <Grid>
        <>
          <Grid.Column width={16}>
            <Header
              icon="user"
              content={"About " + profile.displayName}
              floated="left"
            ></Header>
            {isCurrentUser && (
              <Button
                content={editMode ? "Cancel" : "Edit"}
                floated="right"
                onClick={() => setEditMode(!editMode)}
              />
            )}
          </Grid.Column>
          {!editMode && (
            <Grid.Column width={16}>
              <p style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</p>
            </Grid.Column>
          )}
        </>

        {editMode && (
          <Grid.Column width={16}>
            <Formik
              validationSchema={validationSchema}
              initialValues={profile}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form
                  className="ui form"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <MyTextInput placeholder="Display Name" name="displayName" />
                  <MyTextArea rows={6} placeholder="User Bio" name="bio" />
                  <Button
                    disabled={isSubmitting || !dirty || !isValid}
                    type="submit"
                    content="Submit"
                    color="green"
                    floated="right"
                    loading={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </Grid.Column>
        )}
      </Grid>
    </Tab.Pane>
  );
}
