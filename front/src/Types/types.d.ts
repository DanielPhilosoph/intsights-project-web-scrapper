//* Redux types
type InitialStateType = {
  data: dataType;
  search: string;
};
type StateType = InitialStateType;
type ActionType = { type: string; payload?: dataType | string };
type DispatchType = (args: ActionType) => ActionType;

//* StrongW2ise object type
type StrongW2iseType = {
  title: string;
  content: string;
  author: string;
  date: string;
  sentimentScore: number;
  id: string;
  section: string;
};

//* Data type
type dataType = [] | [StrongW2iseType];
