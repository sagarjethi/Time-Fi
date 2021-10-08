import Divider from "@material-ui/core/Divider";
import Title from "../../elements/Title";
import React from "react";
import { Container, Item, Page, Row } from "../../elements/Gridding";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { hot } from "react-hot-loader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { NewEventHeader } from "./Details/EventHeader";
import debounceHandler from "@hocs/debounce-handler";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { compose, withState } from "recompose";
import { EventDurations } from "./Details/EventDurations";
import { FormActions } from "../../shared/FormActions";
import { Button } from "@material-ui/core";
import { withEventFormik, NewEventForm } from "./Details/EventForm";

export const NewEventFormik = withEventFormik(NewEventForm);

export const withEventColorState = withState(
  "eventColor",
  "eventColorChange",
  "blue"
);

export const withEventNameState = withState(
  "eventName",
  "eventNameChange",
  "My Event"
);

const debounceEventName = debounceHandler("eventNameChange", 200);

const InviteeQuestions = ({}) => (
  <ExpansionPanel defaultExpanded={false}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <NewEventHeader
        color="#CCC"
        icon={QuestionAnswerIcon}
        title="Invitee Questions"
      />
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Item xs={7}>
        <FormActions
          dividerBottom
          handleCancel={() => {}}
          handleNext={() => {}}
        >
          <Button size="small">Cancel</Button>
          <Button size="small" type="submit" color="primary">
            Next
          </Button>
        </FormActions>
      </Item>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

type NewEventDetails = {
  eventColor: string;
  eventName: string;
  eventColorChange: (color: string) => string;
  eventNameChange: (name: string) => string;
};

const NewEventDetails: React.SFC<NewEventDetails> = ({
  eventColor: ec,
  eventName: en,
  eventColorChange,
  eventNameChange
}) => (
  <ExpansionPanel defaultExpanded={false}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <NewEventHeader color={ec} title={en} />
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Item xs={7}>
        <FormActions
          dividerBottom
          handleNext={() => {}}
          handleCancel={() => {}}
        >
          <Button size="small">Cancel</Button>
          <Button size="small" type="submit" color="primary">
            Next
          </Button>
        </FormActions>
        <NewEventFormik
          name={en}
          eventColor={ec}
          handleChange={({ eventColor, name }) => {
            eventColorChange(eventColor);
            eventNameChange(name);
          }}
        />
      </Item>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

const NewEventDetailsWithWatcher = withEventColorState(
  withEventNameState(NewEventDetails)
);

export const NewEventPage = () => (
  <Page>
    <Row>
      <Title>New Event</Title>
      <Divider />
    </Row>
    <Container justify="center">
      <Row sm={10}>
        <NewEventDetailsWithWatcher />
      </Row>
    </Container>
    <Container justify="center">
      <Row xs={12} sm={10}>
        <EventDurations />
      </Row>
    </Container>
    <Container justify="center">
      <Row xs={12} sm={10}>
        <InviteeQuestions />
      </Row>
    </Container>
  </Page>
);

export default hot(module)(NewEventPage);
