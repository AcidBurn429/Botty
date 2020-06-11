import React, { Dispatch, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { MessageArgs, TriggerArgs } from './chatbot-types';
import { createWebsiteURLWithData } from './urlArgs';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBotAction } from './state/action';
import { CodeBlock } from './CodeBlock';
import { getXMLErrors, parseXML, getXMLBody } from './getXMLErrors';
import { WebsitePreview } from './WebsitePreview';
import { codeFromState } from './state/code';
import { ChatBotState } from './state';
import { ThemeProvider } from 'styled-components';

type TriggerProps = { value: string; steps?: any };

function LinkToWebsite() {
  const code = useSelector<ChatBotState, string>((state) =>
    codeFromState(state.code)
  );
  const url = createWebsiteURLWithData('site', code);
  return <a href={url}>Klick hier um deine Website zu öffnen</a>;
}

export function ProgrammingChatBot() {
  const dispatch = useDispatch<Dispatch<ChatBotAction>>();
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    function updateHeight() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  });

    const steps = [
        {
            id: 'start',
            message: 'Hallo, schön, dass ich dir helfen kann. Ich bin Chatty, kein echter Mensch, aber ich kann schreiben wie ein echter Mensch. Was du schreibst bleibt unter uns und ich erzähle es nicht weiter. Wer bist du?',
            trigger: 'enter-name',
        },
        {
          id: 'enter-name',
          user: true,
          trigger: 'ask-age',
        },
        {
          id: 'ask-age',
          message: (args: MessageArgs) => {
            dispatch({ type: 'setName', value: args.previousValue });
              return `Hallo ${args.previousValue} 😀. Wie alt bist du?`;
          },
          trigger: 'enter-age',
        },
        {
            id: 'enter-age',
            user: true,
            trigger: 'ask-happyness',
        },
        {
            id: 'ask-happyness',
            message: 'Wie geht es dir?',
            trigger: 'select-happyness',
        },
        {
            id: 'select-happyness',
          options: [
            { value: 1, label: 'Gut 😀', trigger: 'happyness-good' },
            { value: 2, label: ' Geht so 😐', trigger: 'happyness-bof' },
              { value: 3, label: 'Schlecht 😟', trigger: 'happyness-bad' },
              { value: 4, label: 'Wütend 😡', trigger: 'happyness-angry' },
            { value: 5, label: 'Traurig 😢', trigger: 'happyness-sad' },
          ],
        },
        {
            id: 'happyness-good',
            message: 'Das ist schön, ich freue mich für dich!',
            trigger: 'select-happyness',
        },
        {
            id: 'happyness-sad',
            message: 'Oh, du bist traurig, das tut mir Leid . Ist etwas passiert?',
            trigger: 'select-happend',
        },
        {
            id: 'happyness-angry',
            message: 'Oh, du bist wütend 😡! Das tut mir Leid. Ist etwas passiert?',
            trigger: 'select-happend'
        },
        {
            id: 'happyness-bof',
            message: 'Okay..., was los?',
            trigger: 'select-happyness',
        },
        {
            id: 'happyness-bad',
            message: 'Oh, was ist los?',
            trigger: '',
        },
        {
            id: 'select-happend',
            options: [
                {value: 1, label: 'Ja', trigger: 'happend-yes'},
                {value: 2, label: 'Nein', trigger: 'happend-no'},
            ]
        },
        {
            id: 'happend-no',
            message: "Okay. Du kannst aber jedes mal wiederkommen, wenn du Probleme hast. Ich bin immer da für dich. :)",
        },
        {
            id: 'happend-yes',
            message: 'Möchtest du mit mir darüber reden?',
            trigger: 'select-talk',
        },
        {
            id: 'select-talk',
            options: [
                { value: 1, label: 'Ja', trigger: 'talk-yes' },
                { value: 2, label: 'Nein', trigger: 'talk-no' },
            ]
        },
        {
            id: 'talk-no',
            message: 'Es ist ok, wenn du es mir nicht erzählen möchtest. Aber es hilft oft, wenn man darüber spricht. Kannst du es jemandem anderen erzählen?',
            trigger: 'ask-for-help-person',
        },
        {
            id: 'ask-for-help-person',
            options: [
                { value: 1, label: 'Ja', trigger: 'help-person-yes' },
                { value: 2, label: 'Nein', trigger: 'help-person-no' },
            ]
        },
        {
            id: 'help-person-yes',
            message: 'Super, dann nichts wie los, rede mit dieser Person. Es geht dir danach bestimmt besser ;)',
        },
        {
            id: 'help-person-no',
            message: "Okay. Du kannst aber jedes mal wiederkommen, wenn du Probleme hast. Ich bin immer da für dich. :)",
        },
        {
            id: 'talk-yes',
            message: 'Super, ich höre zu. Wo ist es passiert?',
            trigger: 'ask-where',
        },
        {
            id: 'ask-where',
            options: [
                { value: 1, label: 'Zuhause', trigger: 'where-home' },
                { value: 2, label: 'Schule', trigger: 'where-school' },
                { value: 3, label: 'Wo anders', trigger: 'where-else' },
            ]
        },
        {
            id: 'where-home',
            message: 'Zuhause? Hast du Ärger mit jemandem oder ist etwas anderes geschehen?',
            trigger: 'ask-home-what',
        },
        {
            id: 'ask-home-what',
            options: [
                { value: 1, label: 'Ärger mit jemanden', trigger: 'home-fight-someone' },
                { value: 1, label: 'Etwas anderes', trigger: 'home-different-problem' },
            ]
        },
        {
            id: 'home-different-problem',
            user: true,
            trigger: 'home-fight-someone',
        },
        {
            id: 'home-fight-someone',
            message: 'Ärger ist nicht schön! Mit wem hast du zuhause Ärger?',
            trigger: 'ask-home-fight-person',
        },
        {
            id: 'ask-home-fight-person',
            options: [
                { value: 1, label: 'Mama', trigger: 'home-fight-mom' },
                { value: 2, label: 'Papa', trigger: 'home-fight-dad' },
                { value: 3, label: 'Bruder', trigger: 'home-fight-brother' },
                { value: 4, label: 'Schwester', trigger: 'home-fight-sister' },
                { value: 5, label: 'Andere Personen', trigger: 'home-fight-diff-person' },
            ],
        },
        {
            id: 'home-fight-mom',
            message: 'Ok, mit deiner Mama. Hast du oft Ärger mit ihr oder ist es heute besonders schlimm?',
            trigger: 'ask-fight-quantity',
        },
        {
            id: 'home-fight-dad',
            message: 'Ok, mit deinem Papa. Hast du oft Ärger mit ihm oder ist es heute besonders schlimm?',
            trigger: 'ask-fight-quantity',
        },
        {
            id: 'home-fight-brother',
            message: 'Ok, mit deinem Bruder. Hast du oft Ärger mit ihm oder ist es heute besonders schlimm?',
            trigger: 'ask-fight-quantity',
        },
        {
            id: 'home-fight-sister',
            message: 'Ok, mit deiner Schwester. Hast du oft Ärger mit ihr oder ist es heute besonders schlimm?',
            trigger: 'ask-fight-quantity',
        },
        {
            id: 'home-fight-diff-person',
            message: 'Ok, mit jemand anderem? Wer ist das denn?',
            trigger: 'ask-fight-name-person',
        },
        {
            id: 'ask-fight-name-person',
            user: true,
            trigger: 'ask-fight-quantity',
        },
        {
            id: 'ask-fight-quantity',
            options: [
                { value: 1, label: 'Immer', trigger: 'home-fight-type' },
                { value: 2, label: 'Heute', trigger: 'home-fight-type' },
                { value: 3, label: 'Nur manchmal', trigger: 'home-fight-type' },
            ],
            trigger: 'home-fight-type',
        },
        {
            id: 'home-fight-type',
            message: 'Welche Art von Ärger hast du?',
            trigger: 'ask-home-fight-type',
        },
        {
            id: 'ask-home-fight-type',
            options: [
                { value: 1, label: 'Geschrei', trigger: 'home-fight-knower' },
                { value: 2, label: 'Böse Worte', trigger: 'home-fight-knower' },
                { value: 3, label: 'Schläge', trigger: 'home-fight-knower' },
                { value: 4, label: 'unangenehme Umarmungen oder Berührungen', trigger: 'home-fight-knower' },
                { value: 5, label: 'Etwas anderes', trigger: 'home-fight-knower' },
            ]
        },
        {
            id: 'home-fight-knower',
            message: 'Weiss jemand zuhause davon?',
            trigger: 'ask-home-fight-knower',
        },
        {
            id: 'ask-home-fight-knower',
            options: [
                { value: 1, label: 'Ja.', trigger: 'home-fight-knower-yes' },
                { value: 2, label: 'Nein.', trigger: 'home-fight-knower-no' },
                { value: 3, label: 'Ich weiß es nicht.', trigger: 'home-fight-knower-maybe' },
            ],
        },
        {
            id: 'home-fight-knower-yes',
            message: 'Jemand weiss es und kann oder möchte nicht helfen?',
            trigger: 'ask-home-fight-knower-does-nothing',
        },
        {
            id: 'ask-home-fight-knower-does-nothing',
            options: [
                { value: 1, label: 'Kann nicht helfen.', trigger: 'home-fight-need-help' },
                { value: 2, label: 'Möchte nicht helfen.', trigger: 'home-fight-need-help' },
                { value: 3, label: 'Ich weiß nicht.', trigger: 'home-fight-need-help' },
            ],
        },
        {
            id: 'home-fight-knower-no',
            message: 'Das ist echt doof.',
            trigger: 'home-fight-need-help',
        },
        {
            id: 'home-fight-knower-maybe',
            message: 'Das ist echt doof.',
        },
        {
            id: 'home-fight-need-help',
            message: 'Ich verstehe! Du brauchst dringend Hilfe! Ich kann dich mit einem netten Menschen verbinden, der dir helfen wird. Du brauchst keine Angst zu haben, das Gespräch ist geheim. Möchtest du das?',
            trigger: 'ask-home-fight-need-help',
        },
        {
            id: 'ask-home-fight-need-help',
            options: [
                { value: 1, label: 'Ja.', trigger: 'home-fight-want-help-yes' },
                { value: 2, label: 'Nein.', trigger: 'home-fight-want-help-no' },
                { value: 1, label: 'Ich weiß nicht.', trigger: 'home-fight-want-help-dont-know' },
            ],
        },
        {
            id: 'home-fight-want-help-yes',
            message: 'Toll, du bist super stark! Rufe die Nummer gegen Kummer 1161111 an. Sie sind von Montag - Samstag von 14 - 20 Uhr + am Montag, Mittwoch und Donnerstag um 10 - 12 Uhrzu erreichen',
        },
        {
            id: 'home-fight-want-help-no',
            message: 'Schade! ich kann dir trotzdem eine Telefonnummer geben und du entscheidest, ob du anrufen willst, ok?',
            trigger: 'ask-home-fight-help-number-want',
        },
        {
            id: 'home-fight-want-help-dont-know',
            message: 'Okay. Ich kann dir trotzdem eine Telefonnummer geben und du entscheidest, ob du anrufen willst, ok?',
            trigger: 'ask-home-fight-help-number-want',
        },
        {
            id: 'ask-home-fight-help-number-want',
            options: [
                { value: 1, label: 'Ja, okay.', trigger: 'home-fight-number-yes' },
                { value: 1, label: 'Nein.', trigger: 'home-fight-number-no' },
            ]
        },
        {
            id: 'home-fight-number-yes',
            message: 'Toll, du bist super stark! Rufe die Nummer gegen Kummer 1161111 an. Sie sind von Montag - Samstag von 14 - 20 Uhr + am Montag, Mittwoch und Donnerstag um 10 - 12 Uhrzu erreichen',
        },
        {
            id: 'home-fight-number-no',
            message: 'Okay.'
        },
        {
            id: 'where-school',
            message: 'In der Schule? Das kenne ich ',
        },
        {
            id: 'where-else',
            message: 'Was anderes,'
        },
  ];

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Verdana',
    headerBgColor: '#1F8ACF',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#89cdba',
    botFontColor: '#fff',
    userBubbleColor: '#89cdba',
    userFontColor: '#fff',
  };

  const header = (
    <div
      style={{
        backgroundColor: '#e4b665',
        padding: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      }}
    >
      Buddy
    </div>
  );

  const chatBotProps = {
    headerTitle: 'Buddy',
    botAvatar: require('./icon.png'),
    steps: steps,
    headerComponent: header,
      bubbleOptionStyle: { backgroundColor: '#f8e7ca', color: 'black' }
    };

  if (height <= 750 && width <= 600) {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot width="100%" floating={true} opened={true} {...chatBotProps} />
      </ThemeProvider>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#e1f3ee',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <div style={{ flex: 1 }} />
        <div>
          <ThemeProvider theme={theme}>
            <ChatBot {...chatBotProps} />
          </ThemeProvider>
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}
