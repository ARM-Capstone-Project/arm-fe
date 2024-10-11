import React from 'react';

// Define the Role and User interfaces
interface Role {
  id: string;
  name: string;
}

interface User {
  id: string;
  username: string;
  roles: Role[];
}


// Main Component
const UserRoleTable: React.FC<{ user: User[] }> = ({ user }) => {
  // Define the roles we are interested in
  const allRoles = ['ADMIN' , 'MANAGER', 'OPERATOR' ,'USER'];

  return (
    <div className="overflow-x-auto w-full max-w-md">
            <ul className="flex space-x-4">
              {allRoles.map((role) => (
                <li key={role} className="px-4 py-2 text-center w-60">
             
                  {user.roles.some((userRole) => userRole.name === role) ? (
                    <span className="text-green-600"   >
                        ✔️
                        
                       
                    </span> // Checkmark
                  ) : (
                    <span className="text-red-600" >
                        ✖️
                        {/* <svg className="h-6 w-6 text-red-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg> */}
                    </span> // Cross
                  )}
                </li>
              ))}
            </ul>
    </div>
  );
};

export default UserRoleTable;


