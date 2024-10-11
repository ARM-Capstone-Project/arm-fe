/* eslint-disable  @typescript-eslint/no-explicit-any */
const isAdmin = (user) => {
   return user && user.roles && user.roles.includes('ADMIN');
};

export default isAdmin;
