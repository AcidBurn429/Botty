import React, { Dispatch, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { MessageArgs } from './chatbot-types';
import { useDispatch } from 'react-redux';
import { ChatBotAction } from './state/action';
import { ThemeProvider } from 'styled-components';

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
            message: 'Hallo! Schön, dass ich dir helfen kann. Ich bin Botty. Ich bin kein echter Mensch, aber ich kann schreiben wie ein echter Mensch.',
            trigger: 'start-2',
        },
        {
            id: 'start-2',
            message: 'Was du schreibst bleibt unter uns und ich erzähle es nicht weiter. Wer bist du?',
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
            message: 'Das ist schön, ich freue mich für dich! Wenn du mich brauchst, ich bin hier 😀',
        },
        {
            id: 'happyness-sad',
            message: 'Oh, du bist traurig, das tut mir Leid. Ist etwas passiert?',
            trigger: 'select-happend',
        },
        {
            id: 'happyness-angry',
            message: 'Oh, du bist wütend 😡! Das tut mir Leid. Ist etwas passiert?',
            trigger: 'select-happend'
        },
        {
            id: 'happyness-bof',
            message: 'Okay..., ist was passiert?',
            trigger: 'select-happend',
        },
        {
            id: 'happyness-bad',
            message: 'Oh, dir geht es schlecht 😟 ! Das tut mir Leid. Ist etwas passiert?',
            trigger: 'select-happend',
        },
        {
            id: 'select-happend',
            options: [
                { value: 1, label: 'Ja', trigger: 'happend-yes' },
                { value: 2, label: 'Nein', trigger: 'happend-no' },
            ]
        },
        {
            id: 'happend-no',
            message: "Okay. Du kannst aber jedes mal wiederkommen, wenn du Probleme hast. Ich bin immer für dich da. 😀",
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
            message: "Okay. Du kannst aber jedes mal wiederkommen, wenn du Probleme hast. Ich bin immer für dich da. 😀",
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
            id: 'fight-name-person-quantity',
            message: (args: MessageArgs) => {
                dispatch({ type: 'setName', value: args.previousValue });
                return `Mit ${args.previousValue}. hast du oft Probleme mit ihm oder ihr oder ist es heute besonders schlimm?`;
            },
            trigger: 'ask-fight-quantity',
        },
        {
            id: 'ask-fight-quantity',
            options: [
                { value: 1, label: 'Immer', trigger: 'home-fight-type' },
                { value: 2, label: 'Heute', trigger: 'home-fight-type' },
                { value: 3, label: 'Nur manchmal', trigger: 'home-fight-type' },
            ],
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
                { value: 1, label: 'Ja', trigger: 'home-fight-knower-yes' },
                { value: 2, label: 'Nein', trigger: 'home-fight-knower-no' },
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
            trigger: 'home-fight-need-help',
        },
        {
            id: 'home-fight-need-help',
            message: 'Ich verstehe! Du brauchst dringend Hilfe!',
            trigger: 'home-fight-need-help-2',
        },
        {
            id: 'home-fight-need-help-2',
            message: 'Ich kann dich mit einem netten Menschen verbinden, der dir helfen wird. Du brauchst keine Angst zu haben, das Gespräch ist geheim.',
            trigger: 'home-fight-need-help-3',
        },
        {
            id: 'home-fight-need-help-3',
            message: 'Möchtest du das?',
            trigger: 'ask-home-fight-need-help',
            delay: 3000
        },
        {
            id: 'ask-home-fight-need-help',
            options: [
                { value: 1, label: 'Ja', trigger: 'home-fight-want-help-yes' },
                { value: 2, label: 'Nein', trigger: 'home-fight-want-help-no' },
                { value: 1, label: 'Ich weiß nicht.', trigger: 'home-fight-want-help-dont-know' },
            ],
        },
        {
            id: 'home-fight-want-help-yes',
            message: 'Ich finds super, dass du dir Hilfe suchst 😀! Rufe die Nummer gegen Kummer 116 111 an. Sie sind von Montag - Samstag von 14 - 20 Uhr + am Montag, Mittwoch und Donnerstag um 10 - 12 Uhr zu erreichen',
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
                { value: 1, label: 'Nein', trigger: 'home-fight-number-no' },
            ]
        },
        {
            id: 'home-fight-number-yes',
            message: 'Ich finds super, dass du dir Hilfe suchst 😀! Rufe die Nummer gegen Kummer 116 111 an. Sie sind von Montag - Samstag von 14 - 20 Uhr + am Montag, Mittwoch und Donnerstag um 10 - 12 Uhr zu erreichen',
        },
        {
            id: 'home-fight-number-no',
            message: 'Okay.'
        },
        {
            id: 'where-school',
            message: 'In der Schule? Das kenne ich 😀',
            trigger: 'where-school-2',
        },
        {
            id: 'where-school-2',
            message: 'Hast du Probleme mit Lehrern oder mit anderen Schülern?',
            trigger: 'school-select-problem-person',
        },
        {
            id: 'school-select-problem-person',
            options: [
                { value: 1, label: 'Lehrer', trigger: 'school-problem-teacher' },
                { value: 2, label: 'Andere Schüler', trigger: 'school-problem-students' },
            ],
        },
        {
            id: 'school-problem-teacher',
            message: 'Mit Lehrern also 😟. Was ist los?',
            trigger: 'school-problem-teacher-ask-type',
        },
        {
            id: 'school-problem-teacher-ask-type',
            options: [
                { value: 1, label: 'Schreit mich an', trigger: 'school-problem-teacher-ask-quantity' },
                { value: 2, label: 'Ist ungerecht', trigger: 'school-problem-teacher-ask-quantity' },
                { value: 3, label: 'Lacht mich aus', trigger: 'school-problem-teacher-ask-quantity' },
            ],
        },
        {
            id: 'school-problem-teacher-ask-quantity',
            message: 'Passiert das oft?',
            trigger: 'select-school-problem-teacher-quantity',
        },
        {
            id: 'select-school-problem-teacher-quantity',
            options: [
                { value: 1, label: 'Ja, immer', trigger: 'school-problem-teacher-asked-parents' },
                { value: 2, label: 'Nur ab und zu', trigger: 'school-problem-teacher-asked-parents' },
                { value: 3, label: 'Manchmal', trigger: 'school-problem-teacher-asked-parents' },
            ],
        },
        {
            id: 'school-problem-teacher-asked-parents',
            message: 'Hast du das deinen Eltern erzählt?',
            trigger: 'select-school-problem-teacher-asked-parents',
        },
        {
            id: 'select-school-problem-teacher-asked-parents',
            options: [
                { value: 1, label: 'Ja', trigger: 'school-problem-teacher-asked-parents-yes' },
                { value: 2, label: 'Nein', trigger: 'school-problem-teacher-asked-parents-no' },
            ],
        },
        {
            id: 'school-problem-teacher-asked-parents-yes',
            message: 'Gut 😀 Hat es geholfen?',
        },
        {
            id: 'school-problem-teacher-asked-parents-no',
            message: 'Möchtest du mit jemanden darüber sprechen? ich kann dir eine Telefonnummer geben 😀',
            trigger: 'school-problem-teacher-asked-parents-no-1',
        },
        {
            id: 'school-problem-teacher-asked-parents-no-1',
            message: 'Toll 😀! Ruf doch die Nummer gegen Kummer 116 111 an.',
            trigger: 'school-problem-teacher-asked-parents-no-2',
        },
        {
            id: 'school-problem-teacher-asked-parents-no-2',
            message: 'Die können dir auf jeden Fall helfen.',
        },
        {
            id: 'school-problem-students',
            message: 'Mit anderen Kindern, also. Was ist dann los?',
            trigger: 'school-problem-students'
        },
        {
            id: 'school-problem-students',
            message: 'Mit anderen Kindern, also. Was ist denn los?',
            trigger: 'select-school-problem-other-students'
        },
        {
            id: 'select-school-problem-other-students',
            options: [
                { value: 1, label: 'Sind gemein zu mir', trigger: 'school-problem-other-students-quantity' },
                { value: 2, label: 'lachen mich aus' , trigger: '' },
                { value: 3, label: 'keine Freunde',  trigger: ''},
                { value: 4, label: 'schlagen mich', trigger: ''},
            ],
        },
        {
            id: 'school-problem-other-students-quantity',
            message: 'Passiert das oft?',
            trigger: 'select-school-problem-other-students-quantity',
        },
        {
            id: 'select-school-problem-other-students-quantity',
            options: [
                { value: 1, label: 'Ja ständig', trigger: 'school-problem-other-students-help-asked'},
                { value: 1, label: 'Nein, nur ab und zu', trigger: 'school-problem-other-students-help-asked'},
                { value: 1, label: 'Nein', trigger: 'school-problem-other-students-help-asked'},
            ],
        },
        {
            id: 'school-problem-other-students-help-asked',
            message: 'Hast du das jemanden erzählt?',
            trigger: 'select-school-problem-other-students-help-asked',
        },
        {
            id: 'select-school-problem-other-students-help-asked',
            options: [
                { value: 1, label: 'Ja', trigger: 'school-problem-other-students-help-asked-yes' },
                { value: 2, label: 'Nein', trigger: 'school-problem-other-students-help-asked-no' },
            ],
        },
        {
            id: 'school-problem-other-students-help-asked-yes',
            message: 'Hat das Gespräch geholfen?',
            trigger: 'select-school-problem-other-students-help-asked-helpful',
        },
        {
            id: 'select-school-problem-other-students-help-asked-helpful',
            options: [
                { value: 1, label: 'Ja', trigger: 'school-problem-other-students-asked-helpful-yes' },
                { value: 1, label: 'Nein', trigger: 'school-problem-other-students-asked-helpful-no' },
            ],
        },
        {
            id: 'school-problem-other-students-asked-helpful-yes',
            message: 'Toll, das freut mich 😀. Wenn du mich nochmal brauchst, ich bin immer für dich da.',
        },
        {
            id: 'school-problem-other-students-asked-helpful-no',
            message: '🥺 Das ist doof. Möchtest du, dass ich dir helfe?',
            trigger: 'select-school-problem-other-students-asked-helpful-want-number'
        },
        {
            id: 'select-school-problem-other-students-asked-helpful-want-number',
            options: [
                { value: 1, label: 'Ja', trigger: 'select-school-problem-other-students-help-asked-yes' },
                { value: 1, label: 'Nein', trigger: 'school-problem-other-students-asked-helpful-want-number-no' },
            ],
        },
        {
            id: 'school-problem-other-students-asked-helpful-want-number-no',
            message: 'Okay, ich verstehe. Du kannst jederzeit wieder mit mir sprechen, ich bin immer hier.',
        },
        {
            id: 'school-problem-other-students-help-asked-no',
            message: 'Möchtest du mit jemanden darüber sprechen?',
            trigger: 'select-school-problem-other-students-help-asked-want-talk',
        },
        {
            id: 'select-school-problem-other-students-help-asked-want-talk',
            options: [
                { value: 1, label: 'Ja', trigger: 'select-school-problem-other-students-help-asked-yes'},
                { value: 1, label: 'Nein', trigger: 'school-problem-other-students-asked-helpful-want-number-no'}
            ],
        },
        {
            id: 'select-school-problem-other-students-help-asked-yes',
            message: 'Toll 😀! Ruf doch die Nummer gegen Kummer 116 111 an.',
            trigger: 'select-school-problem-other-students-help-asked-yes-1',
        },
        {
            id: 'select-school-problem-other-students-help-asked-yes-1',
            message: 'Sie ist von Montag - Samstag von 14 - 20 Uhr + am Montag, Mittwoch und Donnerstag um 10 - 12 Uhr zu erreichen.',
            trigger: 'select-school-problem-other-students-help-asked-yes-2',
        },
        {
            id: 'select-school-problem-other-students-help-asked-yes-2',
            message: 'Ich wünsch dir viel Erfolg. Wenn du mich noch einmal brauchst ich bin immer da für dich. 😀',
        },
        {
            id: 'where-else',
            message: 'Möchtest du mit Leuten sprechen, die dir helfen können?',
            trigger: 'select-where-else-talk',
        },
        {
            id: 'select-where-else-talk',
            options: [
                { value: 1, label: 'Ja', trigger: 'where-else-talk-yes' },
                { value: 1, label: 'Nein', trigger: 'where-else-talk-no' },
            ],
        },
        {
            id: 'where-else-talk-yes',
            message: 'Find ich toll 😀!',
            trigger: 'where-else-talk-yes-1',
        },
        {
            id: 'where-else-talk-yes-1',
            message: 'Hier ist die Nummer gegen Kummer: 116 111.',
            trigger: 'where-else-talk-yes-2',
        },
        {
            id: 'where-else-talk-yes-2',
            message: 'Sie ist von Montag - Samstag von 14 - 20 Uhr + am Montag, Mittwoch und Donnerstag um 10 - 12 Uhr zu erreichen.',
            trigger: 'where-else-talk-yes-3'
        },
        {
            id: 'where-else-talk-yes-3',
            message: 'War schön mit dir zu reden, ich wünsch dir alles Gute.',
        },
        {
            id: 'where-else-talk-no',
            message: 'Okay. Du kannst aber jedes mal wiederkommen, wenn du Probleme hast. Ich bin immer für dich da. 😀',
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
            Botty
    </div>
    );

    const chatBotProps = {
        headerTitle: 'Botty',
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
