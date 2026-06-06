import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";

// import LoginForm from "@/features/auth/components/LoginForm";

const Login = () => {
  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      <LoginForm />
    </AuthLayout>
  );
};

export default Login;