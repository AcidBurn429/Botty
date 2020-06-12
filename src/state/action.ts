export type ChatBotAction =
  | {
      type: 'setName';
      value: string;
    }
  | {
    type: 'setHappiness';
    value: number;
  }
  | {
      type: 'setAge';
      value: number;
    }
  | {
      type: 'setURL';
      value: string;
    }
  | {
      type: 'setBody' | 'setTitle' | 'setTitleColor';
      value: string;
    };
