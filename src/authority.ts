export default function(initialState: { currentUser?: any }) {
  const { currentUser } = initialState || {};
  const actions = currentUser?.actions || [];
  const access = currentUser?.access || [];



  return {
    actions: [
      { module: 'module1', action: 'action1' },
      { module: 'module1', action: 'action2' },
      { module: 'module1', action: 'action3' },
      { module: 'module2', action: 'action1' },
      { module: 'module2', action: 'action2' },
    ],
    policies: [
      {
        version: 1,
        statement: [
          {
            effect: 'allow',
            action: 'module1/*'
          }
        ]
      }
    ]
  };
}
