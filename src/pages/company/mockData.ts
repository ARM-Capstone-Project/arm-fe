export const hierarchyData = {
  admin: {
    name: 'Admin User',
    role: 'Admin',
    profilePicture: 'https://via.placeholder.com/150',
    children: [
      {
        name: 'Supervisor 1',
        role: 'Supervisor',
        profilePicture: 'https://via.placeholder.com/150',
        children: [
          { name: 'Operator 1', role: 'Operator', profilePicture: 'https://via.placeholder.com/150' },
          { name: 'Operator 2', role: 'Operator', profilePicture: 'https://via.placeholder.com/150' },
        ],
      },
      {
        name: 'Supervisor 2',
        role: 'Supervisor',
        profilePicture: 'https://via.placeholder.com/150',
        children: [
          { name: 'Operator 3', role: 'Operator', profilePicture: 'https://via.placeholder.com/150' },
          { name: 'Operator 4', role: 'Operator', profilePicture: 'https://via.placeholder.com/150' },
        ],
      },
    ],
  },
};
