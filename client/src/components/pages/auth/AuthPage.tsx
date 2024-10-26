import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
    <div className="h-screen w-screen md:px-6 md:py-8 lg:px-40 relative lg:py-20">
      <Outlet />
    </div>
  );
}

export default AuthPage;
