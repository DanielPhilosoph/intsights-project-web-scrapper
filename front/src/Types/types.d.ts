//* Redux types
type InitialStateType = {
  data: dataType;
};
type StateType = InitialStateType;
type ActionType = { type: string; payload?: dataType };
type DispatchType = (args: ActionType) => ActionType;

//* StrongW2ise object type
type StrongW2iseType = {
  title: string;
  content: string;
  author: string;
  date: string;
};

//* Data type
type dataType = [] | [StrongW2iseType];
